import TaskForm from "./TaskForm"

export default function Index({tasks}) {
    console.log(tasks)
  return (
    <>
        <h1 className="text-xl text-primary font-bold mb-5">TO DO LIST</h1>
        <TaskForm />

        {tasks.map((task, key) => (
            <div key={key} className="card bg-gray-300 text-black w-96 shadow-xl mb-5" draggable>
                <div className="card-body">
                    <h2 className="card-title">{task.title}</h2>
                    <p>{task.body}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-sm btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}
