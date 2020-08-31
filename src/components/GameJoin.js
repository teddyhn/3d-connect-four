import React from "react"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const GameJoin = () => {

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-700 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                <FontAwesomeIcon className="text-3xl text-green-600" icon={faCheck} />
                <span className="font-semibold text-md mt-2">Room joined. Starting game...</span>
            </div>
        </div>
    )
}

export default GameJoin