'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSoket';

export default function ChatPage() {
  const socket = useSocket();
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('joinedRoom', (msg) => console.log(msg));
    socket.on('leftRoom', (msg) => console.log(msg));
    socket.on('newMessage', (data) => {
      setChat((prev) => [...prev, `${data.sender}: ${data.message}`]);
    });

    return () => {
      socket.off('joinedRoom');
      socket.off('leftRoom');
      socket.off('newMessage');
    };
  }, [socket]);

  const joinRoom = () => {
    socket?.emit('joinRoom', room);
  };

  const leaveRoom = () => {
    socket?.emit('leaveRoom', room);
  };

  const sendMessage = () => {
    socket?.emit('sendMessage', { room, message });
    setMessage('');
  };

  return (
    <div className="p-4 h-screen d">
      <input
        placeholder="Назва кімнати"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={joinRoom}>Join</button>
      <button onClick={leaveRoom}>Leave</button>

      <div className="mt-4">
        <input
          placeholder="Повідомлення"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Чат</h3>
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
