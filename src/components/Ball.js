import React from "react"
import { Sphere } from "drei"

const Ball = ({ i, j, k, item, handleClick, useHover }) => {

  return (
    <Sphere {...useHover()} onClick={e => handleClick(e, j, i)} args={[0.4, 64, 64]} position={[i - 3, k + 0.6125, j - 3]} castShadow>
      <meshPhongMaterial attach="material" color={item} emissive={0x444444} />
    </Sphere>
  )
}

export default Ball