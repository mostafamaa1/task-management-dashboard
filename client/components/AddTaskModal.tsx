// "use client";

// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { format } from "date-fns";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { EmptyTask } from "@/lib/constants";
// import { useTaskStore } from "@/store/taskStore";
// import { useModalStore } from "@/store/modalStore";
// import { TaskPriority, TaskStatus } from "@/types/types";
// import { useDashboardStore } from "@/store/dashboardStore";
// import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from "./ui/dialog";
// import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "./ui/select";
// import { useSession } from 'next-auth/react';

// const AddTaskModal = () => {

//   const { newTask, updateTask, setNewTask, addTask } = useTaskStore();
//   const { isAddModalOpen, setIsAddModalOpen } = useModalStore();
//   const { user } = useDashboardStore();
//   const { toast } = useToast();
//   const { data: session, status } = useSession();

//   const handleAddModalClose = () => {
//     setIsAddModalOpen(false);
//     setNewTask(EmptyTask);
//   };

//   const handleAddTask = async () => {

//     // if there is id present in task it will update that task
//     if (newTask._id) {
//       const url = '/api/tasks/crud';
//       const headers = {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...newTask }),
//       };
//       const res = await fetch(url, headers);
//       const data = await res.json();

//       updateTask(newTask);
//       toast({
//         title: "Task Updated",
//         variant: "default",
//         className: "bg-green-400 text-black",
//         duration: 1500,
//       });
//       setNewTask(EmptyTask);
//       setIsAddModalOpen(false);
//     } else {

//       // is there is no id present in task it will add new task to the list
//       try {
//         const url = '/api/tasks/crud';
//         const headers = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${session?.user?.token}`,
//           },
//           body: JSON.stringify({ ...newTask, user: session?.user?.email }),
//         };
//         const res = await fetch(url, headers);
//         const data = await res.json();
//         addTask(data.task);
//         toast({
//           title: "Task Added",
//           variant: "default",
//           className: "bg-green-400 text-black",
//           duration: 1500,
//         });
//       } catch (error) {
//         console.error(error);
//       }

//       setNewTask(EmptyTask);
//       setIsAddModalOpen(false);
//     }
//   };


//   return (
//     <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
//       <DialogContent>
        
//         <DialogHeader>
//           <DialogTitle>
//             {newTask._id ? "Edit Task" : "Add New Task"}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4 ">
//           <div className="grid grid-cols-4 items-center gap-4 ">
//             <Label htmlFor="title" className="text-left">
//               Title
//             </Label>
//             <Input
//               id="title"
//               value={newTask.title}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, title: e.target.value })
//               }
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="description" className="text-left">
//               Description
//             </Label>
//             <Textarea
//               id="description"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-left">
//               Status
//             </Label>
//             <Select
//               value={newTask.status}
//               onValueChange={(value) =>
//                 setNewTask({ ...newTask, status: value as TaskStatus })
//               }
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="To Do">To Do</SelectItem>
//                 <SelectItem value="In Progress">In Progress</SelectItem>
//                 <SelectItem value="Completed">Completed</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="priority" className="text-left">
//               Priority
//             </Label>
//             <Select
//               value={newTask.priority}
//               onValueChange={(value) =>
//                 setNewTask({ ...newTask, priority: value as TaskPriority })
//               }
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select priority" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Low">Low</SelectItem>
//                 <SelectItem value="Medium">Medium</SelectItem>
//                 <SelectItem value="High">High</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="dueDate" className="text-left">
//               Due Date
//             </Label>
//             <Input
//               id="dueDate"
//               type="date"
//               value={
//                 newTask.dueDate ? format(newTask.dueDate, "yyyy-MM-dd") : ""
//               }
//               onChange={(e) =>
//                 setNewTask({...newTask,dueDate: e.target.value? new Date(e.target.value): undefined,})
//               }
//               className="col-span-3 w-fit"
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button type="submit" onClick={handleAddTask}>
//             {newTask._id ? "Save Changes" : "Add Task"}
//           </Button>
//         </DialogFooter>

//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddTaskModal;

// "use client";

// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { format } from "date-fns";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { EmptyTask } from "@/lib/constants";
// import { useTaskStore } from "@/store/taskStore";
// import { useModalStore } from "@/store/modalStore";
// import { TaskPriority, TaskStatus } from "@/types/types";
// import { useDashboardStore } from "@/store/dashboardStore";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { useSession } from 'next-auth/react';

// const AddTaskModal = () => {
//   const { newTask, updateTask, setNewTask, addTask } = useTaskStore();
//   const { isAddModalOpen, setIsAddModalOpen } = useModalStore();
//   const { toast } = useToast();
//   const { data: session } = useSession(); // Get session data

//   const handleAddModalClose = () => {
//     setIsAddModalOpen(false);
//     setNewTask(EmptyTask);
//   };

//   const handleAddTask = async () => {
//     if (!session || !session.user) {
//       toast({
//         title: "Not authenticated",
//         description: "You must be logged in to add or update tasks.",
//         variant: "destructive",
//         className: "bg-red-500 text-white",
//       });
//       return;
//     }

//     const taskPayload = {
//       ...newTask,
//       user: session.user.email, // Associate task with user
//     };

//     if (newTask._id) {
//       // Update task if ID is present (PUT)
//       try {
//         const response = await fetch("/api/tasks/crud", {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(taskPayload),
//         });

//         const result = await response.json();
//         if (response.ok) {
//           updateTask(result.task);
//           toast({
//             title: "Task Updated",
//             description: "The task has been updated successfully.",
//             variant: "default",
//             className: "bg-green-400 text-black",
//             duration: 1500,
//           });
//         } else {
//           toast({
//             title: "Error",
//             description: result.message || "An error occurred while updating the task.",
//             variant: "destructive",
//             className: "bg-red-500 text-white",
//           });
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Server error occurred while updating the task.",
//           variant: "destructive",
//           className: "bg-red-500 text-white",
//         });
//       }
//     } else {
//       // Add new task (POST)
//       try {
//         const response = await fetch("/api/tasks/crud", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${session.user.token}`, // Include token if needed
//           },
//           body: JSON.stringify(taskPayload),
//         });

//         const result = await response.json();
//         if (response.ok) {
//           addTask(result.task);
//           toast({
//             title: "Task Added",
//             description: "New task has been added successfully.",
//             variant: "default",
//             className: "bg-green-400 text-black",
//             duration: 1500,
//           });
//         } else {
//           toast({
//             title: "Error",
//             description: result.message || "An error occurred while adding the task.",
//             variant: "destructive",
//             className: "bg-red-500 text-white",
//           });
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Server error occurred while adding the task.",
//           variant: "destructive",
//           className: "bg-red-500 text-white",
//         });
//       }
//     }

//     // Reset the task and close the modal
//     setNewTask(EmptyTask);
//     setIsAddModalOpen(false);
//   };

//   return (
//     <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{newTask._id ? "Edit Task" : "Add New Task"}</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="title" className="text-left">
//               Title
//             </Label>
//             <Input
//               id="title"
//               required
//               value={newTask.title}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, title: e.target.value })
//               }
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="description" className="text-left">
//               Description
//             </Label>
//             <Textarea
//               id="description"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="status" className="text-left">
//               Status
//             </Label>
//             <Select
//               value={newTask.status}
//               onValueChange={(value) =>
//                 setNewTask({ ...newTask, status: value as TaskStatus })
//               }
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="To Do">To Do</SelectItem>
//                 <SelectItem value="In Progress">In Progress</SelectItem>
//                 <SelectItem value="Completed">Completed</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="priority" className="text-left">
//               Priority
//             </Label>
//             <Select
//               value={newTask.priority}
//               onValueChange={(value) =>
//                 setNewTask({ ...newTask, priority: value as TaskPriority })
//               }
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select priority" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Low">Low</SelectItem>
//                 <SelectItem value="Medium">Medium</SelectItem>
//                 <SelectItem value="High">High</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="dueDate" className="text-left">
//               Due Date
//             </Label>
//             <Input
//               id="dueDate"
//               type="date"
//               required
//               value={newTask.dueDate ? format(newTask.dueDate, "yyyy-MM-dd") : ""}
//               onChange={(e) =>
//                 setNewTask({
//                   ...newTask,
//                   dueDate: e.target.value ? new Date(e.target.value) : undefined,
//                 })
//               }
//               className="col-span-3 w-fit"
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button type="submit" onClick={handleAddTask}>
//             {newTask._id ? "Save Changes" : "Add Task"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddTaskModal;


"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { EmptyTask } from "@/lib/constants";
import { useTaskStore } from "@/store/taskStore";
import { useModalStore } from "@/store/modalStore";
import { TaskPriority, TaskStatus } from "@/types/types";
import { useDashboardStore } from "@/store/dashboardStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const AddTaskModal = () => {
  const { newTask, updateTask, setNewTask, addTask } = useTaskStore();
  const { isAddModalOpen, setIsAddModalOpen } = useModalStore();
  const { toast } = useToast();
  const { data: session } = useSession(); // Get session data

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewTask(EmptyTask);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: { title?: string; dueDate?: string } = {};
    if (!newTask.title) {
      newErrors.title = "Title is required";
    }
    if (!newTask.dueDate) {
      newErrors.dueDate = "Due Date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = async () => {
    // Check authentication
    if (!session || !session.user) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to add or update tasks.",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // Validate form fields
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in the required fields.",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }

    const taskPayload = {
      ...newTask,
      user: session.user.email, // Associate task with user
    };

    if (newTask._id) {
      // Update task if ID is present (PUT)
      try {
        const response = await fetch("/api/tasks/crud", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskPayload),
        });

        const result = await response.json();
        if (response.ok) {
          updateTask(result.task);
          toast({
            title: "Task Updated",
            description: "The task has been updated successfully.",
            variant: "default",
            className: "bg-green-400 text-black",
            duration: 1500,
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "An error occurred while updating the task.",
            variant: "destructive",
            className: "bg-red-500 text-white",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Server error occurred while updating the task.",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      }
    } else {
      // Add new task (POST)
      try {
        const response = await fetch("/api/tasks/crud", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`, // Include token if needed
          },
          body: JSON.stringify(taskPayload),
        });

        const result = await response.json();
        if (response.ok) {
          addTask(result.task);
          toast({
            title: "Task Added",
            description: "New task has been added successfully.",
            variant: "default",
            className: "bg-green-400 text-black",
            duration: 1500,
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "An error occurred while adding the task.",
            variant: "destructive",
            className: "bg-red-500 text-white",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Server error occurred while adding the task.",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });
      }
    }

    // Reset the task and close the modal
    setNewTask(EmptyTask);
    setIsAddModalOpen(false);
    setErrors({});
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{newTask._id ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="col-span-3"
            />
            {errors.title && (
              <p className="col-span-4 text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-left">
              Status
            </Label>
            <Select
              value={newTask.status}
              onValueChange={(value) =>
                setNewTask({ ...newTask, status: value as TaskStatus })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-left">
              Priority
            </Label>
            <Select
              value={newTask.priority}
              onValueChange={(value) =>
                setNewTask({ ...newTask, priority: value as TaskPriority })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-left">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={newTask.dueDate ? format(newTask.dueDate, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  dueDate: e.target.value ? new Date(e.target.value) : undefined,
                })
              }
              className="col-span-3 w-fit"
            />
            {errors.dueDate && (
              <p className="col-span-4 text-red-500 text-sm">{errors.dueDate}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleAddTask}>
            {newTask._id ? "Save Changes" : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
