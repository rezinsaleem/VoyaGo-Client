import { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import { connectSocket, disconnectSocket } from '../socketUtils'; 
import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps): JSX.Element => {
  const {userId} = useSelector(
    (store: { user: { userId: string } }) =>
      store.user
  );

  const socket = useMemo(() => {
    const token =  localStorage.getItem('userToken');
    const refreshToken =  localStorage.getItem('refreshToken');
    
    
    if (token && refreshToken) {
      return connectSocket(token, refreshToken, userId);
    }
    return null;
  }, [userId]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off(); // Remove all listeners on cleanup to avoid memory leaks
      }
      disconnectSocket();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};
