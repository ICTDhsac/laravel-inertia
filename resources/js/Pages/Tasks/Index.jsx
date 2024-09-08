import TaskForm from "./TaskForm"
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePending } from "react-icons/md";

export default function Index({tasks}) {
    console.log(tasks)
  return (
    <>
        <h1 className="text-xl text-primary font-bold mb-5">DAILY TASK</h1>
        <TaskForm />
        <div className="flex gap-5">

            {/* TO DO COLUMN */}
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-center text-warning flex items-center justify-center"><MdOutlinePending className="text-md" /> &nbsp;PENDING</h1>
                {tasks
                    .filter((task) => task.status === 'TO DO')
                    .map((task, key) => (
                        <div key={key} className="card bg-gray-300 text-black w-96 shadow-xl mb-5" draggable>
                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.body}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary">View</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* ONGOING COLUMN */}
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-center text-primary flex items-center justify-center"><GrInProgress className="text-md" /> &nbsp;ONGOING</h1>
                {tasks
                    .filter((task) => task.status === 'ONGOING') 
                    .map((task, key) => (
                        <div key={key} className="card bg-gray-300 text-black w-96 shadow-xl mb-5" draggable>
                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.body}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary">View</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* COMPLETE COLUMN */}
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-center text-success flex items-center justify-center"><GrInProgress className="text-md" /> &nbsp;COMPLETED</h1>
                {tasks
                    .filter((task) => task.status === 'COMPLETE')
                    .map((task, key) => (
                        <div key={key} className="card bg-gray-300 text-black w-96 shadow-xl mb-5" draggable>
                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.body}</p>
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
