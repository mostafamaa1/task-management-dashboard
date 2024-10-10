// "use client";


// import { Button } from "./ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { useModalStore } from "@/store/modalStore";
// import { useTaskStore } from "@/store/taskStore";
// import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "./ui/dialog";

// const DeleteModal = () => {

//   const {toast} = useToast();
//   const {setTaskToDelete,taskToDelete,deleteTask} = useTaskStore();
//   const {setIsDeleteModalOpen,isDeleteModalOpen,} = useModalStore();

//   const handleCloseDeleteModal = () => {
//     setTaskToDelete("");
//     setIsDeleteModalOpen(false);
//   };

//   const handleDeleteTask = async() => {
//     if (taskToDelete) {
//       const res = await fetch('/api/tasks/crud', {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ _id: taskToDelete }),
//       });
//       const data = await res.json();

//       deleteTask(taskToDelete);
//       toast({
//         title: "Task Deleted",
//         variant: "destructive",
//         duration: 1500,
//       })
//       setTaskToDelete("");
//       setIsDeleteModalOpen(false);
//     }
//   };

//   return (
//     <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Confirm Deletion</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to delete this task? This action cannot be
//             undone.
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
//             Cancel
//           </Button>
//           <Button variant="destructive" onClick={handleDeleteTask}>
//             Delete
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default DeleteModal;

"use client";

import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useModalStore } from "@/store/modalStore";
import { useTaskStore } from "@/store/taskStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useSession } from 'next-auth/react';

const DeleteModal = () => {
  const { toast } = useToast();
  const { setTaskToDelete, taskToDelete, deleteTask } = useTaskStore();
  const { setIsDeleteModalOpen, isDeleteModalOpen } = useModalStore();
  const { data: session } = useSession(); // Get session data

  const handleCloseDeleteModal = () => {
    setTaskToDelete("");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      try {
        const res = await fetch('/api/tasks/crud', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`, // Include session token for authentication
          },
          body: JSON.stringify({ _id: taskToDelete }),
        });

        const data = await res.json();
        
        if (res.ok) {
          deleteTask(taskToDelete);
          toast({
            title: "Task Deleted",
            variant: "destructive",
            duration: 1500,
          });
        } else {
          toast({
            title: data.message || "Failed to delete task",
            variant: "destructive",
            duration: 1500,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error deleting task",
          variant: "destructive",
          duration: 1500,
        });
      }

      setTaskToDelete("");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteTask}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
