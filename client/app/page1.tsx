'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth"; // Ensure to import your auth options
// import Link from "next/link";
// import { signOut } from "next-auth/react";

// export default async function Home() {
//   // Get session on the server side
//   const session = await getServerSession(authOptions);
//   console.log("server session", session);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center">
//       <h1 className="text-xl">NextAuth APP</h1>

//       {session ? (
//         <button
//           className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
//           onClick={() => signOut()}
//         >
//           Logout here
//         </button>
//       ) : (
//         <Link
//           href="/login"
//           className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
//         >
//           Login here
//         </Link>
//       )}
//     </main>
//   );
// }

export default function Home() {
  const { data: session, status } = useSession();
  console.log('Clientsession', session, status);

  const showSession = () => {
    if (status === 'authenticated') {
      return (
        <button
          className='text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white'
          onClick={() => {
            signOut();
          }}>
          Logout here
        </button>
      );
    } else if (status === 'loading') {
      return <span className='text-[#888] text-sm mt-7'>Loading...</span>;
    } else {
      return (
        <Link
          href='/login'
          className='text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white'>
          Login here
        </Link>
      );
    }
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-xl'>NextAuth APP</h1>
      {showSession()}
    </main>
  );
}
