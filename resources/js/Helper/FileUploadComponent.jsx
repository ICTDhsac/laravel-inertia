
import { useCallback, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfThumbnailComponent from './PdfThumbnailComponent';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function FileUploadComponent({notify}) {
    const [files, setFiles] = useState([]);
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    
    const handleDrop = useCallback(
        (acceptedFiles) => {
            const { allowedFiles, notAllowedFiles } = acceptedFiles.reduce((acc, file) => {
                if (allowedTypes.includes(file.type)) {
                    acc.allowedFiles.push(file);
                } else {
                    acc.notAllowedFiles.push(file);
                }
                return acc;
            }, { allowedFiles: [], notAllowedFiles: [] });//initial value

            if (notAllowedFiles.length > 0) {
                notify({
                    error: true,
                    Message: (
                                <div>
                                    <h5>Invalid file format:</h5>
                                    <span className='text-red-700'>{notAllowedFiles.map(file => file.name).join(' | ')}</span>.
                                    <small className='italic block'>Only image files (.jpg, .png) are accepted.</small>
                                </div>
                            )
                });
            }

            setFiles((prevFiles) => {
                const duplicates = allowedFiles.filter((file) =>
                    prevFiles.some((existingFile) => existingFile.name === file.name)
                );

                if (duplicates.length > 0) {
                    alert(`The file(s) "${duplicates.map(file => file.name).join(', ')}" has already been uploaded.`);
                }

                const newFiles = allowedFiles.filter(
                    (file) => !prevFiles.some((existingFile) => existingFile.name === file.name)
                );

                return [...prevFiles, ...newFiles];
            });
        },[]);

    const removeFile = (file) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };

    const thumbs = files.map((file) => {
        const isPdf = file.type === 'application/pdf';
        console.log(file);
        return (
            <div key={file.name} className="flex-none flex flex-col justify-between p-2 border rounded text-center w-1/4 sm:w-1/2 md:w-56">
                {isPdf ? (
                    // <embed src={URL.createObjectURL(file)} type={file.type} />
                    <PdfThumbnailComponent fileUrl={URL.createObjectURL(file)} fileName={file.name} />
                ) : (
                    <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-80 w-auto"
                        onLoad={() => URL.revokeObjectURL(file)}
                    />
                )}
                <button className='btn btn-sm btn-error w-full mt-2' onClick={() => removeFile(file)}>Remove</button>
            </div>
        );
    });

    const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*,application/pdf',
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ])

    return (
        <div className="file-upload">
            <div
                {...getRootProps({style})}
                className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="flex gap-1 flex-nowrap w-9/12 overflow-x-auto p-3 shadow-xl">{thumbs}</aside>
        </div>
    );

};



