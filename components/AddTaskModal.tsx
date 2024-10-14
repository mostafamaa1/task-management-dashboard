'use client'; // Indicates that this page should be rendered on the client-side

import { Label } from './ui/label'; // Importing Label component
import { Input } from './ui/input'; // Importing Input component
import { format } from 'date-fns'; // Importing format function from date-fns for date formatting
import { Button } from './ui/button'; // Importing Button component
import { Textarea } from './ui/textarea'; // Importing Textarea component
import { useToast } from '@/hooks/use-toast'; // Importing useToast hook for toast notifications
import { EmptyTask } from '@/lib/constants'; // Importing EmptyTask constant
import { useTaskStore } from '@/store/taskStore'; // Importing useTaskStore hook for task state management
import { useModalStore } from '@/store/modalStore'; // Importing useModalStore hook for modal state management
import { TaskPriority, TaskStatus } from '@/types/types'; // Importing TaskPriority and TaskStatus types
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'; // Importing Dialog components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'; // Importing Select components
import { useSession } from 'next-auth/react'; // Importing useSession hook for session data
import { useState } from 'react'; // Importing useState hook for state management
import { useTranslation } from 'next-i18next'; // Importing useTranslation hook for translations
import { Socket } from 'socket.io-client'; // Importing Socket from socket.io-client for real-time communication
import { DefaultEventsMap } from '@socket.io/component-emitter'; // Importing DefaultEventsMap from socket.io for event handling

const AddTaskModal = ({ socket }: { socket: Socket<DefaultEventsMap, DefaultEventsMap> }) => {
  const { newTask, updateTask, setNewTask, addTask } = useTaskStore(); // Destructuring task store actions
  const { isAddModalOpen, setIsAddModalOpen } = useModalStore(); // Destructuring modal store actions
  const { toast } = useToast(); // Destructuring toast hook
  const { data: session } = useSession(); // Using useSession hook to get the current session
  
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {},
  ); // Initializing errors state
  const { t } = useTranslation('common'); // Using useTranslation hook for translations

  const handleAddModalClose = () => {
    setIsAddModalOpen(false); // Closing the add task modal
    setNewTask(EmptyTask); // Resetting the new task state
    setErrors({}); // Clearing errors state
  };

  const validateForm = () => {
    const newErrors: { title?: string; dueDate?: string } = {}; // Initializing new errors object
    if (!newTask.title) {
      newErrors.title = 'Title is required'; // Setting error for missing title
    }
    if (!newTask.dueDate) {
      newErrors.dueDate = 'Due Date is required'; // Setting error for missing due date
    }
    setErrors(newErrors); // Updating errors state
    return Object.keys(newErrors).length === 0; // Returning true if no errors
  };

  const handleAddTask = async () => {
    // Check authentication
    if (!session || !session.user) {
      toast({
        title: 'Not authenticated',
        description: 'You must be logged in to add or update tasks.',
        variant: 'destructive',
        className: 'bg-red-500 text-white',
      }); // Displaying toast for authentication error
      return;
    }

    // Validate form fields
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in the required fields.',
        variant: 'destructive',
        className: 'bg-red-500 text-white',
      }); // Displaying toast for validation error
      return;
    }

    const taskPayload = {
      ...newTask,
      user: session.user.email, // Associating task with user
    };

    if (newTask._id) {
      // Update task if ID is present (PUT)
      try {
        const res = await fetch('/api/tasks/crud', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.token}`, // Including token if needed
          },
          body: JSON.stringify(taskPayload),
        });

        const result = await res.json();
        if (res.ok) {
          updateTask(result.task); // Updating task in the store
          toast({
            title: 'Task Updated Successfully',
            variant: 'default',
            className: 'bg-green-400 text-black',
            duration: 1500,
          }); // Displaying toast for successful update
          socket.emit('task:update', {
            title: newTask.title,
            userName: session.user.name || session.user.email,
          }); // Emitting task update event
        } else {
          toast({
            title: 'Error',
            description:
              result.message || 'An error occurred while updating the task.',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
          }); // Displaying toast for update error
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Server error occurred while updating the task.',
          variant: 'destructive',
          className: 'bg-red-500 text-white',
        }); // Displaying toast for server error during update
      }
    } else {
      // Add new task (POST)
      try {
        const response = await fetch('/api/tasks/crud', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.token}`, // Including token if needed
          },
          body: JSON.stringify(taskPayload),
        });

        const result = await response.json();
        if (response.ok) {
          addTask(result.task); // Adding task to the store
          toast({
            title: 'Task Added Successfully',
            variant: 'default',
            className: 'bg-green-400 text-black',
            duration: 1500,
          }); // Displaying toast for successful add
          socket.emit('task:add', {
            title: newTask.title,
            userName: session.user.name || session.user.email,
          }); // Emitting task add event
        } else {
          toast({
            title: 'Error',
            description:
              result.message || 'An error occurred while adding the task.',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
          }); // Displaying toast for add error
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Server error occurred while adding the task.',
          variant: 'destructive',
          className: 'bg-red-500 text-white',
        }); // Displaying toast for server error during add
      }
    }

    // Reset the task and close the modal
    setNewTask(EmptyTask); // Resetting the new task state
    setIsAddModalOpen(false); // Closing the add task modal
    setErrors({}); // Clearing errors state
  };

  return (
    <Dialog
      open={isAddModalOpen}
      onOpenChange={handleAddModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {newTask._id ? 'Edit Task' : t('addTask')}
          </DialogTitle>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='title'
              className='text-left'>
              Title
            </Label>
            <Input
              id='title'
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className='col-span-3'
            />
            {errors.title && (
              <p className='col-span-4 text-red-500 text-sm'>{errors.title}</p>
            )}
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='description'
              className='text-left'>
              Description
            </Label>
            <Textarea
              id='description'
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='status'
              className='text-left'>
              Status
            </Label>
            <Select
              value={newTask.status}
              onValueChange={(value) =>
                setNewTask({ ...newTask, status: value as TaskStatus })
              }>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='To Do'>To Do</SelectItem>
                <SelectItem value='In Progress'>In Progress</SelectItem>
                <SelectItem value='Completed'>Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='priority'
              className='text-left'>
              Priority
            </Label>
            <Select
              value={newTask.priority}
              onValueChange={(value) =>
                setNewTask({ ...newTask, priority: value as TaskPriority })
              }>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Select priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Low'>Low</SelectItem>
                <SelectItem value='Medium'>Medium</SelectItem>
                <SelectItem value='High'>High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='dueDate'
              className='text-left'>
              Due Date
            </Label>
            <Input
              id='dueDate'
              type='date'
              value={
                newTask.dueDate ? format(newTask.dueDate, 'yyyy-MM-dd') : ''
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  dueDate: e.target.value
                    ? new Date(e.target.value)
                    : undefined,
                })
              }
              className='col-span-3 w-fit'
            />
            {errors.dueDate && (
              <p className='col-span-4 text-red-500 text-sm'>
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type='submit'
            onClick={handleAddTask}>
            {newTask._id ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
