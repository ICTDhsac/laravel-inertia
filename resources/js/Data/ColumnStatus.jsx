import { MdOutlinePending } from "react-icons/md";

export const columnStatus = [
    {
        status: "TO DO",
        title: "TO DO",
        icon: <MdOutlinePending className="text-md" />,
        color: "text-warning",
    },
    {
        status: "IN PROGRESS",
        title: "IN PROGRESS",
        icon: <MdOutlinePending className="text-md" />,
        color: "text-info",
    },
    {
        status: "COMPLETED",
        title: "COMPLETED",
        icon: <MdOutlinePending className="text-md" />,
        color: "text-success",
    },
    {
        status: "CANCELLED",
        title: "CANCELLED",
        icon: <MdOutlinePending className="text-md" />,
        color: "text-error",
    },
    {
        status: "BACKLOGS",
        title: "BACKLOGS",
        icon: <MdOutlinePending className="text-md" />,
        color: "text-amber-500",
    },
];
