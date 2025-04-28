import { atom, useAtom } from 'jotai';
import { Note } from './note.entity';

const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteAtom);

  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];

      const uniqueNotes: { [key: number]: Note } = {};
      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }
      return Object.values(uniqueNotes);
    });
  };

  const deleteNote = (id: number) => {
    const findChildrenIds = (parentId: number): number[] => {
      const childrenIds = notes
        .filter((note) => note.parent_document === parentId)
        .map((note) => note.id);
      return childrenIds.concat(
        ...childrenIds.map((childId) => findChildrenIds(childId))
      );
    };
    const childrenIds = findChildrenIds(id);
    setNotes((oldNotes) =>
      oldNotes.filter(
        (note) => note.id !== id && !childrenIds.includes(note.id)
      )
    );
  };

  const getOne = (id: number) => notes.find((note) => note.id === id);
  const clear = () => setNotes([]);
  return {
    getAll: () => notes,
    getOne,
    set,
    delete: deleteNote,
    clear,
  };
};
