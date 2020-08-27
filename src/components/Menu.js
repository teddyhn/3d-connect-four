import React, { useState } from "react"
import AnimateHeight from "react-animate-height"

const Menu = () => {
    const [show, setShow] = useState(false)
    const [height, setHeight] = useState(0)

    const handleClick = () => {
        setShow(true)
        setHeight(height => height === 0 ? "auto" : 0)
    }

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-800 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                <span className="font-medium text-lg">3D Connect Four</span>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold mt-4 py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                    Invite a Friend
                </button>
                <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold mt-4 py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                    Local / Demo Mode
                </button>
                <AnimateHeight height={height}>
                    {show
                        ? <div className="mt-4">"TEXT"</div>
                        : null
                    }
                </AnimateHeight>
            </div>
        </div>
    )
}

export default Menu