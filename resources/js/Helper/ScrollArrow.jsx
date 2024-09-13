import React from 'react'

export default function ScrollArrow({containerRef}) {

    const scrollLeft = () => {
        containerRef.current.scrollBy({
            left: -300, // Adjust scroll distance here
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({
            left: 300, // Adjust scroll distance here
            behavior: "smooth",
        });
    };

  return (
    <>
            {/* Left Scroll Button */}
            <button
                onClick={scrollLeft}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                ◀
            </button>

            {/* Right Scroll Button */}
            <button
                onClick={scrollRight}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                ▶
            </button>
    </>
  )
}
