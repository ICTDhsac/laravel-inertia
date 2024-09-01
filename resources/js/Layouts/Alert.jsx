import { CiCircleCheck } from "react-icons/ci"; //<CiCircleCheck />
import { MdError } from "react-icons/md"; //<MdError />

export default function Alert({message = "Error!", isSuccess = false}) {
    return (
        <>
            <div role="alert" className={`alert ${isSuccess ? 'alert-success' : 'alert-error'} my-2`}>
                {isSuccess ? <CiCircleCheck /> : <MdError />}
                <span> { message } </span>
            </div>
        </>
    )
}
