import React, { useState, useEffect, useRef, useMemo } from "react"
import { useFrame, useThree, extend } from "react-three-fiber"
import { Vector2 } from "three"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { context } from "../App"

// Three
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"

extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass })

const Outline = ({ children }) => {
    const { gl, scene, camera, size } = useThree()
    const composer = useRef()
    const [hovered, set] = useState([])
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
    useEffect(() => composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(), 1)

    return (
      <context.Provider value={set}>
        {children}
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" args={[scene, camera]} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={hovered}
            visibleEdgeColor="white"
            hiddenEdgeColor="white"
            pulsePeriod={2}
            edgeStrength={5}
            edgeThickness={1}
          />
          <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
        </effectComposer>
      </context.Provider>
    )
}

export default Outline