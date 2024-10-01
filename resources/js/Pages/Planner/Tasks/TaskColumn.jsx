
import React, { useEffect, useState } from "react";
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";
import * as MdIcons from "react-icons/md"; // Material Design Icons

export default function TaskColumn({column, tasks, activeCard, setActiveCard, onDrop, onShow}) {

    let IconComponent = MdIcons[column?.iconName] || MdIcons['MdOutlinePending'];

    useEffect(() => {
        IconComponent = MdIcons[column?.iconName] || MdIcons['MdOutlinePending'];
    }, [column?.iconName]);
    

    return (
        <>
            <div className="shadow" draggable>
                <h1 className={`text-gray-700 dark:text-slate-300 text-xl font-bold text-center flex items-center justify-center mb-5 shadow-md`}>{IconComponent && <IconComponent />} &nbsp;{column.title}</h1>
                <div className="py-4 px-3 w-96 min-h-96 max-h-screen overflow-y-auto"
                    // onDrop={() => onDrop(column.status, 0)}
                    // onDragOver={ (e) => e.preventDefault()}
                >
                    <DropArea onDrop={() => onDrop(column.status, 0)} />
                    {tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            <TaskCard
                                index={index}
                                task={task}
                                activeCard={activeCard}
                                setActiveCard={setActiveCard}
                                onDrop={() => onDrop(column.status, index )}
                                onShow={onShow}
                            />
                            <DropArea onDrop={() => onDrop(column.status, index + 1)} />
                        </React.Fragment>
                            
                    ))}
                </div>
            </div>

        </>
    )
}
