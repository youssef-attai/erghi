import Chat from "./components/Chat"
import Login from "./components/Login";
import { useAuth } from "./contexts/AuthContext"
function App() {
  const { user, getCurrentUser } = useAuth();
  return (
    <>
      {user ? (<Chat />) : (<Login />)}
    </>
  )
}

export default App
