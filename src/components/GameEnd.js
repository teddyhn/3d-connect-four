import React, { useState, useEffect } from "react"
import AnimateHeight from "react-animate-height"
import { CircularProgress } from "@material-ui/core"

import { useHistory } from "react-router-dom"
import { socket } from "../utils/socket"
import { faLongArrowAltLeft, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const GameEnd = ({ rematch, gameWon, gameAbandoned, resetBoard, roomID }) => {
    const [height, setHeight] = useState(0)
    const [rematchRequest, setRematchRequest] = useState(false)
    const [rematchRequested, setRematchRequested] = useState(false)
    const [disableRematchButton, setDisableRematchButton] = useState(false)

    const [rematchResponse, setRematchResponse] = useState("")
    const [responseDisabled, setResponseDisabled] = useState(false)

    const history = useHistory()

    useEffect(() => {
        socket.on("rematchRequested", () => {
            setRematchRequested(true)
            setDisableRematchButton(true)
            setHeight("auto")
        })

        socket.on("rematchAccepted", () => {
            setRematchResponse("accept")

            setTimeout(() => {
                rematch()
            }, 2000)
        })

        socket.on("rematchDeclined", () => {
            setRematchResponse("decline")
        })

        if (gameAbandoned) setHeight(0)
    }, [gameAbandoned])

    const handleBack = () => {
        socket.emit("leaveRoom", roomID)
        resetBoard()
        history.push("/")
    }

    const handleRematch = () => {
        socket.emit("rematch", roomID)
        setHeight("auto")
        setRematchRequest(true)
        setDisableRematchButton(true)
    }

    const handleAccept = () => {
        socket.emit("acceptRematch", roomID)
        setRematchResponse("accept")
        setResponseDisabled(true)
    }

    const handleDecline = () => {
        socket.emit("declineRematch", roomID)
        setRematchResponse("decline")
        setResponseDisabled(true)
    }
 
    const renderRematchResponse = (response) => {
        switch(response) {
            case "accept":
                return (<span className="text-sm text-gray-800 mt-2 mb-4">You accepted the rematch</span>)
            case "decline":
                return (<span className="text-sm text-gray-800 mt-2 mb-4">You declined the rematch</span>)
            default:
                return (<span className="text-sm text-gray-800 mt-2 mb-4">You received a rematch request</span>)
        }
    }

    const renderOpponentResponse = (response) => {
        switch(response) {
            case "accept":
                return (<span className="text-sm text-gray-800 mt-2 mb-4">Rematch request accepted</span>)
            case "decline":
                return (<span className="text-sm text-gray-800 mt-2 mb-4">Rematch request declined</span>)
            default:
                return (<span className="text-sm text-gray-800 mt-2 mb-4">Waiting for opponent response</span>)
        }
    }

    const renderRequestedIcon = (response) => {
        switch(response) {
            case "accept":
                return (<FontAwesomeIcon icon={faCheck} className="text-3xl text-green-600" />)
            case "decline":
                return (<FontAwesomeIcon icon={faTimes} className="text-3xl text-red-600" />)
            default:
                return (<CircularProgress color={"inherit"} size={28} thickness={5.4} />)
        }
    }

    return (
        <div className="absolute w-full h-full flex items-center">
            <div className="z-10 mx-auto bg-white text-gray-800 shadow-lg py-6 px-12 rounded flex flex-col items-center">
                {gameAbandoned
                    ? <>
                        <span className="font-bold text-2xl mb-1">Game Abandoned</span>
                        <span className="font-semibold text-md text-gray-600 mb-4">Your opponent has left</span>
                      </>
                    : <>
                        {gameWon
                            ? <>
                                <span className="font-bold text-2xl mb-1">Game End</span>
                                <span className="font-semibold text-lg text-green-500 mb-4">You Won</span>
                              </>
                            : <>
                                <span className="font-bold text-2xl mb-1">Game End</span>
                                <span className="font-semibold text-lg text-red-500 mb-4">You Lost</span>
                              </>
                        }
                      </>
                }
                
                <div className="flex mb-6">
                    {gameAbandoned || disableRematchButton
                        ? <button className="bg-blue-500 text-white font-semibold py-2 px-4 border border-gray-400 rounded opacity-50 cursor-not-allowed focus:outline-none">
                            Rematch
                          </button>
                        : <button onClick={handleRematch} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                            Rematch
                          </button>
                    }
                    <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                        <FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon> Menu
                    </button>
                </div>
                <AnimateHeight height={height} className="w-full">
                    {rematchRequest
                        ? <div className="flex flex-col items-center text-blue-600">
                            {renderRequestedIcon(rematchResponse)}
                            {renderOpponentResponse(rematchResponse)}
                          </div>
                        : null
                    }
                    {rematchRequested
                        ? <div className="flex flex-col items-center text-blue-600">
                            {renderRequestedIcon(rematchResponse)}
                            {renderRematchResponse(rematchResponse)}
                            <div className="flex">
                                {responseDisabled
                                    ? <button className="bg-blue-500 text-white font-semibold py-2 px-4 border border-gray-400 rounded opacity-50 cursor-not-allowed focus:outline-none">
                                        Accept
                                      </button>
                                    : <button onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                                        Accept
                                      </button>
                                }
                                {responseDisabled
                                    ? <button className="bg-blue-500 text-white font-semibold py-2 px-4 border border-gray-400 rounded opacity-50 cursor-not-allowed focus:outline-none">
                                        Decline
                                      </button>
                                    : <button onClick={handleDecline} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 focus:outline-none rounded shadow">
                                        Decline
                                      </button>
                                }
                            </div>
                          </div>
                        : null
                    }
                </AnimateHeight>
            </div>
        </div>
    )
}

export default GameEnd