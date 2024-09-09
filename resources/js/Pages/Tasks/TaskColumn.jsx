
export default function TaskColumn({title, icon, color, tasks}) {
  return (
    <>
        <div>
            <h1 className={`text-xl font-bold text-center flex items-center justify-center mb-5 shadow-md ${color}`}>{icon} &nbsp;{title}</h1>
            <div className="px-5 w-96 max-h-screen overflow-y-auto">
                {tasks.map((task, key) => (
                        <div key={key} className="card bg-gray-200 dark:bg-gray-800 text-black shadow-xl mb-5" draggable>
                            <div className="card-body">
                                <div className="text-sm text-slate-800 dark:text-slate-300">
                                    <span>Posted on: </span>
                                    <span> {new Date(task.created_at).toLocaleDateString()}</span>
                                    <span> {new Date(task.created_at).toLocaleTimeString()}</span>
                                </div>
                                <h5 className="card-title dark:text-slate-300">{task.title}</h5>
                                <p className="dark:text-slate-300">{task.body}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary">View</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
