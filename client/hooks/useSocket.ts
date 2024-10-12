// // hooks/useSocket.ts
// import { useEffect, useState } from 'react';
// import io, { Socket } from 'socket.io-client';

// const useSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     // Initialize socket connection
//     const socketInstance = io('http://localhost:3000');
//     setSocket(socketInstance);

//     return () => {
//       // Cleanup socket connection on unmount
//       socketInstance.disconnect();
//     };
//   }, []);

//   return socket;
// };

// export default useSocket;

// hooks/useSocket.ts
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null; // Declare socket globally

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection if not already initialized
    if (!socket) {
      socket = io('http://localhost:3000'); // Replace with your actual server address
      setIsConnected(true); // Update state to indicate socket is connected
    }

    // Handle socket disconnection on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  return { socket, isConnected };
};

export default useSocket;

