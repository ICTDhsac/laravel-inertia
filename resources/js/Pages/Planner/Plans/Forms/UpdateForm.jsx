import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useReducer } from 'react';
import Select from 'react-select';
import { customOption, customStyle } from '../react-select-custom/custom';
import { CalendarPlus2, FilePenLine } from 'lucide-react';
import { Button, TextInput, ToggleSwitch } from 'flowbite-react';

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
export default function UpdateForm() {
    
    const {userOptions, departmentOptions, plan } = usePage().props;
    
    const filteredDepartments = useMemo(() => {
        const planDepartmentIds = plan.departments.map(dep => dep.id); // Extract IDs from plan.departments

        return departmentOptions.filter(department => 
            planDepartmentIds.includes(department.value) // Check if department is part of the plan
        );
    }, [plan.departments, departmentOptions]);

    const filteredUsers = useMemo(() => {
        const planUserIds = plan.users.map(dep => dep.id); // Extract IDs from plan.departments

        return userOptions.filter(user => 
            planUserIds.includes(user.value) // Check if department is part of the plan
        );
    }, [plan.users, userOptions]);

    console.log('filteredDepartments', filteredDepartments);
    console.log('filteredUsers', filteredUsers);
    console.log('privacy', plan.privacy);

    const [selectedState, dispatchSelectedState] = useReducer(updateSelectOptions, {
        department_ids: filteredDepartments,
        user_ids: filteredUsers,
        privacy: privacyOptions.find(option => option.value === plan.privacy)
    });
    const { data, setData, post, errors, reset, clearErrors, processing } = useForm(plan);

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
        post('/plans',{
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                console.log("Plan created successfully");
                reset();
                clearErrors();

                dispatchSelectedState({ type: "RESET" });
            },
            onError: () => {
                console.log("Plan creation error");
            }
        });
    }
    
    useEffect(()=> {
        console.log("data", data);
        console.log("selectedState", selectedState);
    }, [data]);


  return (
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
                    onChange={(selectedValue) => handleSelectedOptions('department_ids', selectedValue)}
                    value={selectedState.department_ids || []}
                    isMulti
                />
                <div className='error'>
                    {errors.department_ids && <span>{errors.department_ids}</span>}
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
                    onChange={(selectedValue) => handleSelectedOptions('user_ids', selectedValue)}
                    value={selectedState.user_ids || []}
                    isMulti
                />
                <div className='error'>
                    {errors.user_ids && <span>{errors.user_ids}</span>}
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
  )
}
