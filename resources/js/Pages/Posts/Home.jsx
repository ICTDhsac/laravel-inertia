import Pagination from "../../Layouts/Pagination";
import { Head, useForm, router,  usePage, Link } from '@inertiajs/react';
// import axios from 'axios';
import { useState, useEffect } from "react";
import Create from "./Create";
import Show from "./Show";

import { IoIosCreate } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import FileUploadComponent from "../../Helper/FileUploadComponent";
import Modal from "../../Helper/Modal";

const Msg = ({ closeToast, toastProps }) => (
    <div>
        Lorem ipsum dolor {toastProps.position}
        <div className="mt-2 flex justify-end gap-1">
            <button className="btn btn-xs btn-warning">Retry</button>
            <button className="btn btn-xs btn-error" onClick={closeToast}>Close</button>
        </div>
    </div>
);

export default function Home({ posts, flash }) {

    const [isCreate, setIsCreate] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [post, setPost] = useState(null);
    const [loadingStates, setLoadingStates] = useState({});
    const { delete: destroy } = useForm();

    const notify = (res) => {
        const { error, message } = res;
        if(error){
            toast.error(message);
        }else{
            toast.success(message);
        }
    }
    
    useEffect(() => {
        if (flash.response) {
            notify(flash.response);
        }
    }, [flash]);

    console.log(flash)

    const handleShowPost = (e) => {
        // const postId = e.currentTarget.dataset.id;
        const data_obj = JSON.parse(atob(e.currentTarget.dataset.object));
        const toastId = toast.loading("Please wait...", { position: "bottom-right", className: 'foo-bar' } );
        setIsShow(true);
        setTimeout(() => {
            toast.update(toastId, { render: "All is good", type: "success", isLoading: false, autoClose: 3000 });
            setPost(data_obj);
        },5000);
        
        // router.post(`/posts/${postId}/fetch`, {}, {
        //     onSuccess: (page) => {
        //         setIsShow(true);
        //         setPost(page.props.post);
        //     },
        //     onFinish: () => {
        //         setLoadingStates(prevState => ({ ...prevState, [postId]: false }));
        //         toast.update(toastId, { render: "All is good", type: "success", isLoading: false, autoClose: 3000 });
        //     },
        //     preserveState: true, // prevents full page reload
        //     preserveScroll: true, // prevents full page reload
        //     only: ['post']  // fetch only the 'post' data, avoiding unnecessary rerenders

        // });
    }

    const deletePost = (e) => {
        e.preventDefault();
        const url = e.currentTarget.action;
        destroy(url);
    }


    return <>

        {/* <FileUploadComponent /> */}
        <Head title="Home" />
        <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Posts</h1>
            <button className="btn btn-primary" onClick={() => setIsCreate(true)} draggable><IoIosCreate /> Create New</button>
        </div>

        <div>
            <ToastContainer />
            
            {posts.data.map(post => (

                <div className="p-4 border-b" key={post.id}>
                    <div className="text-sm text-slate-600">
                        <span>Posted on: </span>
                        <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium">{post.body}</p>
                    <div className="flex justify-between">
                        <button 
                            className="btn btn-ghost btn-xs text-italic text-primary"
                            onClick={handleShowPost}
                            disabled={loadingStates[post.id]}
                            data-id={post.id}
                            data-object={btoa(JSON.stringify(post))}
                        >
                            <span className={`loading loading-spinner loading-xs ${loadingStates[post.id] ? 'inline-block' : 'hidden'}`}></span>See more ...
                        </button>
                        <div className="flex items-center justify-end gap-2">
                            <form onSubmit={deletePost} action={`/posts/${post.id}`}>
                                <button className="btn btn-error btn-xs text-white">Delete</button>
                            </form>
                        </div>
                    </div>
                    
                </div>

            ))}

        </div>
        
        <Pagination links={posts.links} />

        <Modal isOpen={isCreate} onClose={() => setIsCreate(false)} title="Create Post" >
            <Create isOpen={isCreate} onClose={() => setIsCreate(false)} />
        </Modal>
        <Modal isOpen={isShow} onClose={() => {setIsShow(false); setPost(null)}} title={post ? new Date(post?.created_at).toLocaleTimeString() : 'Loading' } >
            {post ? <Show post={post} /> : <span className="loading loading-spinner loading-md">Loading...</span> }
        </Modal>

    </>
}