import { useEffect } from "react";
export default function Modal({ isOpen, onClose, title, children }) {

    useEffect(() => {
        if (isOpen) {
            // Focus on the first element in the modal
            document.querySelector('.modal-content').focus();
        }
    }, [isOpen]);

    return (
        <div className={`modal ${isOpen ? 'modal-open' : 'hidden'}`}>
            <div className="modal-box bg-gray-900 w-1/2 max-w-5xl">
                <div className="modal-title flex justify-between h-10">
                    <h2 className="text-lg text-bold">{title}</h2>
                    <button onClick={onClose} className='btn btn-xs btn-neutral'>X</button>
                </div>
                <div className="modal-content">
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

