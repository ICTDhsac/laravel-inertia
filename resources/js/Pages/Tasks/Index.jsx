import '../../../css/tasks.css';
import TaskForm from "./TaskForm"
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePending } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import TaskColumn from "./TaskColumn";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

const columnStatus = [
        {
            status: "TO DO",
            title: "TO DO",
            icon: <MdOutlinePending className="text-md"/>,
            color: "text-warning"

        },
        {
            status: "ONGOING",
            title: "ONGOING",
            icon: <GrInProgress className="text-md"/>,
            color: "text-primary"

        },
        {
            status: "COMPLETE",
            title: "COMPLETED",
            icon: <FaCheckToSlot className="text-md"/>,
            color: "text-success"

        },
        {
            status: "IN PROGRESS",
            title: "IN PROGRESS",
            icon: <FaCheckToSlot className="text-md"/>,
            color: "text-info"

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

    const handleOnDrop = (status, position) => {
        console.log(`${activeCard} is going to place into ${status} and at the position ${position}`)

        if(activeCard == null || activeCard == undefined) return;

        const taskToMove = tasks[activeCard];
        const updateTasks = tasks.filter((task, index) => index !== activeCard);
        updateTasks.splice(position, 0, {
            ...taskToMove,
            status: status
        });
        tasks = updateTasks;
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
    }, [flash]);
    
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
                    tasks={tasks.filter((task) => task.status === column.status)}
                    setActiveCard={setActiveCard}
                    onDrop={handleOnDrop}
                />
            ))}

        </div>
        
    </>
  )
}
