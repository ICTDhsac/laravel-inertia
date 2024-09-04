import { useForm } from "@inertiajs/react";
import Alert from "../../Layouts/Alert";
import { useEffect } from "react";
// import FileUpload from "../../Helper/FileUpload";

export default function Create({isOpen, onClose}) {

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        body: '',
        files: []
    })

    // console.log(useForm());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // const handleDrop = (acceptedFiles) => {
    //     setData('files', [...data.files, ...acceptedFiles]);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");

        const formData = new FormData();
        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        post("/posts", {
            preserveScroll: true,
            data: formData,
            onSuccess: (response) => {
                console.log("Post created successfully:", response.props);
                reset();
                onClose();
            },
            onError: (err) => {
                console.log("Form submission errors:", err);
                
            }
        });
    }

    useEffect(() => {
        if (!isOpen) {
            clearErrors();
            reset();
        }
    }, [isOpen]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    { errors.body && <Alert message={errors.body}/> }
                    <textarea
                        className={`w-full p-2 border border-gray-300 rounded ${errors.body && '!ring-red-500'}`}
                        rows="10"
                        name="body"
                        value={data.body}
                        onChange={handleChange}
                    ></textarea>

                    {/* <FileUpload onDrop={handleDrop} />
                    {errors.files &&
                        <Alert message={errors.files}/>
                    } */}
                </div>
                {/* Divider */}
                <div className="modal-action pt-2 border-t-2 border-neutral">
                    <button type="submit" disabled={processing} className="btn btn-success"><span className={`loading loading-spinner loading-xs ${processing ? 'inline-block' : 'hidden'}`}></span>Create</button>
                    <button type="button" onClick={onClose} className="btn">Cancel</button>
                </div>
            </form>
        </>
    );
};

