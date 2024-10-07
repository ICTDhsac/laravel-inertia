import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/login', {
            email,
            password,
        }, {
            onError: (err) => {
                setErrors(err);
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
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
