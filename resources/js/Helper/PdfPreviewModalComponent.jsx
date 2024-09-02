import PdfViewerComponent from "./PdfViewerComponent";
import { IoMdClose } from "react-icons/io";


export default function PdfPreviewModalComponent({isOpen, onClose, fileUrl}) {

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box w-full max-w-5xl md:w-1/2 h-screen">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg">PDF Document</h3>
                    <button onClick={onClose} className="btn btn-sm btn-error"><IoMdClose /></button>
                </div>
                <PdfViewerComponent fileUrl={fileUrl} />
            </div>
        </div>
    );

}
