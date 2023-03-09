import { useAsync } from "@youssef-attai/useful-hooks";
import { useEffect } from "react";
import Chat from "./components/Chat"
import Login from "./components/Login";
import { useAuth } from "./contexts/AuthContext"
import colors from "./styles/colors";


function App() {
  const { user, me } = useAuth();
  const { execute: getMe, status, error } = useAsync(me);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <img src="erghi.svg" alt="Logo" style={styles.logo} />
        <img src="github.svg" alt="GitHub" style={styles.github} />
      </div>
      <div style={styles.page}>
        {user ? (<Chat />) : (<Login />)}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: colors.darkPrimary,
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    padding: '0 20px',
    backgroundColor: colors.darkPrimary,
  },
  page: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: colors.darkPrimary,
  },
  logo: {
    height: 40,
    userSelect: 'none' as const,
  },
  github: {
    height: 40,
    userSelect: 'none' as const,
  },
};

export default App
