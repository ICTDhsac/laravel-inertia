import { Button, Drawer, Avatar } from "flowbite-react";
import { HiBars2, HiSquaresPlus } from "react-icons/hi2";

export default function Show({isOpen, onClose, task}) {
  return (
    
    <Drawer className="z-50" open={isOpen} onClose={onClose} position="right">
        <Drawer.Header 
            title={task?.title}
            // titleIcon={() => <Avatar rounded size="xs" />}
            titleIcon={HiSquaresPlus}
            closeIcon={HiBars2}
            className="border-b-2 pt-5"
        />
        <Drawer.Items className="pt-5">
            <p>
                {task?.body}
            </p>
        </Drawer.Items>
    </Drawer>
    
  )
}
