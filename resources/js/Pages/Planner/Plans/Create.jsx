import { useForm, usePage } from '@inertiajs/react';
import { Button, Carousel, Label, TextInput } from 'flowbite-react';
import Select from 'react-select';
import { CalendarPlus2 } from 'lucide-react';
import React, { forwardRef, useReducer } from 'react';

const customOption = forwardRef(({ isFocused, label, innerProps }, ref) => {
    return (
        <h1
            style={{
                backgroundColor: isFocused ? "#e2e8f0" : "inherit",
                padding: "5px",
                fontSize: "13px"
            }}
            {...innerProps}
            ref={ref}
        >
            {label}
        </h1>
    );
});

const customStyle = {
    placeholder: (provided) => ({
        ...provided,
        color: 'gray',
        fontSize: '14px', 
        opacity: 0.8, 
    })
}

const updateSelectOptions = (state, action) => {
    const {type, selected} = action;

    switch(type){
        case 'department_id':
            return {...state, department: selected};
        case 'privacy':
            return {...state, privacy: selected};
        default:
            return state
    }
}

export default function Create()
{
    const {departments, assetUrl} = usePage().props;
    const [selectedState, dispatchSelectedState] = useReducer(updateSelectOptions, {});
    const { data, setData, post, errors, reset, clearErrors, processing } = useForm({
        name: '',
        department_id: '',
        privacy: '',
    });

    const handleSelectedOptions = (type, selected) => {
        setData(type, selected.value);
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
            },
            onError: () => {
                console.log("Plan creation error");
            }
        });
    }

    console.log(data);

    return (
        <div className="flex flex-wrap p-5 gap-5 items-center">

            <div className="flex-none w-full lg:w-1/2 max-w-xl">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-slate-100 dark:bg-gray-700 p-5">
                    <div className="mb-2 block">
                        <Label value="Name Your Plan" />
                    </div>
                    <div>
                        <TextInput
                            id="name"
                            type="name"
                            placeholder="Enter plan title"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <div className="error">
                            {errors.name && <span>{errors.name}</span>}
                        </div>
                    </div>
                    <div>
                        <Select
                            className="w-full select-container"
                            classNamePrefix="select"
                            placeholder="Group/Division"
                            styles={customStyle}
                            closeMenuOnSelect={true}
                            components={{ Option: customOption }}
                            options= {departments}
                            onChange={(selectedValue) => handleSelectedOptions('department_id', selectedValue)}
                            value={selectedState.position_id}
                        />
                        <div className='error'>
                            {errors.department_id && <span>{errors.department_id}</span>}
                        </div>
                    </div>

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
                            value={selectedState.privacy}
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
            </div>

            <div className="flex-1 h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img src={`${assetUrl}/assets/create_planner_1.jpg`} alt="..." />
                    <img src={`${assetUrl}/assets/create_planner_2.jpg`} alt="..." />
                </Carousel>
            </div>
        </div>
    )
}
