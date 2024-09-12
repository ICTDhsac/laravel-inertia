import React from "react";
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";

export default function TaskColumn({column, tasks, setActiveCard, onDrop}) {

    return (
        <>
            <div className="shadow" draggable>
                <h1 className={`bg-white dark:bg-transparent text-xl font-bold text-center flex items-center justify-center mb-5 shadow-md ${column.color}`}>{column.icon} &nbsp;{column.title}</h1>
                <div className="py-4 px-5 w-96 max-h-screen overflow-y-auto">
                    <DropArea onDrop={() => onDrop(column.status, 0)}/>
                    {tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            <TaskCard
                                index={index}
                                task={task}
                                setActiveCard={setActiveCard}
                            />
                            <DropArea onDrop={() => onDrop(column.status, index + 1)} />
                        </React.Fragment>
                            
                        ))
                    }
                </div>
            </div>
        </>
    )
}
