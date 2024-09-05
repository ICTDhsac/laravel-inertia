import { IoIosCreate } from "react-icons/io";
import Pagination from "../../Layouts/Pagination";
import { Head, useForm, router,  usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect } from "react";
import Create from "./Create";
import Show from "./Show";

// import FileUploadComponent from "../../Helper/FileUploadComponent";
import Modal from "../../Helper/Modal";

export default function Home({ posts }) {

    const [isCreate, setIsCreate] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [post, setPost] = useState(null);
    const [loadingStates, setLoadingStates] = useState({});
    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg ] = useState(flash.message);
    const { delete: destroy } = useForm();
    
    useEffect(() => {
        if (flash.message) {
            setFlashMsg(flash.message);
            setTimeout(() => {
                setFlashMsg(null);
            },2000);
        }
    }, [flash]);

    const handleShowPost = (e) => {
        const data_obj = JSON.parse(atob(e.currentTarget.dataset.object));

        setIsShow(true);
        setPost(data_obj);
        
        // router.get(`/posts/${postId}`, {}, {
        //     onSuccess: (page) => {
        //         console.log(page);
        //         setPost(page.props.post);
        //         setIsShow(true);
        //     },
        //     onFinish: () => setLoadingStates(prevState => ({ ...prevState, [postId]: false })),
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
            { flashMsg && 
                <div className="toast toast-end">
                    <div className="alert alert-success">
                        <span>{flashMsg}</span>
                    </div>
                </div>
            }
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
        <Modal isOpen={isShow} onClose={() => setIsShow(false)} title={new Date(post?.created_at).toLocaleTimeString()} >
            {post ? <Show post={post} /> : <span className="loading loading-spinner loading-md">Loading...</span> }
        </Modal>

    </>
}