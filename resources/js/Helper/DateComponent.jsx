import moment from 'moment';

export default function DateComponent({dateTime}) {
    
    const createdAt = moment(dateTime);
    const now = moment();

    const hoursDiff = now.diff(createdAt, 'hours');

    const displayTime = hoursDiff < 24
    ? createdAt.fromNow()   // Show relative time like "x hours ago"
    : createdAt.format('MMMM Do YYYY, h:mm:ss a'); // Show full date-time format


    return (
        
        <div className="text-sm text-slate-800 dark:text-slate-300">
            <span>Posted on: </span>
            <span> {displayTime}</span>
        </div>
        
    )
}
