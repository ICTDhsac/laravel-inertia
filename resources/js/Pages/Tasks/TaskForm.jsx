import { useForm} from "@inertiajs/react";
import { useState } from "react";

/*** icons ***/
import { IoIosAddCircle } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { TbTableColumn } from "react-icons/tb";
import { MdError } from "react-icons/md";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Alert from "../../Layouts/Alert";

const animatedComponents = makeAnimated();


const options = [
    { value: 'TO DO', label: 'TO DO' },
    { value: 'ONGOING', label: 'ONGOING' },
    { value: 'COMPLETED', label: 'COMPLETED' },
    { value: 'CANCELLED', label: 'CANCELLED' }
]


export default function TaskForm({statuses}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
        status: null
    });

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (e) => {
        const {name, value } = e.target;
        setData(name, value);
    }


    const handleSelectOption = (selected) => {
        setSelectedOption(selected);
        setData('status', selected.value);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        post('/tasks', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                console.log("Task created successfully");
                reset();
                setSelectedOption(null);
            },
            onError: () => {
                console.log("Task creation error");
            }
        })
    }   

    return (
        <>
            <div className="bg-white dark:bg-gray-800 text-gray-200 dark:text-white md:w-full lg:w-1/2 mx-auto border border-gray-400 rounded p-2">
                <form onSubmit={handleSubmitForm}>
                    <label className="input bg-white dark:bg-gray-800 flex items-center gap-2">
                        <FaTasks className="dark:text-white" />
                        <input
                            type="text"
                            name="title"
                            className="grow"
                            placeholder="Enter Your Task"
                            onChange={handleChange}
                            value={data?.title}
                        />
                    </label>
                    { errors.title && <p className="text-error flex items-center pl-10"><MdError/> {errors.title}</p> }
                    <label className="input bg-white dark:bg-gray-800 flex items-center gap-2">
                        <TbTableColumn className="dark:text-white"/>
                        <Select
                            name="status"
                            className="w-full"
                            placeholder="Status"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            options={statuses}
                            // isMulti
                            onChange={handleSelectOption}
                            value={selectedOption}
                        />
                    </label>
                    { errors.status && <p className="text-error flex items-center pl-10"><MdError/> {errors.status}</p> }

                    <div className="flex justify-end mt-3 px-5">
                        <button 
                            className="btn btn-sm btn-active btn-primary text-gray-100"
                            disabled={processing}
                        >
                            {processing ? <span className="loading loading-spinner loading-xs"></span> : <IoIosAddCircle />}
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
            <div className="divider">TO DO LIST</div>
        </>
    )
}
