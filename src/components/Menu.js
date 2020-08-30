import React, { useState, useRef } from "react"
import AnimateHeight from "react-animate-height"
import { CircularProgress } from "@material-ui/core"

import { faCopy } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { createRoom } from "../utils/socket"

const Menu = ({ setShowMenu, setCurrentTurn, roomID, setRoomID, setLocalGameStart }) => {
    const [height, setHeight] = useState(0)
    const [copySuccess, setCopySuccess] = useState("")
    const inputRef = useRef(null)

    const handleOpen = () => {
        setHeight("auto")
        createRoom()
    }

    const handleClose = () => {
        setHeight(0)
        setCopySuccess("")
        setRoomID("")
    }

    const copyToClipboard = (e) => {
        inputRef.current.select()
        document.execCommand("copy")
        e.target.focus()

        setCopySuccess("Copied!")
    }

    const handleLocalPlay = () => {
        setShowMenu(false)
        setCurrentTurn(true)
        setLocalGameStart(true)
    }

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-800 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                <span className="font-bold text-2xl mb-1">3D Connect Four</span>
                <span className="text-gray-600 text-sm mb-6">Play Connect Four... in 3D!</span>
                <div className="flex mb-6">
                    {height === 0 
                        ? <button onClick={handleOpen} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                            Invite a Friend
                          </button>
                        : <button className="bg-blue-500 text-white font-semibold py-2 px-4 border border-gray-400 rounded opacity-50 cursor-not-allowed focus:outline-none">
                            Invite a Friend
                          </button>
                    }
                    {height === 0
                        ? <button onClick={handleLocalPlay} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                            Local Play (Demo)
                          </button>
                        : <button className="bg-blue-500 text-white font-semibold py-2 px-4 border border-gray-400 rounded opacity-50 cursor-not-allowed focus:outline-none">
                            Local Play (Demo)
                          </button>
                    }
                </div>
                <AnimateHeight height={height} className="w-full">
                    <div className="flex flex-col items-center text-blue-600">
                        <CircularProgress color={"inherit"} size={28} thickness={5.4} />
                        <span className="text-sm text-gray-800 mt-2 mb-4">Waiting for a player to join</span>
                        <span className="text-sm text-gray-800 mt-2 mb-2">{copySuccess ? copySuccess : "Copy the link below and send it to a friend:"}</span>
                        <div className="flex items-center w-full mb-4">
                            <input ref={inputRef} className="focus:outline-none text-blue-500 w-full pb-1 border-b-2 mr-4" value={`http://localhost:3000/${roomID}`} readOnly></input>
                            {document.queryCommandSupported('copy') && <FontAwesomeIcon onClick={copyToClipboard} className="cursor-pointer text-xl" icon={faCopy} />}
                        </div>
                        <button onClick={handleClose} className="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded focus:outline-none">
                            Cancel
                        </button>
                    </div>
                </AnimateHeight>
            </div>
        </div>
    )
}

export default Menu