import React, { useState, useEffect } from "react";
// R3F
import { Canvas } from "react-three-fiber";
// Drei - R3F
import { softShadows, OrbitControls, Box } from "drei";
// Components
import Header from "./components/Header.js";
// Styles
import "./App.scss";

// soft Shadows
softShadows();

const createGrid = (gridSize) => {
  // Create one dimensional array 
  let grid = new Array(gridSize); 
    
  // Loop to create 2D array using 1D array 
  for (let i = 0; i < grid.length; i++) { 
    grid[i] = new Array(gridSize); 
  }
    
  // Loop to initialize 2D array elements. 
  for (let i = 0; i < gridSize; i++) { 
    for (let j = 0; j < gridSize; j++) { 
      grid[i][j] = `${i},${j}`; 
    } 
  }

  return grid
}

const App = () => {
  const [grid, setGrid] = useState([])

  useEffect(() => {
    setGrid(createGrid(7))
  }, [])

  return (
    <>
      <Header />
      <Canvas
        camera={{ position: [0, 4, 10], fov: 60 }}>
        <group>
          { grid.map((row, i) => row.map((tile, j) => 
            <Box key={tile} args={[1, 0.25, 1]} position={[j - 3, 0, i - 3]}>
              { (j % 2) === (i % 2) ? <meshBasicMaterial onClick={console.log('hi')} attach="material" color="hotpink" /> : <meshBasicMaterial attach="material" color="lightgreen" /> }
            </Box>
          ))}
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default App;
