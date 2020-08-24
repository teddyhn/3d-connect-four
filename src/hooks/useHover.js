import { useRef, useContext, useCallback } from "react"
import { context } from "../App"

function useHover(e) {
    const ref = useRef()
    const setHovered = useContext(context)
    const onPointerOver = e = useCallback((e) => {
        e.stopPropagation()
        return setHovered(state => [...state, ref.current]), [setHovered]
    })
    const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [setHovered])
    return { ref, onPointerOver, onPointerOut }
}

export default useHover