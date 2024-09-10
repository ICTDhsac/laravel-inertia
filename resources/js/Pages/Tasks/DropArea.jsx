import { useState } from "react"

export default function DropArea({onDrop}) {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <section
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            className={showDrop ? `drop-area` : 'opacity-0'}
            onDrop={() => {
                onDrop();
                setShowDrop(false);
            }}
            onDragOver={ (e) => e.preventDefault()}
        >
            <span>Drop Here</span>
        </section>
    )
}

