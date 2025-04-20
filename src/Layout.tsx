import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-full flex">
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
