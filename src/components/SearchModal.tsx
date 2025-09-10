import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Note } from '@/modules/notes/note.entity';
import { useDebouncedCallback } from 'use-debounce';
import { useTheme } from 'next-themes';
import { LogOut, Moon, Plus, Sun } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  notes: Note[];
  onItemSelect: (noteId: number) => void;
  onKeywordChanged: (keyword: string) => void;
  onClose: () => void;
  createNote: () => void;
  signout: () => void;
}

export function SearchModal({
  isOpen,
  notes,
  onItemSelect,
  onKeywordChanged,
  onClose,
  createNote,
  signout,
}: SearchModalProps) {
  const debounce = useDebouncedCallback(onKeywordChanged, 500);
  const { setTheme } = useTheme();

  const actions = [
    {
      label: 'ノートを新規作成',
      icon: Plus,
      onSelect: () => {
        createNote();
        onClose();
      },
    },
    {
      label: 'ライトモードに切り替え',
      icon: Sun,
      onSelect: () => {
        setTheme('light');
        onClose();
      },
    },
    {
      label: 'ダークモードに切り替え',
      icon: Moon,
      onSelect: () => {
        setTheme('dark');
        onClose();
      },
    },
    {
      label: 'ログアウト',
      icon: LogOut,
      onSelect: () => {
        signout();
        onClose();
      },
    },
  ];

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={'キーワードで検索またはコマンドを入力'}
          onValueChange={debounce}
        />
        <CommandList>
          <CommandEmpty>条件に一致する結果がありません</CommandEmpty>
          <CommandGroup heading="アクション">
            {actions.map((action) => (
              <CommandItem key={action.label} onSelect={action.onSelect}>
                <action.icon className="mr-2 h-4 w-4" />
                <span>{action.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {notes.length > 0 && (
            <CommandGroup heading="ノート">
              {notes?.map((note) => (
                <CommandItem
                  key={note.id}
                  title={note.title ?? '無題'}
                  onSelect={() => onItemSelect(note.id)}
                >
                  <span>{note.title ?? '無題'}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
