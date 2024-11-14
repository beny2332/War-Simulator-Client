import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});

export default socket;
