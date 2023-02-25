import { useAsync } from "@youssef-attai/useful-hooks";
import { useEffect } from "react";
import Chat from "./components/Chat"
import Login from "./components/Login";
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { user, getCurrentUser } = useAuth();
  const { execute: execGetCurrentUser, status, error } = useAsync(getCurrentUser);

  useEffect(() => {
    execGetCurrentUser();
  }, []);

  return (
    <>
      {user ? (<Chat />) : (<Login />)}
    </>
  )
}

export default App
