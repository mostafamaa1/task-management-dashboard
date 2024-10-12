'use client';

import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useModalStore } from '@/store/modalStore';
import { useTaskStore } from '@/store/taskStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const DeleteModal = ({ socket }: { socket: Socket<DefaultEventsMap, DefaultEventsMap> }) => {
  const { toast } = useToast();
  const { setTaskToDelete, taskToDelete, deleteTask } = useTaskStore();
  const { setIsDeleteModalOpen, isDeleteModalOpen } = useModalStore();
  const { data: session } = useSession(); // Get session data

  // useEffect(() => {
  //   socket = io('http://localhost:3000');
  //   socket.on('task:delete', (data) => {
  //     toast({
  //       title: `Task Deleted by ${data.userName}`,
  //       variant: 'destructive',
  //       className: 'bg-red-500 text-white',
  //       duration: 1500,
  //     });
  //   });

  //   // Cleanup event listener on unmount
  //   return () => {
  //     socket.off('task:delete');
  //   };
  // }, []);

  const handleCloseDeleteModal = () => {
    setTaskToDelete('');
    setIsDeleteModalOpen(false);
  };

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      try {
        const res = await fetch('/api/tasks/crud', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.token}`, // Include session token for authentication
          },
          body: JSON.stringify({ _id: taskToDelete }),
        });

        const data = await res.json();

        if (res.ok) {
          deleteTask(taskToDelete);
          toast({
            title: 'Task Deleted Successfully',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
            duration: 1500,
          });
            socket.emit('task:delete', {
              // title: taskToDelete, // Pass task details for notifications
              userName: session?.user.name || session?.user.email,
            });
        } else {
          toast({
            title: data.message || 'Failed to delete task',
            variant: 'destructive',
            duration: 1500,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error deleting task',
          variant: 'destructive',
          duration: 1500,
        });
      }

      setTaskToDelete('');
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={handleCloseDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDeleteTask}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
