import socketIOClient from "socket.io-client"
const ENDPOINT = "http://127.0.0.1:4001"

let socket

export const joinRoom = (roomID) => {
    console.log("Connecting...")
    socket = socketIOClient(ENDPOINT)
    if (socket && roomID) socket.emit("joinRoom", roomID)
}

export const disconnect = () => {
    console.log("Disconnecting...")
    if (socket) socket.disconnect()
}

export const createRoom = () => {
    socket = socketIOClient(ENDPOINT)
    if (socket) socket.emit("createRoom")
}

export const subscribe = (cb) => {
    if (!socket) return

    socket.on("newRoom", data => {
        return cb(null, data)
    })
}