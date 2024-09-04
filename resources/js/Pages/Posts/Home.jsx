import { IoIosCreate } from "react-icons/io";
import Pagination from "../../Layouts/Pagination";
import { Head, router,  usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from "react";
import Create from "./Create";
import Show from "./Show";

// import FileUploadComponent from "../../Helper/FileUploadComponent";
import Modal from "../../Helper/Modal";

export default function Home({ posts }) {

    const [isCreate, setIsCreate] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [post, setPost] = useState(null);
    const [loadingStates, setLoadingStates] = useState({});

    const handleShowPost = (e) => {
        const postId = e.currentTarget.dataset.id;
        
        setLoadingStates(prevState => ({ ...prevState, [postId]: true }));

        axios.get(`/posts/${postId}`)
            .then(response => {
                setPost(response.data.post);
                setIsShow(true);
            })
            .catch(error => {
                console.error("There was an error fetching the post:", error);
            })
            .finally(() => {
                setLoadingStates(prevState => ({ ...prevState, [postId]: false }));
            });
    }

    return <>

        {/* <FileUploadComponent /> */}
        <Head title="Home" />
        <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Posts</h1>
            <button className="btn btn-primary" onClick={() => setIsCreate(true)}><IoIosCreate /> Create New</button>
        </div>

        <div>

            {posts.data.map(post => (

                <div className="p-4 border-b" key={post.id}>
                    <div className="text-sm text-slate-600">
                        <span>Posted on: </span>
                        <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium">{post.body}</p>
                    <button 
                        className="btn btn-ghost btn-xs text-italic text-primary"
                        onClick={handleShowPost}
                        disabled={loadingStates[post.id]}
                        data-id={post.id}
                    >
                        <span className={`loading loading-spinner loading-xs ${loadingStates[post.id] ? 'inline-block' : 'hidden'}`}></span>See more ...
                    </button>
                </div>

            ))}

        </div>
        
        <Pagination links={posts.links} />

        <Modal isOpen={isCreate} onClose={() => setIsCreate(false)} title="Create Post" >
            <Create isOpen={isCreate} onClose={() => setIsCreate(false)} />
        </Modal>
        <Modal isOpen={isShow} onClose={() => setIsShow(false)} title={new Date(post?.created_at).toLocaleTimeString()} >
            {post && <Show post={post} /> }
        </Modal>

    </>
}