import { cn } from '@/lib/utils';
import { NoteItem } from './NodeItem';

interface NoteListProps {
  layer?: number;
  parentId?: number;
}

export function NoteList({ layer = 0, parentId }: NoteListProps) {
  const notes = [{}];
  return (
    <>
      <p
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80`,
          layer === 0 && 'hidden'
        )}
        style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }}
      >
        ページがありません
      </p>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <NoteItem layer={layer} />
          </div>
        );
      })}
    </>
  );
}
