'use client';

import Header from './Header';
import Kanban from './Kanban';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import Tasklist from './Tasklist';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/taskStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { useSession } from 'next-auth/react';
import { useToast } from '@/src/hooks/use-toast';
import LoadingSpinner from './animation/loader';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>; // Initialize Socket.IO client

export function DashboardComponent() {
  const { boardView } = useDashboardStore();
  const { setTasks } = useTaskStore();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    // if(!socket.connected){}
    socket = io('http://localhost:3000');
    // Emit user login event when connected
    socket.on('connect', () => {
      console.log('Socket.IO connected');
      toast({
        title: 'Connection successful',
        variant: 'default',
        className: 'bg-yellow-500 text-black',
        duration: 2000,
      }); // Display a toast message
    });

    // Listen for the 'notification' event to display toasts when a user logs in
    socket.on('user:login', (message: string) => {
      console.log('Received notification:', message);

      // Display the toast message to all connected users
      toast({
        title: 'A User Logged In',
        description: message, // Display the message sent by the server
        variant: 'default',
        className: 'bg-green-400 text-black',
        duration: 1500,
      });
    });
    return () => {
      socket.off('user:login');
      socket.off('connect');
      socket.disconnect(); // Clean up the listener when component unmounts
    };
  }, []);

  const fetchTasks = async () => {
    if (!session) {
      console.log('No session available');
      return; // Don't fetch if there's no session
    }
    const url = '/api/tasks/crud';
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.token}`,
      },
    };

    try {
      const res = await fetch(url, headers);
      if (!res.ok) {
        const errorBody = await res.json(); // Log error response
        console.log('Error response:', errorBody);
        console.log('HTTP Error Status:', res.status);
        return; // Exit early if there's an error
      }

      const result = await res.json();
      setTasks(result.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Redirect to login if no session
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      try {
        fetchTasks();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  }, [session]);

  if (status === 'loading') {
    return <LoadingSpinner />; // Optional loading state
  }

  if (!session) {
    return null;
  }

  return (
    <div className='flex max-sm:flex-col h-screen bg-secondary dark:bg-background'>
      <Sidebar />
      <div className='flex-1 p-8 overflow-auto '>
        <Header />
        {boardView === 'list' ? <Tasklist socket={socket} /> : <Kanban socket={socket} />}
      </div>
    </div>
  );
}
