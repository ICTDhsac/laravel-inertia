import { useForm} from "@inertiajs/react";
import { useState } from "react";
// import { FaGear } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { TbTableColumn } from "react-icons/tb";

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
        status: null
    });

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (e) => {
        
        const {name, value } = e.target;
        console.log(name)
        setData(name, value);
    }
    console.log('data', data)

    const handleSelectOption = (selected) => {
        setSelectedOption(selected);
        setData('status', selected.value);
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
                    <label className="input input-bordered bg-transparent flex items-center gap-2">
                        <TbTableColumn />
                        <Select
                            name="status"
                            className="w-full"
                            placeholder="Status"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            options={options}
                            // isMulti
                            onChange={handleSelectOption}
                            value={selectedOption}
                        />
                    </label>

                    <div className="flex justify-end mt-3 px-5">
                        <button className="btn btn-sm btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <div className="divider">TO DO LIST</div>
        </>
    )
}
