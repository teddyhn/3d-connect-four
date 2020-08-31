import React from "react"
import { useHistory } from "react-router-dom"
import { faTimes, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const InvalidRoom = ({ resetBoard }) => {
    const history = useHistory()

    const handleBack = () => {
        resetBoard()
        history.push("/")
    }

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-800 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                <FontAwesomeIcon className="text-3xl text-red-600" icon={faTimes} />
                <span className="font-bold text-xl mb-1">Invalid Room</span>
                <span className="font-semibold text-md text-gray-600 mb-4">The room you attempted to join no longer exists.</span>
                <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                    <FontAwesomeIcon icon={faLongArrowAltLeft} /> Menu
                </button>
            </div>
        </div>
    )
}

export default InvalidRoom