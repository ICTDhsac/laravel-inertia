import { useForm } from "@inertiajs/react";
import DateComponent from "../../Helper/DateComponent";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export default function TaskCard({index, task, setActiveCard, onDrop, onShow}) {
    const [isDragging, setIsDragging] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
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

    const handleDragLeave = (e) => {
        const currentElement = e.currentTarget;
        const relatedTarget = e.relatedTarget;
    
        if (relatedTarget) {
            // Get the parent element of the current element
            const parentElement = currentElement.parentElement;
    
            // Check if relatedTarget is a sibling of the currentElement
            const isSibling = relatedTarget.parentElement === parentElement;
    
            // Check if relatedTarget is a child of the parentElement
            const isChildOfParent = parentElement.contains(relatedTarget);
    
            if (isSibling ) {
                // If relatedTarget is a sibling or still within parentElement, do not hide the drop area
                return;
            }
        }
    
        // If the drag leaves both the task card and drop area, hide the drop area
        setShowDrop(false);
    };

    return (
        <div className="border-2">
            {showDrop && (
                <section className="drop-area"
                    onDrop={() => onDrop()}
                    onDragOver={ (e) => e.preventDefault()}
                    onDragEnter={() => setShowDrop(true)}
                    onDragLeave={handleDragLeave}
                >
                    <span>Drop Here</span>
                </section>
            )}
            {/* Task Card */}
            <article
                key={index}
                className={`task-card card ${isDragging ? "dragging" : ""}`}
                draggable
                onDragStart={() => {
                    setIsDragging(true);
                    setActiveCard({index: index, id: task.id, status: task.status});

                }}
                onDragEnd={() => {
                    setActiveCard(null);
                    setIsDragging(false);
                    setShowDrop(false);
                }}
                onDrop={() => onDrop()}
                onDragOver={ (e) => e.preventDefault()}
                onDragEnter={() => {
                        setShowDrop(true);
                        console.log("onDragEnter", task.status + index);
                    }
                }
                // onDragLeave={() => {
                //         setShowDrop(false)
                //         console.log("onDragLeave", task.status + index);
                //     }
                // }
                onDragLeave={handleDragLeave}
            >
                <div className="card-body">
                    {/* <h1 className="text-xl font-bold text-primary">sort#: {task.sortIndex}</h1> */}
                    <DateComponent dateTime={task.created_at} />
                    <h5 className="card-title dark:text-slate-300">{task.title}</h5>
                    <p className="dark:text-slate-300">{task.body}</p>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => onShow(task)}
                        >
                            View
                        </button>
                        <form onSubmit={deleteTask} action={`/tasks/${task.id}`}>
                            <button className="btn btn-error btn-sm">
                                {processing ? <span className="loading loading-spinner loading-xs"></span> : <MdDelete />}
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </article>

        </div>
    )
}
