import { router, useForm, usePage } from '@inertiajs/react';
import { Table } from 'flowbite-react';
import React, { useEffect, useMemo, useReducer, useState } from 'react';

import Select from 'react-select';
import { customOption, customStyle } from './react-select-custom/custom';
import { ArrowBigLeftDash, FilePenLine } from 'lucide-react';
import { Button, TextInput, ToggleSwitch } from 'flowbite-react';

import { ToastContainer } from "react-toastify";
import Notify from '@/Helper/functions/notify';

const privacyOptions = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
];

const updateSelectOptions = (state, action) => {
    const {type, selected} = action;
    switch (action.type) {
        case "RESET":
            return {}; // Reset to the initial empty state
        default:
            return { ...state, [type]: selected };
    }
}

export default function Edit() {

    const {userOptions, departmentOptions, plan, flash, referrer } = usePage().props;

    useEffect(() => {
        if (flash.response) {
            Notify(flash.response);
        }
    }, [flash]);

    const filteredDepartments = useMemo(() => {
        const planDepartmentIds = plan.departments.map(dep => dep.id); // Extract IDs from plan.departments

        return departmentOptions.filter(department => 
            planDepartmentIds.includes(department.value) // Check if department is part of the plan
        );
    }, [plan.departments, departmentOptions]);

    const filteredUsers = useMemo(() => {
        const planUserIds = plan.users.map(user => user.id); // Extract IDs from plan.departments

        return userOptions.filter(user => 
            planUserIds.includes(user.value) // Check if department is part of the plan
        );
    }, [plan.users, userOptions]);

    const [selectedState, dispatchSelectedState] = useReducer(updateSelectOptions, {
        departments: filteredDepartments || [],
        users: filteredUsers || [],
        privacy: privacyOptions.find(option => option.value === plan.privacy) || null
    });

    const { data, setData, put, errors, reset, clearErrors, processing } = useForm({
        ...plan,
        departments: plan.departments.map(dep => dep.id),
        users: plan.users.map(user => user.id),
    });

    const handleSelectedOptions = (type, selected) => {
        
        const values = (Array.isArray(selected)) ? selected.map(arr => arr.value) : selected?.value;

        setData(type, values);

        dispatchSelectedState({
            type: type,
            selected: selected
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/plans/${plan.id}`,{
            preserveScroll: true,
            preserveState: true,
            only: ['flash'],
            onSuccess: () => {
                console.log("Plan updated successfully");
                // reset();
                clearErrors();

                // dispatchSelectedState({ type: "RESET" });
            },
            onError: () => {
                console.log("Plan update error");
            }
        });
    }


    const handleBack = () => {
        if (referrer) {
            router.get(referrer); // Go to index
        } else {
            window.history.back(); // Default fallback
        }
    };


    return (
        <div className='p-6 bg-gray-50 dark:bg-gray-900'>
            <div className="mb-5">
                <Button
                    onClick={handleBack}
                    type="submit" gradientDuoTone="purpleToBlue" outline pill size="lg"
                >
                    <div className="flex-item-center">
                        <ArrowBigLeftDash className='h-4 w-4' />
                        <span>Back</span>
                    </div>
                </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-5">


                {/* Plan Details Section */}
                <ToastContainer />
                <div className="flex-1 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">


                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-slate-100 dark:bg-gray-700 p-5">
                        <div className="mb-2 block">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    Plan Details
                                </h2>
                                <ToggleSwitch checked={data.is_group_plan} label='Group Plan' onChange={() => setData('is_group_plan', !data.is_group_plan )} />
                            </div>
                        </div>
                        <div>
                            <TextInput
                                id="name"
                                type="name"
                                placeholder="Enter plan title"
                                onChange={(e) => setData('name', e.target.value)}
                                value={data.name || ''}
                            />
                            <div className="error">
                                {errors.name && <span>{errors.name}</span>}
                            </div>
                        </div>
                        {data?.is_group_plan == true ?
                            <div key="select_department_container">
                                <Select
                                    className="w-full select-container"
                                    classNamePrefix="select"
                                    placeholder="Group/Division"
                                    styles={customStyle}
                                    closeMenuOnSelect={true}
                                    components={{ Option: customOption }}
                                    options= {departmentOptions}
                                    onChange={(selectedValue) => handleSelectedOptions('departments', selectedValue)}
                                    value={selectedState.departments || []}
                                    isMulti
                                />
                                <div className='error'>
                                    {errors.departments && <span>{errors.departments}</span>}
                                </div>
                            </div>
                        :
                            <div key="select_user_container">
                                <Select
                                    className="w-full select-container"
                                    classNamePrefix="select"
                                    placeholder="Select user(s)"
                                    styles={customStyle}
                                    closeMenuOnSelect={true}
                                    components={{ Option: customOption }}
                                    options= {userOptions}
                                    onChange={(selectedValue) => handleSelectedOptions('users', selectedValue)}
                                    value={selectedState.users || []}
                                    isMulti
                                />
                                <div className='error'>
                                    {errors.users && <span>{errors.users}</span>}
                                </div>
                            </div>
                        }

                        <div>
                            <Select
                                className="w-full select-container"
                                classNamePrefix="select"
                                placeholder="Privacy"
                                styles={customStyle}
                                closeMenuOnSelect={true}
                                components={{ Option: customOption }}
                                options= {privacyOptions}
                                onChange={(selectedValue) => handleSelectedOptions('privacy', selectedValue)}
                                value={selectedState.privacy || ''}
                            />
                            <div className='error'>
                                {errors.privacy && <span>{errors.privacy}</span>}
                            </div>
                        </div>


                        <Button type="submit" disabled={processing} gradientDuoTone="greenToBlue" outline pill size="lg">
                            <div className="flex-item-center">
                                {processing ? 
                                    <span className="loading loading-spinner loading-xs"></span> : <FilePenLine className='h-4 w-4' />
                                }
                                <span>Update</span>
                            </div>
                        </Button>
                    </form>

                </div>

                {/* Departments Table Section */}
                <div className="flex-1 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">

                    <Table className="min-w-full text-left">
                        <Table.Head>
                            <Table.HeadCell className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                { data.is_group_plan ? 'Departments' : 'Users' }
                            </Table.HeadCell>
                        </Table.Head>
                        { data.is_group_plan ?
                            <Table.Body className="divide-y">
                                {selectedState.departments.length > 0 ?
                                    selectedState.departments.map((department, index) => (
                                        <Table.Row 
                                            key={index} 
                                            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {department.label}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                :
                                    <Table.Row  
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            No Selected Department
                                        </Table.Cell>
                                    </Table.Row>
                            
                                }
                            </Table.Body>
                        :
                            <Table.Body className="divide-y">
                                {selectedState?.users.length > 0 ?
                                    selectedState.users.map((user, index) => (
                                        <Table.Row 
                                            key={index} 
                                            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {user.label}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                :
                                    <Table.Row  
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            No Selected User
                                        </Table.Cell>
                                    </Table.Row>
                                }
                            </Table.Body>
                        }
                    </Table>
                </div>
            </div>
        </div>
    );
}
