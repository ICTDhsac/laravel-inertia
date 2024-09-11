import { useForm } from "@inertiajs/react";
import DateComponent from "../../Helper/DateComponent";
import { MdDelete } from "react-icons/md";
import { useRef, useState } from "react";

export default function TaskCard({index, task, setActiveCard}) {
    // const dragGhostRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
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

  return (
    <>
        <article
            key={index}
            className={`task-card card ${isDragging ? "dragging" : ""}`}
            draggable
            onDragStart={(e) => {
                // if (dragGhostRef.current) {
                //     e.dataTransfer.setDragImage(dragGhostRef.current, 0, 0);
                // }
                setIsDragging(true);
                setActiveCard({index: index, id: task.id, status: task.status})
            }}
            onDragEnd={() => {
                setActiveCard(null);
                setIsDragging(false);
            }}
        >
            <div className="card-body">
                <h1 className="text-xl font-bold text-primary">sort#: {task.sortIndex}</h1>
                <DateComponent dateTime={task.created_at} />
                <h5 className="card-title dark:text-slate-300">{task.title}</h5>
                <p className="dark:text-slate-300">{task.body}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary">View</button>
                    <form onSubmit={deleteTask} action={`/tasks/${task.id}`}>
                        <button className="btn btn-error btn-sm" onMouseDown={(e) => e.stopPropagation()}>
                            {processing ? <span className="loading loading-spinner loading-xs"></span> : <MdDelete />}
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </article>

        {/* <article
            className="task-card card"
            ref={dragGhostRef}
            style={{
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}
        >
            <div className="card-body">

                <DateComponent dateTime={task.created_at} />
                <h5 className="card-title dark:text-slate-300">{task.title}</h5>
                <p className="dark:text-slate-300">{task.body}</p>
            </div>
        </article> */}

    </>
  )
}
