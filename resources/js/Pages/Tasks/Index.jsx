import TaskForm from "./TaskForm"
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePending } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import TaskColumn from "./TaskColumn";

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

export default function Index({tasks}) {
    
  return (
    <>
        <h1 className="text-xl text-primary font-bold mb-5">DAILY TASK</h1>
        <TaskForm statuses={columnStatus.map(item => ({label: item.title, value: item.status}))}/>

        {/*main container for the kanban */}
        <div className="flex gap-5 max-w-full overflow-x-auto pb-4">

            {/* TO DO COLUMN */}
            {columnStatus.map((cStatus, i) => (
                <TaskColumn
                    key={i}
                    title={cStatus.title}
                    icon={cStatus.icon}
                    color={cStatus.color}
                    tasks={tasks.filter((task) => task.status === cStatus.status)}
                />
            ))}

        </div>
        
    </>
  )
}
