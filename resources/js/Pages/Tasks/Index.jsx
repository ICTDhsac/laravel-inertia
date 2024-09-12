import '../../../css/tasks.css';
import TaskForm from "./TaskForm"
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePending } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import TaskColumn from "./TaskColumn";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react';

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
    const [duties, setDuties] = useState([]);

    const handleOnDrop = (status, position) => {
        
        if(activeCard == null || activeCard == undefined) return;

        console.log(`status: ${activeCard.status} - index: ${activeCard.index} - ID# - ${activeCard.id}  is going to place into ${status} and at the position ${position}`)

        setDuties(prevDuties => {
            // Clone the previous state
            const newDuties = { ...prevDuties };

            // Get the tasks from the current status column and clone it
            const activeColumnTasks = [...newDuties[activeCard.status]];
            const taskToMove = activeColumnTasks.splice(activeCard.index, 1); // Remove the task from the old position
    
            // Add the task to the new position in the new status column
            let newStatusTasks = newDuties[status] ? [...newDuties[status]] : [];
            if(status == activeCard.status){
                newStatusTasks = activeColumnTasks ? [...activeColumnTasks] : [];
            }
            newStatusTasks.splice(position, 0, { ...taskToMove[0], status });
    
            // Update the duties object
            newDuties[activeCard.status] = activeColumnTasks;
            newDuties[status] = newStatusTasks;

            const updatedTasks = Object.entries(newDuties).flatMap(([status, tasks]) => 
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
            
    
            return newDuties;
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
            setDuties((prev) => {
                return { ...prev, [column.status]: tasks.filter((task) => task.status === column.status)}
            }) 
        });
        console.log("tasks!!!!!!", tasks)
    }, [tasks])


    useEffect( () => {
        if(duties){
            Object.entries(duties).map(([status, tasks]) => {
                console.log(`Status: ${status}, Number of Tasks: ${tasks.length}`);
            });
        }
        console.log(duties)
    }, [duties])
    

    
  return (
    <>
        <ToastContainer />
        <h1 className="text-xl text-primary font-bold mb-5">DAILY TASK</h1>
        <TaskForm statuses={columnStatus.map(item => ({label: item.title, value: item.status}))}/>

        {/*main container for the kanban */}
        <div className="flex gap-5 max-w-full overflow-x-auto pb-4">

            {/* TO DO COLUMN */}
            {columnStatus.map((column, i) => (
                <TaskColumn
                    key={i}
                    column = {column}
                    tasks={duties?.[column.status] ?? []}
                    setActiveCard={setActiveCard}
                    onDrop={handleOnDrop}
                />
            ))}

        </div>
        
    </>
  )
}
