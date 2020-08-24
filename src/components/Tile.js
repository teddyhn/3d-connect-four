import React from "react"
import { Box } from "drei"
import useHover from "../hooks/useHover"

const Tile = ({ i, j, handleClick }) => {

  return (
    <Box {...useHover()} onClick={e => handleClick(e, i, j)} args={[1, 0.25, 1]} position={[j - 3, 0, i - 3]}>
        { (j % 2) === (i % 2) ? <meshStandardMaterial attach="material" color="#838383" /> : <meshStandardMaterial attach="material" color="#f1f4f8" /> }
    </Box>
  )
}

export default Tile