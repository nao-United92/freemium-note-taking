import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/note.state';
import { noteRepository } from './modules/notes/note.repository';
import { useEffect, useState } from 'react';
import { Note } from './modules/notes/note.entity';
import { subscribe, unsubscribe } from './lib/supabase';
import { authRepository } from './modules/auth/auth.repository';

const Layout = () => {
  const navigate = useNavigate();
  const { currentUser, set: setCurrentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState<Note[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    fetchNotes();
    const channel = subscribeNote();
    return () => {
      if (channel) unsubscribe(channel);
    };
  }, [currentUser]);

  const subscribeNote = () => {
    if (currentUser == null) return;
    return subscribe(currentUser!.id, (payload) => {
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        noteStore.set([payload.new]);
      } else if (payload.eventType === 'DELETE') {
        noteStore.delete(payload.old.id!);
      }
    });
  };
  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
  };

  const searchNotes = async (keyword: string) => {
    if (!currentUser) return;
    const notes = await noteRepository.findByKeyword(currentUser.id, keyword);
    if (notes == null) return;
    setSearchResult(notes);
  };

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`);
    setIsShowModal(false);
  };

  const createNote = async () => {
    if (!currentUser) return;
    const newNote = await noteRepository.create(currentUser.id, {});
    noteStore.set([newNote]);
    navigate(`/notes/${newNote.id}`);
    setIsShowModal(false);
  };

  const signout = async () => {
    await authRepository.signout();
    setCurrentUser(undefined);
    noteStore.clear();
  };

  if (currentUser == null) return <Navigate replace to="/signin" />;

  return (
    <div className="h-full flex">
      {!isLoading && (
        <SideBar
          currentUser={currentUser}
          onSearchButtonClicked={() => setIsShowModal(true)}
          createNote={createNote}
          signout={signout}
        />
      )}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={searchResult}
          onItemSelect={moveToDetail}
          onKeywordChanged={searchNotes}
          onClose={() => setIsShowModal(false)}
          createNote={createNote}
          signout={signout}
        />
      </main>
    </div>
  );
};

export default Layout;
