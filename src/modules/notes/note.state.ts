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

  const getOne = (id: number) => notes.find((note) => note.id === id);

  return {
    getAll: () => notes,
    getOne,
    set,
  };
};
