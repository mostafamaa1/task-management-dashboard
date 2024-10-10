// "use client";

// import Header from "./Header";
// import Kanban from "./Kanban";
// import Sidebar from "./Sidebar";
// import { useEffect } from "react";
// import Tasklist from "./Tasklist";
// import { useRouter } from "next/navigation";
// import { useTaskStore } from "@/store/taskStore";
// import { useDashboardStore } from "@/store/dashboardStore";

// export function DashboardComponent() {
//   const { boardView, user, setUser } = useDashboardStore();
//   const { setTasks } = useTaskStore();
//   const router = useRouter();

//   const fetchTasks = async () => {
//     const url = '/api/tasks/all';
//     const headers = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": user?.token || "",
//         },
//         body: JSON.stringify({user:user?.email}),
//       }

//     const res = await fetch(url, headers);
//     const result = await res.json();
//     setTasks(result.tasks);

//   }

//   useEffect(() => {
//     setUser(
//       localStorage.getItem("user")? JSON.parse(localStorage.getItem("user") as string): null
//     );
//   }, []);

//   // Redirect to login if user is not logged in
//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     }
//   }, [user, router]);

//   useEffect(()=>{
//     try {
//       fetchTasks()
//     } catch (error) {
//       console.error(error);
//     }
//   },[])

//   if (!user) {
//     return null;
//   } else
//     return (
//       <div className="flex max-sm:flex-col h-screen bg-secondary dark:bg-background">
//         <Sidebar />
//         <div className="flex-1 p-8 overflow-auto ">
//           <Header />
//           {boardView === "list" ? <Tasklist/> : <Kanban />}
//         </div>
//       </div>
//     );
// }

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

export function DashboardComponent() {
  const { boardView } = useDashboardStore();
  const { setTasks } = useTaskStore();
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("User object:", session?.user);
  console.log("User object:", session?.user.token);

  console.log('Session', session, status)
  console.log('Attempting to fetch tasks...');

  const fetchTasks = async () => {
    if (!session) {
      console.log("No session available");
      return; // Don't fetch if there's no session
    }
    const url = '/api/tasks/crud';
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.token}`,
      },
      // body: JSON.stringify({ user: session?.user?.email }),
    };

    console.log('Fetching tasks from:', url, headers); // Debug log

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
    console.log("Session status:", status); // Log the session status
    console.log("Session data:", session); // Log the session data
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
    return <div>Loading...</div>; // Optional loading state
  }

  if (!session) {
    return null;
  }

  return (
    <div className='flex max-sm:flex-col h-screen bg-secondary dark:bg-background'>
      <Sidebar />
      <div className='flex-1 p-8 overflow-auto '>
        <Header />
        {boardView === 'list' ? <Tasklist /> : <Kanban />}
      </div>
    </div>
  );
}
