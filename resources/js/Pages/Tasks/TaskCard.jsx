import { useForm } from "@inertiajs/react";
import DateComponent from "../../Helper/DateComponent";
import { MdDelete } from "react-icons/md";

export default function TaskCard({index, task, setActiveCard}) {
    const { delete: destroy, processing } = useForm();

    const deleteTask = (e) => {
        e.preventDefault();
        const url = e.currentTarget.action;
        destroy(url,{ preserveScroll: true, preserveState: true });
    }

  return (
    <>
        <article
            key={index}
            className="task-card card cursor-grab bg-gray-200 dark:bg-gray-800 text-black shadow-xl mb-5"
            draggable onDragStart={() => setActiveCard({index: index, id: task.id, status: task.status})}
            onDragEnd={() => setActiveCard(null)}
        >
            <div className="card-body">
                <h1 className="text-xl font-bold text-primary">sort#: {task.sortIndex}</h1>
                <DateComponent dateTime={task.created_at} />
                <h5 className="card-title dark:text-slate-300">{task.title}</h5>
                <p className="dark:text-slate-300">{task.body}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary">View</button>
                    <form onSubmit={deleteTask} action={`/tasks/${task.id}`}>
                        <button className="btn btn-error btn-sm ">
                            {processing ? <span className="loading loading-spinner loading-xs"></span> : <MdDelete />}
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </article>

    </>
  )
}
