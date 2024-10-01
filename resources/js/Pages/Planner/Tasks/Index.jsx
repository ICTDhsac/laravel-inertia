import '../../../../css/tasks.css';
/*Page Components */
import Main from '../Main';
import TaskColumn from "./TaskColumn";
import Create from './Create';
import Show from './Show';
/* Helper Components */
import ScrollArrow from '../../../Helper/ScrollArrow';
/* React */
import { useEffect, useRef, useState } from "react";
import { router } from '@inertiajs/react';
/* Plugins */
import { ToastContainer, toast } from "react-toastify";
/* UI PLugins */
import { Button } from 'flowbite-react';
import { HiViewGridAdd } from "react-icons/hi";
/* Data */
import { columnStatus } from '../../../Data/ColumnStatus';



export default function Index({tasks, members, flash}) {

    const [activeCard, setActiveCard] = useState(null);
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState(null);
    const [taskColumns, setTaskColumns] = useState(columnStatus);
    const [openCreate, setOpenCreate] =  useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const containerRef = useRef(null);


    console.log(members)

    const handleShow = (data) => {
        setIsDrawerOpen(true);
        setTask(data);
    }
    

    const handleOnDrop = (status, position) => {

        if(activeCard == null || activeCard == undefined) return;
        if(activeCard.status == status && position == activeCard.index) return;

        console.log(`status: ${activeCard.status} - index: ${activeCard.index} - ID# - ${activeCard.id}  is going to place into ${status} and at the position ${position}`)
        
        setTodos(prevTodos => {
            // Clone the previous state
            const newTodos = { ...prevTodos };

            // Get the tasks from the current status column and clone it
            const activeColumnTasks = [...newTodos[activeCard.status]];
            const taskToMove = activeColumnTasks.splice(activeCard.index, 1); // Remove the task from the old position
    
            // Add the task to the new position in the new status column
            let newStatusTasks = newTodos[status] ? [...newTodos[status]] : [];
            if(status == activeCard.status){
                newStatusTasks = activeColumnTasks ? [...activeColumnTasks] : [];
            }
            newStatusTasks.splice(position, 0, { ...taskToMove[0], status });
    
            // Update the duties object
            newTodos[activeCard.status] = activeColumnTasks;
            newTodos[status] = newStatusTasks;

            const updatedTasks = Object.entries(newTodos).flatMap(([status, tasks]) => 
                tasks.map((task, i) => ({ ...task, sortIndex: i }))
            );

            router.put('/tasks-batch', {tasks: updatedTasks}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    console.log("Tasks updated successfully", page);
                },
                onError: () => {
                    console.log("Tasks update error");
                },
                only: ['flash'],
                replace: true
            });
            
    
            return newTodos;
        });

    }

    const notify = (res) => {
        const { error, message } = res;
        if(error){
            toast.error(message);
        }else{
            toast.success(message);
        }
    }

    useEffect(() => {
        
        console.log("activeCard", activeCard)
    }, [activeCard]);

    useEffect(() => {
        if (flash.response) {
            notify(flash.response);
        }
        console.log("flash", flash)
    }, [flash]);

    useEffect( () => {
        taskColumns.forEach((column) => {
            setTodos((prev) => {
                return { ...prev, [column.status]: tasks.filter((task) => task.status === column.status)}
            }) 
        });
    }, [tasks])

    useEffect( () => {
        console.log("taskColumns: ", taskColumns)
    }, [taskColumns])


    useEffect( () => {
        if(todos){
            Object.entries(todos).map(([status, tasks]) => {
                console.log(`Status: ${status}, Number of Tasks: ${tasks.length}`);
            });
        }
    }, [todos]);

    
    return (
        <>
            <Main>
        
                <ToastContainer />

                {/*main container for the kanban */}
                <Button onClick={() => setOpenCreate(true)} gradientDuoTone="greenToBlue" outline pill><HiViewGridAdd className='mr-2 h-5 w-5'/> Create</Button>
                <div className="relative group">
                    <div
                        className="flex gap-5 max-w-full overflow-x-auto scroll-smooth pb-4"
                        ref={containerRef}
                    >

                        {/* TO DO COLUMN */}
                        {taskColumns &&
                        taskColumns.map((column, i) => (
                            <TaskColumn
                                key={i}
                                column = {column}
                                tasks={todos?.[column.status] ?? []}
                                activeCard={activeCard}
                                setActiveCard={setActiveCard}
                                onDrop={handleOnDrop}
                                onShow={handleShow}
                            />
                        ))}
                    </div>
                    
                    <ScrollArrow containerRef={containerRef} />
                </div>
                
                {/* Modals */}
                <Create isOpen={openCreate} onClose={() => setOpenCreate(false)} statuses={taskColumns.map(item => ({label: item.title, value: item.status}))} members={members.map(member => ({label: member.username, value: member.id}))}/>

                {/* Drawers */}
                <Show isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} task={task}/>
            </Main>
        </>
    )
}
