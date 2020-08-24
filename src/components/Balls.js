import React from "react";
import { Sphere } from "drei"

const Balls = ({ grid, handleClick }) => {

    return (
        <>
            {grid.map((row, i) => 
                row.map((tile, j) => 
                    tile.map((item, k) => 
                        <Sphere onClick={e => handleClick(e, j, i)} key={`${i},${j},${k}`} castShadow args={[0.4, 64, 64]} position={[i - 3, k + 0.6125, j - 3]}>
                            <meshPhongMaterial attach="material" color={item} emissive={0x444444} />
                        </Sphere>
                    )
                )
            )}
        </>
    );
};

export default Balls;