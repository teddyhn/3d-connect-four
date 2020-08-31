import socketIOClient from "socket.io-client"
const ENDPOINT = "http://127.0.0.1:4001"

export const socket = socketIOClient(ENDPOINT)

export const joinRoom = (roomID) => {
    console.log("Connecting...")
    if (socket && roomID) socket.emit("joinRoom", roomID)
}

export const createRoom = () => {
    if (socket) socket.emit("createRoom")
}

export const checkValidRoom = (roomID) => {
    if (socket) socket.emit("checkValidRoom", roomID)
}

export const playerTurn = (roomID, data) => {
    if (socket) socket.emit("playerTurn", roomID, data)
}