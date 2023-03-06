import { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useChat from '../hooks/useChat';

function Chat() {
    const { user, logout } = useAuth();

    const messageRef = useRef<HTMLInputElement | null>(null);
    const { messages, sendMessage } = useChat();

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageRef.current) {
            sendMessage(messageRef.current.value);
            messageRef.current.value = '';
        }
    };

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await logout();
    };

    return (
        <div>
            <h1>Welcome, {user?.username}</h1>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
            </form>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                type="text"
                ref={messageRef}
            />
            <form onSubmit={handleSendMessage}>
                <button type='submit'>Send Message</button>
            </form>
        </div>
    );
}

export default Chat;
