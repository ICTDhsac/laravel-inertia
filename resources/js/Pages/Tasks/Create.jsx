import '../../../css/tasks.css';
import { useForm} from "@inertiajs/react";
import { useEffect, useState } from "react";

/*** icons ***/
import { IoIosAddCircle } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { TbTableColumn } from "react-icons/tb";
import { MdError } from "react-icons/md";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button, Modal, Textarea, Label, TextInput } from "flowbite-react";

const animatedComponents = makeAnimated();

export default function Create({isOpen, onClose, statuses }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
        status: null
    });

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if(!selectedOption) return;
        
        let selectedValue = selectedOption?.value;

        if(Array.isArray(selectedOption)){
            selectedValue = selectedOption.map((option) => option.value);
        }

        setData('status', selectedValue);
    }, [selectedOption]);

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleChange = (e) => {
        const {name, value } = e.target;
        setData(name, value);
    }


    const handleSelectOption = (selected) => {
        setSelectedOption(selected);
        // setData('status', selected.value);
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
            <Modal dismissible show={isOpen} onClose={onClose}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body className="space-y-6 text-base leading-relaxed text-gray-500 dark:text-gray-400 overflow-visible">
                
                    <div>
                        <form onSubmit={handleSubmitForm} className="space-y-2">
                            <div>
                                <Label className="input bg-transparent flex items-center gap-2">
                                    <FaTasks />
                                    <input
                                        type="text"
                                        name="title"
                                        className="w-full"
                                        placeholder="Enter Your Task"
                                        onChange={handleChange}
                                        value={data?.title}
                                    />
                                </Label>
                                { errors.title && <p className="text-error flex items-center pl-10"><MdError/> {errors.title}</p> }
                            </div>
                            <div>
                                <label className="input bg-transparent flex items-center gap-2 dark:text-neutral-100">
                                    <TbTableColumn />
                                    <Select
                                        name="status"
                                        className='w-full'
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
                            </div>
                            <div>
                                <Label>Description</Label>
                                <textarea id="description" name="description" placeholder="Write event description..." rows={4} />
                            </div>


                        </form>
                    </div>                
                </Modal.Body>
                <Modal.Footer className="flex justify-end p-2">
                
                    <Button color="gray" onClick={() => setOpenModal(false)} gradientDuoTone="purpleToBlue" outline pill>Back</Button>
                    <Button disabled={processing} gradientDuoTone="greenToBlue" outline pill>
                        {processing ? <span className="loading loading-spinner loading-xs"></span> : <IoIosAddCircle className="mr-2 h-5 w-5"/>}
                        Add Task
                    </Button>
                
                </Modal.Footer>

            </Modal>
        </>
    )
}
