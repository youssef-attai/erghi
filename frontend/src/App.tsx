import { useAsync } from "@youssef-attai/useful-hooks";
import { useEffect } from "react";
import Chat from "./components/Chat"
import Login from "./components/Login";
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { user, me } = useAuth();
  const { execute: getMe, status, error } = useAsync(me);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      {user ? (<Chat />) : (<Login />)}
    </>
  )
}

export default App
