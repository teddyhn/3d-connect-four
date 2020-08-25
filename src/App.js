import React, { useState, useEffect } from "react"
// R3F
import { Canvas } from "react-three-fiber"
// Drei - R3F
import { softShadows, OrbitControls } from "drei"
// Hooks
import useHover from "./hooks/useHover"
// Utils
import checkWin from "./utils/checkWin"
// Components
import Header from "./components/Header"
import Tile from "./components/Tile"
import Ball from "./components/Ball"
import Outline from "./components/Outline"
// Styles
import "./App.scss"

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
      grid[i][j] = [] 
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

  // Initialize grid on render
  useEffect(() => {
    setGrid(updateGrid())
  }, [])

  const handleClick = (e, i, j) => {
    e.stopPropagation()

    color === "blue" ? setColor("red") : setColor("blue")

    setGrid(updateGrid(grid, { row: j, column: i, color: color }))

    if (checkWin(grid, color)) {
      alert(`${color} won!`)
      setTimeout(() => {
        setGrid(createGrid(7))
      }, 2500)
    }
  }

  return (
    <>
      <Header />
      <Canvas
        colorManagement
        shadowMap
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [0, 4, 10], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <directionalLight
          castShadow
          position={[-7, 10, 10]}
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
                  <Ball key={`${i},${j},${k}`} i={i} j={j} k={k} item={item} handleClick={handleClick} useHover={useHover} />
                )
              )
            )}
          </Outline>
          
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default App
