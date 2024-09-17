import '../../../css/tasks.css';

import TaskForm from "./TaskForm"
import ScrollArrow from '../../Helper/ScrollArrow';
import TaskColumn from "./TaskColumn";
import Show from './Show';
import { MdOutlinePending } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { router } from '@inertiajs/react';
import Loader from '../../Layouts/Loader';

const columnStatus = [
    {
        status: "TO DO",
        title: "TO DO",
        icon: <MdOutlinePending className="text-md"/>,
        color: "text-warning"

    },
    {
        status: "IN PROGRESS",
        title: "IN PROGRESS",
        icon: <FaCheckToSlot className="text-md"/>,
        color: "text-info"

    },
    {
        status: "COMPLETED",
        title: "COMPLETED",
        icon: <FaCheckToSlot className="text-md"/>,
        color: "text-success"

    },
    {
        status: "CANCELLED",
        title: "CANCELLED",
        icon: <FaCheckToSlot className="text-md"/>,
        color: "text-error"

    },
    {
        status: "BACKLOGS",
        title: "BACKLOGS",
        icon: <FaCheckToSlot className="text-md"/>,
        color: "text-amber-500"
    },
    
];

export default function Index({tasks, flash}) {

    const [activeCard, setActiveCard] = useState(null);
    const [todos, setTodos] = useState([]);
    const containerRef = useRef(null);
    const [task, setTask] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleShow = (data) => {
        setIsDrawerOpen(true);
        setTask(data);
    }
    

    const handleOnDrop = (status, position) => {

        if(activeCard == null || activeCard == undefined) return;

        console.log(`status: ${activeCard.status} - index: ${activeCard.index} - ID# - ${activeCard.id}  is going to place into ${status} and at the position ${position}`)

        setTodos(prevTodos => {
            // Clone the previous state
            const newTodos = { ...prevTodos };

            // Get the tasks from the current status column and clone it
            const activeColumnTasks = [...newTodos[activeCard.status]];
            const taskToMove = activeColumnTasks.splice(activeCard.index, 1); // Remove the task from the old position
    
            // Add the task to the new position in the new status column
            let newStatusTasks = newTodos[status] ? [...newTodos[status]] : [];
            if(status == activeCard.status){
                newStatusTasks = activeColumnTasks ? [...activeColumnTasks] : [];
            }
            newStatusTasks.splice(position, 0, { ...taskToMove[0], status });
    
            // Update the duties object
            newTodos[activeCard.status] = activeColumnTasks;
            newTodos[status] = newStatusTasks;

            const updatedTasks = Object.entries(newTodos).flatMap(([status, tasks]) => 
                tasks.map((task, i) => ({ ...task, sortIndex: i }))
            );

            router.put('/tasks-batch', {tasks: updatedTasks}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    console.log("Tasks updated successfully", page);
                },
                onError: () => {
                    console.log("Tasks update error");
                },
                only: ['flash'],
                replace: true
            });
            
    
            return newTodos;
        });

    }

    const notify = (res) => {
        const { error, message } = res;
        if(error){
            toast.error(message);
        }else{
            toast.success(message);
        }
    }

    useEffect(() => {
        if (flash.response) {
            notify(flash.response);
        }
        console.log("flash", flash)
    }, [flash]);

    useEffect( () => {
        columnStatus.forEach((column) => {
            setTodos((prev) => {
                return { ...prev, [column.status]: tasks.filter((task) => task.status === column.status)}
            }) 
        });
    }, [tasks])


    useEffect( () => {
        if(todos){
            Object.entries(todos).map(([status, tasks]) => {
                console.log(`Status: ${status}, Number of Tasks: ${tasks.length}`);
            });
        }
    }, [todos]);

    
  return (
    <>
        <ToastContainer />
        <h1 className="text-xl text-primary font-bold mb-5">DAILY TASK</h1>
        <TaskForm statuses={columnStatus.map(item => ({label: item.title, value: item.status}))}/>

        {/*main container for the kanban */}
        <div className="relative group">
            <div
                className="flex gap-5 max-w-full overflow-x-auto scroll-smooth pb-4"
                ref={containerRef}
            >

                {/* TO DO COLUMN */}
                {columnStatus.map((column, i) => (
                    <TaskColumn
                        key={i}
                        column = {column}
                        tasks={todos?.[column.status] ?? []}
                        setActiveCard={setActiveCard}
                        onDrop={handleOnDrop}
                        onShow={handleShow}
                    />
                ))}
            </div>
            
            <ScrollArrow containerRef={containerRef} />
        </div>

        <Show isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} task={task}/>
    </>
  )
}
