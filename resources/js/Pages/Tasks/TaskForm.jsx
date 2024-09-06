import { useForm} from "@inertiajs/react";
// import { FaGear } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


const options = [
    { value: 'TO DO', label: 'TO DO' },
    { value: 'ONGOING', label: 'ONGOING' },
    { value: 'COMPLETED', label: 'COMPLETED' },
    { value: 'CANCELLED', label: 'CANCELLED' }
]


export default function TaskForm() {
    const { data, setData, post, processing, errors, reset, clearErrors, control, handleSubmit, setValue, getValues } = useForm({
        title: '',
        body: '',
        status: []
    });

    const handleChange = (e) => {
        console.log(e);
        const {name, value } = e.target;
        setData(name, value);
    }
    console.log('status',data.status)

    const handleSelectStatus = (option) => {
        console.log(option)
        setData(status, option);
    }

    return (
        <>
            <div className="w-1/2 mx-auto border min-h-48 rounded-md">
                <form>
                    <h5>{data.title} | {data.status}</h5>
                    <label className="input input-bordered bg-transparent flex items-center gap-2">
                        <FaTasks />
                        <input
                            type="text"
                            name="title"
                            className="grow"
                            placeholder="Enter Your Task"
                            onChange={handleChange}
                            value={data?.title}
                        />
                    </label>
                    <Select
                        className="w-full"
                        name="status"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={options}
                        isMulti
                        onChange={handleSelectStatus}
                        // value={data.status}
                    />
                    
                </form>

            </div>
        </>
    )
}
