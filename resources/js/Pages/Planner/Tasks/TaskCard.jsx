import DateComponent from "../../../Helper/DateComponent";

import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function TaskCard({index, task, activeCard, setActiveCard, onDrop, onShow}) {
    const [isDragging, setIsDragging] = useState(false);
    const [showDrop, setShowDrop] = useState(null);
    const { delete: destroy, processing } = useForm();

    // useEffect(() => {
    //     console.log('Active Card on task card:', activeCard);
    // }, [activeCard]);
    

    const deleteTask = () => {
        const url = `/tasks/${task.id}`;
        
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
        const current_id = e.currentTarget.getAttribute('data-id');
        console.log("activeCard drag enter", activeCard)
        if(activeCard.id == current_id) return;
        setShowDrop(activeCard);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setShowDrop(null);
    };

    return (
        <div
            data-id={task.id}
            draggable
            onDragStart={() => {
                setIsDragging(true);
                setActiveCard({...task, index: index});
            }}
            onDragEnter={handleDragEnter}
            onDragEnd={() => {
                setActiveCard(null);
                setIsDragging(false);
            }}
            onDrop={() => {
                onDrop();
                setShowDrop(null);
            }}
            onDragOver={ (e) => e.preventDefault()}
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
                    <div className="task-dropdown-toggle absolute right-0">
                        <Dropdown 
                            label="..."
                            arrowIcon={false}
                            placement="left-end"
                        >
                            <Dropdown.Header>
                                <small className="block text-sm">{task.status}</small>
                            </Dropdown.Header>
                            <Dropdown.Item icon={HiViewGrid}>Option1</Dropdown.Item>
                            <Dropdown.Item icon={HiCog}>Option2</Dropdown.Item>
                            <Dropdown.Item icon={HiCurrencyDollar}>Option3</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={deleteTask}>
                                <MdDelete /> Delete
                            </Dropdown.Item>
                        </Dropdown>
                        {processing ? <span className="mt-5 loading loading-spinner loading-xs"></span> : ""}
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
