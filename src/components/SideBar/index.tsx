import { FC } from 'react';
import { Item } from './Item';
import { NoteList } from '../NodeList';
import UserItem from './UserItem';
import { Plus, Search } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { User } from '@supabase/supabase-js';

type Props = {
  currentUser: User;
  onSearchButtonClicked: () => void;
  createNote: () => void;
  signout: () => void;
};

const SideBar: FC<Props> = ({
  currentUser,
  onSearchButtonClicked,
  createNote,
  signout,
}) => {
  return (
    <>
      <aside className="group/sidebar h-full bg-neutral-100 dark:bg-neutral-900 overflow-y-auto relative flex flex-col w-60">
        <div>
          <div>
            <UserItem user={currentUser} signout={signout} />
            <Item label="検索" icon={Search} onClick={onSearchButtonClicked} />
            <ThemeToggle />
          </div>
          <div className="mt-4">
            <NoteList />
            <Item label="ノートを作成" icon={Plus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]"></div>
    </>
  );
};

export default SideBar;
