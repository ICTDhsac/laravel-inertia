import { Modal } from "flowbite-react";

export default function ModalComponent({isOpen, onClose, children}) {
    return (
        <>
            <Modal show={isOpen} onClose={onClose}>
                {children}
            </Modal>
        </>
    )
}
