
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_BASE_URL;

let socket: Socket | null = null;


export const connectSocket = (
  accessToken: string,
  refreshToken: string,
  userId: string
) => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        token: accessToken,
        refreshToken: refreshToken,
      },
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.emit('join_chat', { userId });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Reconnection attempt ${attemptNumber}`);
    });

    socket.on('error', (error) => {
      console.error('Global socket error:', error);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('Socket not initialized. Call connectSocket first.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
    socket = null;
  }
};