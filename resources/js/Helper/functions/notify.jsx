import { toast } from "react-toastify";

export default function Notify(res){
    const { error, message } = res;

    if (error) {
        toast.error(typeof message === 'string' ? message : <>{message}</>);
    } else {
        toast.success(typeof message === 'string' ? message : <>{message}</>);
    }
};
