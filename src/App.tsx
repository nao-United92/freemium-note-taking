import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteDetail from './pages/NoteDetail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { authRepository } from './modules/auth/auth.repository';
import { useEffect, useState } from 'react';
import { userCurrentUserStore } from './modules/auth/current-user.state';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = userCurrentUserStore();

  useEffect(() => {
    setSession();
  }, []);

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  };

  if (isLoading) return <div />;

  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
