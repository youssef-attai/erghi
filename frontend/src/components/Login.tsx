import { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAsync } from '@youssef-attai/useful-hooks';
import colors from '../styles/colors';

function Login() {
  const { login } = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { execute: execLogin, status, error } = useAsync<void, { message: string }>(login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      if (username && password) await execLogin(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      {<p>{error?.message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="username" ref={usernameRef} style={styles.input} />
        <input type="password" placeholder="password" ref={passwordRef} style={styles.input} />
        <button type="submit" style={styles.button} >Login</button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    padding: 10,
    borderRadius: 20,
    border: 'none',
    outline: 'none',
    backgroundColor: colors.darkSecondary,
    color: colors.secondary
  },
  button: {
    padding: 10,
    borderRadius: 20,
    border: 'none',
    outline: 'none',
    backgroundColor: colors.primary,
    color: colors.text,
    width: 100,
    cursor: 'pointer',
  }
}

export default Login;
