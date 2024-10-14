import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from '@inertiajs/react';
import { Key } from 'lucide-react';
import { Button } from 'flowbite-react';

const notify = (res) => {
    const { error, message } = res;
    if(error){
        toast.error(message);
    }else{
        toast.success(message);
    }
}

export default function Login({flash}) {

    const { data, setData, post, errors, processing } = useForm({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (flash.response) {
            notify(flash.response);
        }
    }, [flash]);


    const handleSubmit = (e) => {
        e.preventDefault();

        post('/login',{
            // preserveScroll: true,
            // preserveState: true,
            onSuccess: (res) => {
                console.log("Login successful");
                console.log(res)
                
            },
            onError: () => {
                console.log("Registration error");
            }
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-600">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            
                        />
                        {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    <div className='pt-5 flex justify-end'>
                        <Button type="submit" disabled={processing} gradientDuoTone="greenToBlue" outline pill size="lg">
                            <div className="flex-item-center">
                                {processing ? 
                                    <span className="loading loading-spinner loading-xs"></span> : <Key className='h-4 w-4' />
                                }
                                <span>Log In</span>
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
