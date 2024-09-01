// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// const FileUpload = () => {
//     const [files, setFiles] = useState([]);

//     const onDrop = useCallback((acceptedFiles) => {
//         // Update the file list when files are dropped
//         setFiles((prevFiles) => [
//             ...prevFiles,
//             ...acceptedFiles.map((file) => 
//                     Object.assign(file, {
//                     preview: URL.createObjectURL(file)
//                 })
//             )
//         ]);
//     }, []);

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop,
//         accept: 'image/*', // Customize this to accept specific file types
//         multiple: true,    // Enable multiple file uploads
//     });

//     const removeFile = (fileName) => {
//         setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
//     };

//     return (
//             <div>
//             {/* Dropzone Area */}
//             <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
//                 <input {...getInputProps()} />
//                 <p>Drag 'n' drop some files here, or click to select files</p>
//             </div>
            
//             {/* Previews */}
//             <div style={previewContainerStyle}>
//                 {files.map((file) => (
//                     <div key={file.name} style={previewStyle}>
//                         <img
//                             src={file.preview}
//                             alt={file.name}
//                             style={{ width: '100px', height: '100px' }}
//                             onLoad={() => URL.revokeObjectURL(file.preview)} // Revoke data URI after image load
//                         />
//                         <button onClick={() => removeFile(file.name)}>Remove</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

//     const dropzoneStyle = {
//         border: '2px dashed #007BFF',
//         borderRadius: '5px',
//         padding: '20px',
//         textAlign: 'center',
//         cursor: 'pointer',
//     };

//     const previewContainerStyle = {
//         display: 'flex',
//         flexWrap: 'wrap',
//         marginTop: '10px',
//     };

//     const previewStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         margin: '10px',
//     };

// export default FileUpload;

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Document, Page } from 'react-pdf';

const FileUpload = ({ onDrop }) => {
    const [files, setFiles] = useState([]);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
            if (onDrop) {
                onDrop(acceptedFiles);
            }
        },
        [onDrop]
    );

    const removeFile = (file) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };

    const thumbs = files.map((file) => {
        const isPdf = file.type === 'application/pdf';

        return (
        <div key={file.name} className="p-2 border rounded">
            {isPdf ? (
            <Document file={file} className="pdf-preview">
                <Page pageNumber={1} />
            </Document>
            ) : (
            <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="img-preview"
                onLoad={() => URL.revokeObjectURL(file)}
            />
            )}
            <button onClick={() => removeFile(file)}>Remove</button>
        </div>
        );
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*,application/pdf',
    });

    return (
        <div className="file-upload">
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="thumbs-container">{thumbs}</aside>
        </div>
    );

    const dropzoneStyle = {
        border: '2px dashed #007BFF',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
    };

    const previewContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '10px',
    };

    const previewStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
    };
};

export default FileUpload;

