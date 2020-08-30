import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// R3F
import { Canvas } from "react-three-fiber"
// Drei - R3F
import { softShadows, OrbitControls } from "drei"
// Hooks
import useHover from "./hooks/useHover"
// Utils
import checkWin from "./utils/checkWin"
import { socket, joinRoom, disconnect, checkValidRoom, playerTurn } from "./utils/socket"
// Components
import Header from "./components/Header"
import Menu from "./components/Menu"
import GameEnd from "./components/GameEnd"
import LocalGameEnd from "./components/LocalGameEnd"
import InvalidRoom from "./components/InvalidRoom"
import Tile from "./components/Tile"
import Ball from "./components/Ball"
import Outline from "./components/Outline"

// Soft Shadows
softShadows()

const createGrid = (gridSize) => {
  // Create one dimensional array 
  const grid = new Array(gridSize)
    
  // Loop to create 2D array using 1D array 
  for (let i = 0; i < grid.length; i++) { 
    grid[i] = new Array(gridSize);
  }
    
  // Loop to initialize 2D array elements. 
  for (let i = 0; i < gridSize; i++) { 
    for (let j = 0; j < gridSize; j++) {
      if (i === 3 && j === 3) grid[i][j] = ["white"]

      else grid[i][j] = [] 
    } 
  }

  return grid
}

const updateGrid = (grid = [], ball = {}) => {
  if (!grid.length) grid = createGrid(7)

  if (Object.keys(ball).length) grid[ball.row][ball.column].push(ball.color)

  return grid
}

export const context = React.createContext()

const App = () => {
  const [grid, setGrid] = useState([])
  const [color, setColor] = useState("blue")
  const [roomID, setRoomID] = useState("")
  const [showMenu, setShowMenu] = useState(true)
  const [updated, setUpdated] = useState(0)
  const [gameStart, setGameStart] = useState(false)
  const [currentTurn, setCurrentTurn] = useState(false)
  const [invalidRoom, setInvalidRoom] = useState(false)

  const [localGameStart, setLocalGameStart] = useState(false)
  const [localGameEnd, setLocalGameEnd] = useState(false)

  const [gameEnd, setGameEnd] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    // Initialize grid on render
    setGrid(updateGrid())

    if (id && id.length === 5) {
      joinRoom(id)
      checkValidRoom(id)
      setColor("red")
      setLocalGameStart(false)
    }

    return () => disconnect()
  }, [id])

  const getOppositeColor = (color) => {
    if (color === "blue") return "red"
    else return "blue"
  }

  // Check for wins in local mode
  useEffect(() => {
    if (localGameStart && currentTurn) {
      if (checkWin(grid, getOppositeColor(color))) {
        setLocalGameEnd(true)
        setLocalGameStart(false)
        setCurrentTurn(false)
      }
    }
  }, [grid, color, currentTurn, localGameStart])

  // Handle socket.io events
  useEffect(() => {
    socket.once("roomCreated", (data) => {
      setRoomID(data.id)
    })

    socket.once("startGame", () => {
      setShowMenu(false)
      setLocalGameStart(false)
      setGameStart(true)
    })

    socket.once("validRoom", (data) => {
      setRoomID(data.id)
      setShowMenu(false)
      setGameStart(true)
    })

    socket.once("invalidRoom", () => {
      setInvalidRoom(true)
    })

    socket.off("yourTurn").on("yourTurn", () => {
      setCurrentTurn(true)
    })

    socket.off("playerTurn").on("playerTurn", (data) => {
      setGrid(updateGrid(grid, data))
      setUpdated(Date.now())
    })

    socket.off("gameWon").on("gameWon", (data) => {
      setGameEnd(true)
      setGameStart(false)

      data === color ? setGameWon(true) : setGameWon(false)
    })
  })

  const handleClick = (e, i, j) => {
    e.stopPropagation()

    if (!currentTurn) return

    if (grid[j][i].length >= 4) {
      return
    }

    if (localGameStart) {
      color === "blue" ? setColor("red") : setColor("blue")
      setGrid(updateGrid(grid, { row: j, column: i, color: color, timestamp: Date.now() }))
    }

    else {
      setCurrentTurn(false)
      playerTurn(roomID, { row: j, column: i, color: color, timestamp: Date.now() })
    }

    // Triggers re-render for balls
    setUpdated(Date.now())
  }

  const resetBoard = () => {
    setGameEnd(false)
    setLocalGameEnd(false)
    setInvalidRoom(false)
    setShowMenu(true)
    setGrid(updateGrid())
    setRoomID("")
  }

  return (
    <>
      <Header roomID={roomID} color={color} currentTurn={currentTurn} gameStart={gameStart} localGameStart={localGameStart} />
      {!id && showMenu
        ? <Menu roomID={roomID} setRoomID={setRoomID} setShowMenu={setShowMenu} setCurrentTurn={setCurrentTurn} setLocalGameStart={setLocalGameStart} />
        : null
      }
      {gameEnd
        ? <GameEnd gameWon={gameWon} resetBoard={resetBoard} />
        : null
      }
      {localGameEnd
        ? <LocalGameEnd color={getOppositeColor(color)} resetBoard={resetBoard} />
        : null
      }
      {invalidRoom
        ? <InvalidRoom resetBoard={resetBoard} />
        : null
      }
      <Canvas
        colorManagement
        shadowMap
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [0, 4, 10], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <group>
          {/* 2D plane that receives shadows, sits on top of board */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.125 + 0.001, 0]}
            receiveShadow>
            <planeBufferGeometry attach="geometry" args={[7, 7]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>

          <Outline>
            {/* Renders game board/tiles */}
            {grid.map((row, i) => 
              row.map((tile, j) => 
                <Tile key={`${i}, ${j}`} i={i} j={j} handleClick={handleClick} useHover={useHover} />
              )
            )}

            {/* Renders game pieces/balls */}
            {grid.map((row, i) => 
              row.map((tile, j) => 
                tile.map((item, k) => 
                  <Ball key={`${i},${j},${k}`} i={i} j={j} k={k} item={item} handleClick={handleClick} useHover={useHover} updated={updated} />
                )
              )
            )}
          </Outline>
          
        </group>
        <OrbitControls
          enablePan={false}
          minDistance={7.5}
          maxDistance={15}
          maxPolarAngle={Math.PI/2.1}
        />
      </Canvas>
    </>
  )
}

export default App
