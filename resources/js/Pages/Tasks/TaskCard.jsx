import DateComponent from "../../Helper/DateComponent";

import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function TaskCard({index, task, setActiveCard, onDrop, onShow}) {
    const [isDragging, setIsDragging] = useState(false);
    const [showDrop, setShowDrop] = useState(null);
    const { delete: destroy, processing } = useForm();

    const deleteTask = (e) => {
        e.preventDefault();
        const url = e.currentTarget.action;
        destroy(url,{
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                console.log(page);
            }
        });
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget)) return;
        let taskData = e.dataTransfer.getData('text/plain');
    
        try {
            taskData = JSON.parse(taskData);
            console.log("Dropped task:", taskData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
        }

        const data_id = e.currentTarget.getAttribute('data-id');
        console.log("data_id", data_id)
        if(taskData?.id == data_id) return;

        setShowDrop(taskData);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget)) return;
        console.log("handleDragLeave")
        setShowDrop(null);
    };

    return (
        <div
            data-id={task.id}
            draggable
            onDragStart={(e) => {
                setIsDragging(true);
                setActiveCard({index: index, id: task.id, status: task.status});
                e.dataTransfer.setData("text/plain", JSON.stringify(task));

            }}
            onDragEnd={() => {
                setActiveCard(null);
                setIsDragging(false);
            }}
            onDrop={() => {
                onDrop();
                setShowDrop(null);
            }}
            onDragOver={ (e) => e.preventDefault()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}     
        >
            {showDrop && (
                <article className="task-card card dragging pointer-events-none">
                    <div className="card-body">
                        <DateComponent dateTime={showDrop.created_at} />
                        <h5 className="card-title text-base dark:text-slate-300">{showDrop.title}</h5>
                        <p className="text-xs dark:text-slate-300">{showDrop.body}</p>
                    </div>
                </article>
            )}

            {/* Task Card */}
            <article
                key={index}
                className={`task-card cursor-pointer card ${isDragging ? "dragging" : ""}`}
            >
                <div className="card-body relative px-3 py-3">
                    {/* <div className="dropdown dropdown-left dropdown-hover dark:text-gray-200 absolute right-2">
                        <div tabIndex={0} role="button"
                            className='btn btn-xs btn-square btn-ghost'
                        >
                            <BsThreeDots />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-white text-black z-50 rounded-box w-52 shadow-lg">
                            <li><a>Option 1</a></li>
                            <li><a>Option 2</a></li>
                            <li><a>Option 3</a></li>
                            <li>
                                <form onSubmit={deleteTask} action={`/tasks/${task.id}`}>
                                    <button className="flex items-center">
                                        {processing ? <span className="loading loading-spinner loading-xs"></span> : <MdDelete />}
                                        &nbsp;Delete
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div> */}
                    <div className="absolute right-2">
                        <Dropdown label="" renderTrigger={() => <BsThreeDots />} placement="left-start">
                            <Dropdown.Header>
                                <span className="block text-sm">Bonnie Green</span>
                                <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
                            </Dropdown.Header>
                            <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
                            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                            <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <DateComponent dateTime={task.created_at} />
                    <section
                        className="pl-3 hover:underline"
                        onClick={() => onShow(task)}
                    >
                        <h5 className="card-title text-base dark:text-slate-300 mb-3">{task.title}</h5>
                        <p className="text-xs dark:text-slate-300">{task.body}</p>
                    </section>
                    {/* <div className="card-actions justify-end">
                        <form onSubmit={deleteTask} action={`/tasks/${task.id}`}>
                            <button className="btn btn-error btn-sm">
                                {processing ? <span className="loading loading-spinner loading-xs"></span> : <MdDelete />}
                                Delete
                            </button>
                        </form>
                    </div> */}
                </div>
            </article>

        </div>
    )
}
