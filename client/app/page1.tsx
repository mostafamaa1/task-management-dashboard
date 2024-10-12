// 'use client';
// import AddTaskModal from '@/components/AddTaskModal';
// import { DashboardComponent } from '@/components/Dashboard';
// import DeleteModal from '@/components/DeleteModal';
// import React, { useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { DefaultEventsMap } from '@socket.io/component-emitter';
// import { useToast } from '@/hooks/use-toast';

// let socket: Socket<DefaultEventsMap, DefaultEventsMap>; // Initialize Socket.IO client

// export default function Home() {
//   // const { toast } = useToast();
//   // useEffect(() => {
//   //   // if(!socket.connected){}
//   //   socket = io('http://localhost:3000');
//   //   // Emit user login event when connected
//   //   socket.on('connect', () => {
//   //     console.log('Socket.IO connected');
//   //     toast({
//   //       title: 'Connection successful',
//   //       variant: 'default',
//   //       className: 'bg-yellow-500 text-black',
//   //       duration: 2000,
//   //     }); // Display a toast message
//   //   });

//   //   // Listen for the 'notification' event to display toasts when a user logs in
//   //   socket.on('user:login', (message: string) => {
//   //     console.log('Received notification:', message);

//   //   //   // Display the toast message to all connected users
//   //     toast({
//   //       title: 'A User Logged In',
//   //       description: message, // Display the message sent by the server
//   //       variant: 'default',
//   //       className: 'bg-green-400 text-black',
//   //       duration: 1500,
//   //     });
//   //   });
//   //   return () => {
//   //     socket.off('user:login');
//   //     socket.off('connect');
//   //     socket.disconnect(); // Clean up the listener when component unmounts
//   //   };
//   // }, []);
//   return (
//     <>
//       <DashboardComponent />
//       <AddTaskModal />
//       <DeleteModal />
//     </>
//   );
// }
