import { TitleInput } from '@/components/TitleInput';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { noteRepository } from '@/modules/notes/note.repository';
import { useNoteStore } from '@/modules/notes/note.state';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetail = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const note = noteStore.getOne(id);

  useEffect(() => {
    fetchOne();
  }, [id]);

  const fetchOne = async () => {
    setIsLoading(true);
    const note = await noteRepository.findOne(currentUser!.id, id);
    noteStore.set([note]);
    setIsLoading(false);
  };
  if (isLoading) return <div />;
  if (note == null) return <div>note is not existed</div>;

  return (
    <div className="pb-40 pt-20">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <TitleInput initialData={note} />
      </div>
    </div>
  );
};

export default NoteDetail;
