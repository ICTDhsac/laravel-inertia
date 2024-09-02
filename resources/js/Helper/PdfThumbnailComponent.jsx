import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PdfPreviewModalComponent from './PdfPreviewModalComponent';


// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

export default function PdfThumbnailComponent({fileUrl, fileName}) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(0.6);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom level of 2
    const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level of 0.5

    const goToNextPage = () => setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
    const goToPreviousPage = () => setPageNumber((prevPage) => Math.max(prevPage - 1, 1));

    const openModal  = () => setModalIsOpen(true);
    const closeModal  = () => setModalIsOpen(false);

    return (
        <>

            <figure className="border border-gray-300 p-4 rounded-lg w-full">
                <div className="relative w-full h-48 overflow-hidden flex justify-center item-center border border-gray-300 rounded-lg">
                    <div style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center center', // Center the scaling
                        position: 'absolute',
                        top: '50%',
                        left: '30%',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: `translate(-50%, -50%) scale(${zoom})`,  
                    }}>
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="w-auto max-w-full"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={zoom}
                            className="my-4"  
                        />
                    </Document>
                    </div>
                </div>
                <figcaption className='overflow-hidden text-ellipsis whitespace-nowrap'>{fileName}</figcaption>
                
                <div className="flex justify-between items-center mt-2 text-sm">
                    <p className="text-center">
                        Page {pageNumber} of {numPages}
                    </p>
                    <button
                        // href={fileUrl}
                        // target="_blank"
                        onClick={openModal}
                        className="btn btn-sm btn-primary text-white "
                    >
                        View 
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className='space-x-2'>
                        <button onClick={goToPreviousPage} className="btn btn-sm btn-ghost"><FaChevronLeft/></button>
                        <button onClick={goToNextPage} className="btn btn-sm btn-ghost"><FaChevronRight/></button>
                    </div>
                    <div className='space-x-2'>
                        <button onClick={handleZoomOut} className="btn btn-sm btn-ghost"> - </button>
                        <button onClick={handleZoomIn} className="btn btn-sm btn-ghost"> + </button>
                    </div>
                </div>
            </figure>
            
            <PdfPreviewModalComponent isOpen={modalIsOpen} onClose={closeModal} fileUrl={fileUrl} />
        </>
    );
}