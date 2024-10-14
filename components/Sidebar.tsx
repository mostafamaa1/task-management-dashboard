// "use client";
// import { Button } from "./ui/button";
// import { useTheme } from "next-themes";
// import { useToast } from "@/hooks/use-toast";
// import { useTaskStore } from "@/store/taskStore";
// import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// import { useDashboardStore } from "@/store/dashboardStore";
// import { LayoutGrid, List, LogOut, Moon, Sun } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import React from "react";
// import { useSession, signOut } from 'next-auth/react';
// import LangSwitcher from "./ui/LangSwitcher";
// import { useTranslation } from 'next-i18next';

// const Sidebar = () => {
//   const { theme, setTheme } = useTheme();
//   const { setBoardView, boardView, setUser } = useDashboardStore();
//   const { setTasks } = useTaskStore();
//   const { toast } = useToast();
//   const { data: session } = useSession();
//   const { t } = useTranslation('common');

//   const handleLogout = async () => {
//     if (session) {
//       // Show the toast first
//       toast({
//         title: "Logged out",
//         description: "You have been logged out successfully",
//         variant: "destructive",
//         duration: 1500, // 1500ms duration
//       });

//       // Wait for the toast message to finish (after 2 seconds)
//       setTimeout(() => {
//         // Perform the sign out and redirect after the toast is shown
//         signOut({ redirect: true, callbackUrl: '/login' }); // Redirect to login page after signing out
//       }, 700); // 800ms seconds delay
//     }
//     setUser(null);
//     setTasks([]);
//   };

//   return (
//     <>
//       {/* MOBILE MENU */}
//       <div className="sm:hidden flex justify-between items-center p-3 shadow-md bg-background  ">
//         <h1 className="text-xl font-bold dark:text-white">{t('welcome')}</h1>

//         <div className="flex justify-center items-center">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           >
//             {theme === "dark" ? (
//               <Sun className="h-5 w-5" />
//             ) : (
//               <Moon className="h-5 w-5" />
//             )}
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <HamburgerMenuIcon className="h-6 w-6" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className=" space-y-2 p-4">
//               <h1 className=" py-2 font-bold  border-b ">Menu</h1>
//               <DropdownMenuItem asChild>
//                 <Button
//                   variant={boardView == "list" ? "default" : "link"}
//                   className="w-full justify-start gap-2"
//                   onClick={() => setBoardView("list")}
//                 >
//                   <List className=" h-4 w-4" />
//                   List View
//                 </Button>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Button
//                   variant={boardView == "kanban" ? "default" : "link"}
//                   onClick={() => setBoardView("kanban")}
//                   className="w-full justify-start gap-2"
//                 >
//                   <LayoutGrid className="h-4 w-4" />
//                   Kanban View
//                 </Button>
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 className="bg-red-400  dark:bg-red-600"
//               >
//                 <LogOut className="mr-2 h-4 w-4 " />
//                 <span>Logout</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* DESKTOP MENU */}
//       <div
//         className={`bg-background border-r shadow-sm transition-all max-sm:hidden w-52 md:w-64`}
//       >
//         <div className="flex flex-col h-full ">
//           <div className="p-4 flex items-center justify-between">
//             <h1 className="text-xl font-bold dark:text-white">Task Manager</h1>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               {theme === "dark" ? (
//                 <Sun className="h-4 w-4" />
//               ) : (
//                 <Moon className="h-4 w-4" />
//               )}
//             </Button>
//           </div>
//           <div className="p-4 flex items-center justify-between">
//           <LangSwitcher />
//           </div>
//           <nav className={`flex-1 space-y-2 px-2 `}>
//             <Button
//               variant={boardView == "list" ? "default" : "link"}
//               className={`w-full gap-2 justify-start`}
//               onClick={() => setBoardView("list")}
//             >
//               <List className=" h-4 w-4" />
//               List View
//             </Button>
//             <Button
//               variant={boardView == "kanban" ? "default" : "link"}
//               className={`w-full gap-2 justify-start`}
//               onClick={() => setBoardView("kanban")}
//             >
//               <LayoutGrid className="h-4 w-4" />
//               Board View
//             </Button>
//           </nav>
//           <div className="p-4">
//             <Button
//               onClick={handleLogout}
//               variant={"destructive"}
//               className=" w-full"
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

'use client';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { useTaskStore } from '@/store/taskStore';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useDashboardStore } from '@/store/dashboardStore';
import { LayoutGrid, List, LogOut, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useSession, signOut } from 'next-auth/react';
import LangSwitcher from './ui/LangSwitcher'; // Import the updated LangSwitcher
import { useTranslations } from 'next-intl';

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const { setBoardView, boardView, setUser } = useDashboardStore();
  const { setTasks } = useTaskStore();
  const { toast } = useToast();
  const { data: session } = useSession();
  const t = useTranslations('Dashboard'); // Using t function for translations

  const handleLogout = async () => {
    if (session) {
      toast({
        title: t('logged_out'), // Use translation for logout message
        description: t('logged_out_success'), // Use translation for logout description
        variant: 'destructive',
        duration: 1500,
      });

      setTimeout(() => {
        signOut({ redirect: true, callbackUrl: '/login' });
      }, 700);
    }
    setUser(null);
    setTasks([]);
  };

  return (
    <>
      {/* MOBILE MENU */}
      <div className='sm:hidden flex justify-between items-center p-3 shadow-md bg-background'>
        <h1 className='text-xl font-bold dark:text-white'>{t('welcome')}</h1>

        <div className='flex justify-center items-center'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'>
                <HamburgerMenuIcon className='h-6 w-6' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className=' space-y-2 p-4'>
              <h1 className=' py-2 font-bold  border-b '>{t('menu')}</h1>
              <DropdownMenuItem asChild>
                <Button
                  variant={boardView === 'list' ? 'default' : 'link'}
                  className='w-full justify-start gap-2'
                  onClick={() => setBoardView('list')}>
                  <List className=' h-4 w-4' />
                  {t('list_view')}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant={boardView === 'kanban' ? 'default' : 'link'}
                  onClick={() => setBoardView('kanban')}
                  className='w-full justify-start gap-2'>
                  <LayoutGrid className='h-4 w-4' />
                  {t('kanban_view')}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className='bg-red-400  dark:bg-red-600'>
                <LogOut className='mr-2 h-4 w-4 ' />
                <span>{t('logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div
        className={`bg-background border-r shadow-sm transition-all max-sm:hidden w-52 md:w-64`}>
        <div className='flex flex-col h-full'>
          <div className='p-4 flex items-center justify-between'>
            <h1 className='text-xl font-bold dark:text-white'>
              {t('welcome')}
            </h1>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? (
                <Sun className='h-4 w-4' />
              ) : (
                <Moon className='h-4 w-4' />
              )}
            </Button>
          </div>
          <div className='p-4 flex items-center justify-between'>
            <LangSwitcher /> {/* Language Switcher */}
          </div>
          <nav className='flex-1 space-y-2 px-2'>
            <Button
              variant={boardView === 'list' ? 'default' : 'link'}
              className='w-full gap-2 justify-start'
              onClick={() => setBoardView('list')}>
              <List className=' h-4 w-4' />
              {t('list_view')}
            </Button>
            <Button
              variant={boardView === 'kanban' ? 'default' : 'link'}
              className='w-full gap-2 justify-start'
              onClick={() => setBoardView('kanban')}>
              <LayoutGrid className='h-4 w-4' />
              {t('kanban_view')}
            </Button>
          </nav>
          <div className='p-4'>
            <Button
              onClick={handleLogout}
              variant={'destructive'}
              className=' w-full'>
              <LogOut className='mr-2 h-4 w-4' />
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
