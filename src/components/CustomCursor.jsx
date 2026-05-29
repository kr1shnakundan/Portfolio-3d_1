import { gsap } from "gsap"
import { useEffect, useRef } from "react"

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const cursorBorderRef = useRef(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        const isMobile = window.matchMedia("(max-width: 768px)").matches
        if (isMobile) return

        const cursor = cursorRef.current
        const cursorBorder = cursorBorderRef.current

        if (!cursor || !cursorBorder) return

        // initial position centered
        gsap.set([cursor, cursorBorder], {
            xPercent: -50,
            yPercent: -50,
        })

        // separate quickTo tweens for different follow speeds
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" })
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" })

        const xToBorder = gsap.quickTo(cursorBorder, "x", { duration: 0.5, ease: "power3.out" })
        const yToBorder = gsap.quickTo(cursorBorder, "y", { duration: 0.5, ease: "power3.out" })

        const handleMouseMove = (e) => {
            xTo(e.clientX)
            yTo(e.clientY)

            xToBorder(e.clientX)
            yToBorder(e.clientY)
        }

        const handleMouseDown = () => {
            gsap.to([cursor, cursorBorder], {
                scale: 0.6,
                duration: 0.2,
            })
        }

        const handleMouseUp = () => {
            gsap.to([cursor, cursorBorder], {
                scale: 1,
                duration: 0.2,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [])

    const isMobile =
        typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches

    if (isMobile) return null

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none rounded-full mix-blend-difference w-[10px] h-[10px] bg-white z-[999]"
            />

            <div
                ref={cursorBorderRef}
                className="fixed top-0 left-0 pointer-events-none rounded-full border border-white mixed-blend-difference w-[40px] h-[40px] z-[999] opacity-50"
            />
        </>
    )
}

export default CustomCursor