import { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAsync } from '@youssef-attai/useful-hooks';

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
        <>
            {<p>{error?.message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={usernameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
