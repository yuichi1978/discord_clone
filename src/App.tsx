import { useEffect } from "react";
import { auth } from "./firebase";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "./utils/ErrorFallBack";

import { Sidebar } from "./components/sidebar/Sidebar";
import { Chat } from "./components/chat/Chat";
import { Login } from "./login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { login, logout } from "./features/userSlice";
import './App.scss'

function App() {
  const user = useAppSelector((state) => state.user.user);
  // const user = null;
  console.log(user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if(loginUser) {
        dispatch(login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName,
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch])

  return (
    <div className="App">
      {user ? (
        <>
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Sidebar />
        </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  )
}

export default App
