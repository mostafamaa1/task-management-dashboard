// // src/lib/socket.ts
// import { io, Socket } from 'socket.io-client';
// import { DefaultEventsMap } from '@socket.io/component-emitter';

// let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

// export const initializeSocket = () => {
//     if (!socket) {
//       socket = io(process.env.NEXT_PUBLIC_APP_URL as string, {
//         autoConnect: false,
//       });
//     }
//     return socket;
//   };
  
//   export const getSocket = (): Socket => {
//     if (!socket) {
//       throw new Error("Socket not initialized. Call initializeSocket first.");
//     }
//     return socket;
//   };

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let socketPromise: Promise<Socket> | null = null;

export const initializeSocket = () => {
  if (!socketPromise) {
    socketPromise = new Promise<Socket>((resolve, reject) => {
      try {
        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
          autoConnect: false,
        });
        newSocket.on("connect", () => {
          socket = newSocket;
          resolve(newSocket);
        });
        newSocket.connect();
      } catch (err) {
        reject(err);
      }
    });
  }
  return socketPromise;
};

export const getSocket = async (): Promise<Socket> => {
  if (!socketPromise) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socketPromise;
};

