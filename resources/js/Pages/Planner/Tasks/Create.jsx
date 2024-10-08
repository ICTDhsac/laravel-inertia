import '../../../../css/tasks.css';
import { useForm} from "@inertiajs/react";
import { useEffect, useState } from "react";

/*** icons ***/
import { IoIosAddCircle } from "react-icons/io";
import { FaTasks, FaTags } from "react-icons/fa";
import { TbTableColumn } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import * as MdIcons from 'react-icons/md';

import { Avatar, Button, Modal, Textarea, Label, TextInput } from "flowbite-react";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();



const renderIcon = (iconName) => {
    const IconComponent = MdIcons[iconName];
    return IconComponent ? <IconComponent /> : null;
};

const planCollaborators = [
    { value: 'john', label: 'John Doe', avatarUrl: null },
    { value: 'jane', label: 'Jane Smith', avatarUrl: 'https://i.pravatar.cc/300?img=2' },
    { value: 'mike', label: 'Mike Ross', avatarUrl: 'https://i.pravatar.cc/300?img=3' },
    { value: 'rachel', label: 'Rachel Zane', avatarUrl: 'https://i.pravatar.cc/300?img=4' }
];

const planLabels = [
    { value: 'preventive-maintenance', label: 'Preventive Maintenance', icon: "MdBuild", color: '#D0E7F8' },
    { value: 'corrective-hardware', label: 'Corrective Hardware', icon: "MdError", color: '#DBEBC7' },
    { value: 'support-on-operation-hardware', label: 'Support on Operation - Hardware', icon: "MdInfoOutline", color: 'yellow' },
    { value: 'support-on-operation-software', label: 'Support on Operation - Software', icon: "MdInfoOutline", color: 'violet' },
    { value: 'production', label: 'Production', icon: "MdProductionQuantityLimits", color: 'lightgray' },
    { value: 'inventory', label: 'Inventory', icon: "MdInfoOutline", color: 'pink' },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
    }),
    multiValue: (provided, { data }) => ({
        ...provided,
        backgroundColor: data.color, // Use color from planLabels for selected items
        color: 'white',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#000',
        
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'white',
        ':hover': {
            backgroundColor: '#ff6347',
            color: 'white',
        },
    }),
    option: (provided, { data }) => ({
        ...provided,
        backgroundColor: data?.color,
        ':hover': {
            outline: '1px solid gray',
            color: 'blue',
        },
    }),
};

const collaboratorsStyles = {
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#E0E7FF", // Example color
        borderRadius: "50px",
        padding: "5px",
        display: "flex",
        alignItems: "center",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        display: "flex",
        alignItems: "center",
        color: "#000",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: "#ff6347",
        ':hover': {
            backgroundColor: "#ff6347",
            color: "#fff",
        },
    }),
};


const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("").toUpperCase();
    return initials;
};


export default function Create({isOpen, onClose, statuses, members }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
        collaborators: [],
        labels: [],
        status: null
    });

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [collaborators, setCollaborators] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {        
        setData(prevData => ({
            ...prevData,
            collaborators: collaborators?.map(option => option.value) || prevData.collaborators,
            labels: labels?.map(option => option.value) || prevData.labels,
            status: selectedStatus?.value || prevData.status
        }));
    }, [selectedStatus, collaborators, labels]);

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleChange = (e) => {
        const {name, value } = e.target;
        setData(name, value);
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
                setSelectedStatus(null);
            },
            onError: () => {
                console.log("Task creation error");
            }
        })
    }

    
    return (
        <>
            <Modal dismissible show={isOpen} onClose={onClose} size="4xl">
                <Modal.Header>Create a Task</Modal.Header>
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
                                        placeholder="Enter Your Task Title * (required)"
                                        onChange={handleChange}
                                        value={data?.title}
                                    />
                                </Label>
                                { errors.title && <p className="text-error flex items-center pl-10">{renderIcon('MdError')} {errors.title}</p> }
                            </div>
                            <div>
                                <label className="input bg-transparent flex items-center gap-2 dark:text-neutral-100">
                                    <FaUsers />
                                    <Select
                                        name="collaborators"
                                        className='w-full'
                                        placeholder="Assign to * (required)"
                                        closeMenuOnSelect={true}
                                        options={planCollaborators}
                                        isMulti
                                        getOptionLabel={(option) => (
                                            <div className="flex items-center space-x-1">
                                                <Avatar
                                                    img={option.avatarUrl || undefined}
                                                    rounded={true}
                                                    size="xs"
                                                    placeholderInitials={getInitials(option.label)}
                                                />
                                                <span className="ml-2">{option.label}</span>
                                            </div>
                                        )}
                                        onChange={(selected) => setCollaborators(selected)}
                                        value={collaborators}
                                        styles={collaboratorsStyles}
                                        // components={{ MultiValueLabel: customMultiValueLabel }}
                                    />
                                </label>
                                { errors.status && <p className="text-error flex items-center pl-10">{renderIcon('MdError')} {errors.collaborators}</p> }
                            </div>
                            
                            <div>
                                <label className="input bg-transparent flex items-center gap-2 dark:text-neutral-100">
                                    <FaTags />
                                    <Select
                                        name="labels"
                                        className='w-full'
                                        placeholder="Label your task * (required)"
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        options={planLabels}
                                        getOptionLabel={(option) => (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {renderIcon(option.icon)} &nbsp; {option.label}
                                            </div>
                                        )}
                                        isMulti
                                        onChange={(selected) => setLabels(selected)}
                                        value={labels}
                                        styles={customStyles}
                                    />
                                </label>
                                { errors.status && <p className="text-error flex items-center pl-10">{renderIcon('MdError')} {errors.labels}</p> }
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
                                        onChange={(selected) => setSelectedStatus(selected)}
                                        value={selectedStatus}
                                    />
                                </label>
                                { errors.status && <p className="text-error flex items-center pl-10">{renderIcon('MdError')} {errors.status}</p> }
                            </div>

                            <div>
                                <Label>Description</Label>
                                <textarea onChange={handleChange} name="body" className='w-full' value={data?.body} placeholder="Write task description..." rows={4} />
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
