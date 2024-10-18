import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useReducer } from 'react';
import Select from 'react-select';
import { customOption, customStyle } from '../react-select-custom/custom';
import { CalendarPlus2 } from 'lucide-react';
import { Button, Label, TextInput, ToggleSwitch } from 'flowbite-react';

const updateSelectOptions = (state, action) => {
    const {type, selected} = action;
    switch (action.type) {
        case "RESET":
            return {}; // Reset to the initial empty state
        default:
            return { ...state, [type]: selected };
    }
}
export default function CreateForm() {
    
    const {users, departments } = usePage().props;
    const [selectedState, dispatchSelectedState] = useReducer(updateSelectOptions, {});
    const { data, setData, post, errors, reset, clearErrors, processing } = useForm({
        name: '',
        department_ids: [],
        user_ids: [],
        privacy: '',
        is_group_plan: false
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
            <div className="flex justify-between">
                <Label value="Name Your Plan" />
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
                    options= {departments}
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
                    options= {users}
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
                options= {[
                        { value: 'public', label: 'Public' },
                        { value: 'private', label: 'Private' },
                ]}
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
                    <span className="loading loading-spinner loading-xs"></span> : <CalendarPlus2 className='h-4 w-4' />
                }
                <span>Create</span>
            </div>
        </Button>
    </form>
  )
}
