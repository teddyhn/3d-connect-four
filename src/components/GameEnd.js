import React from "react"
import { useHistory } from "react-router-dom"

const GameEnd = ({ gameWon, resetBoard }) => {
    const history = useHistory()

    const handleBack = () => {
        resetBoard()
        history.push("/")
    }

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-800 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                <span className="font-bold text-2xl mb-1">Game End</span>
                {gameWon
                    ? <span className="font-semibold text-lg text-green-500 mb-4">You Won</span>
                    : <span className="font-semibold text-lg text-red-500 mb-4">You Lost</span>
                }
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-2 py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                    Rematch
                </button>
                <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                    Back to Menu
                </button>
            </div>
        </div>
    )
}

export default GameEnd