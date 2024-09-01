import { IoIosCreate } from "react-icons/io";
import Pagination from "../../Layouts/Pagination";
// import { Link } from '@inertiajs/react';
import { useState } from "react";
import Create from "./Create";

export default function Home({ posts }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return <>

        <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Posts</h1>
            <button className="btn btn-primary" onClick={openModal}><IoIosCreate /> Create New</button>
        </div>

        <div>

            {posts.data.map(post => (

                <div className="p-4 border-b" key={post.id}>
                    <div className="text-sm text-slate-600">
                        <span>Posted on: </span>
                        <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium">{post.body}</p>
                </div>

            ))}
        </div>
        
        <Pagination links={posts.links} />

        <Create isOpen={isModalOpen} onClose={closeModal} />


    </>
}