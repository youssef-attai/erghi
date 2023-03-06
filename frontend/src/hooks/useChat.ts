import { useState, useEffect, useCallback } from 'react';
import useSocket from './useSocket';

interface ChatState {
  messages: string[];
  sendMessage: (message: string) => void;
}

const useChat = (url: string): ChatState => {
  const [messages, setMessages] = useState<string[]>([]);

  const socket = useSocket('http://localhost:3000');

  const sendMessage = useCallback((message: string) => {
    if (socket) {
      socket.emit('message', message);
    } else {
      console.log('socket not connected');
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const onMessage = (message: string) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, [socket]);

  return { messages, sendMessage };
};

export default useChat;
