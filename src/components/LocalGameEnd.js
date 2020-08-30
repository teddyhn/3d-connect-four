import React from "react"

const LocalGameEnd = ({ color, resetBoard }) => {

    const handleBack = () => {
        resetBoard()
    }

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-800 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                <span className="font-bold text-2xl mb-1">Game End</span>
                {color === "red"
                    ? <div className="font-semibold text-lg text-gray-700 mb-4"><span className="text-red-500">Red</span> won!</div>
                    : <div className="font-semibold text-lg text-gray-700 mb-4"><span className="text-blue-500">Blue</span> won!</div>
                }
                <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                    Back to Menu
                </button>
            </div>
        </div>
    )
}

export default LocalGameEnd