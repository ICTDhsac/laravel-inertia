import React, { useEffect, useReducer, useState, forwardRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label, Select as FlowbiteSelect, Datepicker, Button } from 'flowbite-react';
import moment from 'moment'; //datetime plgin
import { ToastContainer, toast } from "react-toastify";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import FileUploadComponent from './FileUploadComponent';
import { UserPlus } from 'lucide-react';
const animatedComponents = makeAnimated();

/* reducer function */
const updateSelectOptions = (state, action) => {
    const {type, selected} = action;

    switch(type){
        case 'position_id':
            return {...state, position: selected};
        case 'department_id':
            return {...state, department: selected};
        case 'employment_status_id':
            return {...state, employment_status: selected};
        case 'schedule_id':
            return {...state, schedule: selected};
        case 'role_id':
            return {...state, role: selected};
        default:
            return state
    }
}

const CustomOption = forwardRef(({ isFocused, label, innerProps }, ref) => {
    return (
        <h1
            style={{ backgroundColor: isFocused ? "#e2e8f0" : "inherit" }}
            {...innerProps}
            ref={ref}
        >
            {label}
        </h1>
    );
});

const notify = (res) => {
    const { error, message } = res;
    if(error){
        toast.error(message);
    }else{
        toast.success(message);
    }
}

export default function Register({ positions, departments, employment_status , schedules, roles, flash }) {
    const { data, setData, post, errors, reset, clearErrors, processing } = useForm({
        employee_id: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        suffix: '',
        contact: '',
        email: '',
        gender: '',
        date_hired: moment().format('YYYY-MM-DD'),
        position_id: '',
        department_id: '',
        employment_status_id: '',
        schedule_id: '',
        user_photo: [],
        role_id: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const [selectedState, dispatchSelectedState] = useReducer(updateSelectOptions, {});
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setData('user_photo', files[0]);
    }, [files]);

    useEffect(() => {
        if (flash.response) {
            notify(flash.response);
        }
    }, [flash]);

    /* for debugging only */
    useEffect(() => {
        console.log("useForm data",data)
    }, [data]);

    const handleSelectedOptions = (type, selected) => {
        setData(type, Number(selected.value));
        dispatchSelectedState({
            type: type,
            selected: selected
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register',{
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                console.log("Registration successful");
                console.log(res)
                reset();
                clearErrors();
                
            },
            onError: () => {
                console.log("Registration error");
            }
        });  // Post to the registration route
    };

    return (

        <div className="flex justify-center items-center pt-20 bg-white dark:bg-gray-600">
            <div className="w-full max-w-6xl border shadow-md rounded p-5 bg-gray-200 dark:bg-slate-700">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                <div className='flex flex-wrap'>
                    <div className='flex-none w-full md:w-1/4 p-5'>
                        <FileUploadComponent files={files} setFiles={setFiles} notify={notify}/>
                        <div className='error'>
                            {errors.user_photo && <span>{errors.user_photo}</span>}
                        </div>
                    </div>

                    <div className='flex-1 w-full space-y-3 p-5'>

                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <span className="divider divider-start text-lg underline pb-5">Employee Information</span>
                            <div>
                                <div>
                                    <Label>Employee ID: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.employee_id && <span>{errors.employee_id}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>First Name: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.first_name && <span>{errors.first_name}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label>Last Name: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="text"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.last_name && <span>{errors.last_name}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Middle Name: </Label>
                                    <Input
                                        type="text"
                                        value={data.middle_name}
                                        onChange={(e) => setData('middle_name', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.middle_name && <span>{errors.middle_name}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Suffix:</Label>
                                    <Input
                                        type="text"
                                        value={data.suffix}
                                        onChange={(e) => setData('suffix', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.suffix && <span>{errors.suffix}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label>Email: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.email && <span>{errors.email}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label>Contact #:</Label>
                                    <Input
                                        type="text"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        placeholder="+639XXXXXXXXX or 09XXXXXXXXX"
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.contact && <span>{errors.contact}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Position:</Label>

                                    <Select
                                        className="w-full select-container"
                                        classNamePrefix="select"
                                        placeholder="Position * (required)"
                                        closeMenuOnSelect={true}
                                        components={{ Option: CustomOption }}
                                        options={positions}
                                        onChange={(selectedValue) => handleSelectedOptions('position_id', selectedValue)}
                                        value={selectedState.position_id}
                                        isSearchable={true}
                                    />
                                    <div className='error'>
                                        {errors.position_id && <span>{errors.position_id}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Department:</Label>

                                    <Select
                                        className="w-full select-container"
                                        classNamePrefix="select"
                                        placeholder="Department * (required)"
                                        closeMenuOnSelect={true}
                                        components={{ Option: CustomOption }}
                                        options={departments}
                                        onChange={(selectedValue) => handleSelectedOptions('department_id', selectedValue)}
                                        value={selectedState.department_id_id}
                                    />
                                    <div className='error'>
                                        {errors.department_id && <span>{errors.department_id}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Employment Status:</Label>

                                    <Select
                                        className="w-full select-container"
                                        classNamePrefix="select"
                                        placeholder="Employment status * (required)"
                                        closeMenuOnSelect={true}
                                        components={{ Option: CustomOption }}
                                        options={employment_status}
                                        onChange={(selectedValue) => handleSelectedOptions('employment_status_id', selectedValue)}
                                        value={selectedState.employment_status_id}
                                    />
                                    <div className='error'>
                                        {errors.employment_status_id && <span>{errors.employment_status_id}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Schedule:</Label>

                                    <Select
                                        className="w-full select-container"
                                        classNamePrefix="select"
                                        placeholder="Schedule * (required)"
                                        closeMenuOnSelect={true}
                                        components={{ Option: CustomOption }}
                                        options={schedules}
                                        onChange={(selectedValue) => handleSelectedOptions('schedule_id', selectedValue)}
                                        value={selectedState.schedule_id}
                                    />
                                    <div className='error'>
                                        {errors.schedule_id && <span>{errors.schedule_id}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Gender:</Label>
                                    <FlowbiteSelect
                                        onChange={(e) => setData('gender', e.target.value)}
                                    >
                                        <option value="" selected disabled>Select Gender ..</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </FlowbiteSelect>
                                    <div className='error'>
                                        {errors.gender && <span>{errors.gender}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label>Date Hired:</Label>
                                    <Datepicker
                                        value={data.date_hired}
                                        onSelectedDateChanged={(date) => setData('date_hired', moment(date).format('YYYY-MM-DD'))}
                                    />
                                    <div className='error'>
                                        {errors.date_hired && <span>{errors.date_hired}</span>}
                                    </div>
                                </div>
                            </div>

                            <span className="divider divider-start text-lg underline pt-8 pb-5">System Credentials</span>

                            <div>
                                <div>
                                    <Label>Username: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.username && <span>{errors.username}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Role:</Label>

                                    <Select
                                        className="w-full select-container"
                                        classNamePrefix="select"
                                        placeholder="Role * (required)"
                                        closeMenuOnSelect={true}
                                        components={{ Option: CustomOption }}
                                        options={roles}
                                        onChange={(selectedValue) => handleSelectedOptions('role_id', selectedValue)}
                                        value={selectedState.role_id}
                                    />
                                    <div className='error'>
                                        {errors.role_id && <span>{errors.role_id}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Password: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                    <div className='error'>
                                        {errors.password && <span>{errors.password}</span>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Confirm Password: <span className='text-red-500'>*</span></Label>
                                    <Input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="bg-white dark:bg-gray-700"
                                    />
                                </div>
                            </div>
                            
                            <div className='pt-5 flex justify-end'>
                                <Button type="submit" disabled={processing} gradientDuoTone="greenToBlue" outline pill size="lg">
                                    <div className="flex-item-center">
                                        {processing ? 
                                            <span className="loading loading-spinner loading-xs"></span> : <UserPlus className='h-4 w-4' />
                                        }
                                        <span>Register</span>
                                    </div>
                                </Button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
}

