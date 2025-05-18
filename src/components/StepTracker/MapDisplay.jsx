import { useEffect, useRef } from 'react'

export default function MapDisplay({ path, currentLocation }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current || path.length === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // Set canvas dimensions to match parent
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Calculate boundaries to scale the path
        const minLat = Math.min(...path.map(p => p.latitude))
        const maxLat = Math.max(...path.map(p => p.latitude))
        const minLng = Math.min(...path.map(p => p.longitude))
        const maxLng = Math.max(...path.map(p => p.longitude))

        // Add some padding
        const latPadding = (maxLat - minLat) * 0.1
        const lngPadding = (maxLng - minLng) * 0.1

        // Function to convert coordinates to canvas position
        const toCanvasCoords = (lat, lng) => {
            const x = ((lng - minLng + lngPadding / 2) / (maxLng - minLng + lngPadding)) * canvas.width
            const y = canvas.height - ((lat - minLat + latPadding / 2) / (maxLat - minLat + latPadding)) * canvas.height
            return { x, y }
        }

        // Draw path
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = '#3B82F6' // Blue

        // Draw lines connecting points
        if (path.length > 1) {
            const start = toCanvasCoords(path[0].latitude, path[0].longitude)
            ctx.moveTo(start.x, start.y)

            for (let i = 1; i < path.length; i++) {
                const point = toCanvasCoords(path[i].latitude, path[i].longitude)
                ctx.lineTo(point.x, point.y)
            }

            ctx.stroke()
        }

        // Draw start point
        const startPoint = toCanvasCoords(path[0].latitude, path[0].longitude)
        ctx.beginPath()
        ctx.arc(startPoint.x, startPoint.y, 6, 0, 2 * Math.PI)
        ctx.fillStyle = '#10B981' // Green
        ctx.fill()

        // Draw current location
        if (currentLocation) {
            const currentPoint = toCanvasCoords(
                currentLocation.latitude,
                currentLocation.longitude
            )

            // Pulsing effect for current location
            ctx.beginPath()
            ctx.arc(currentPoint.x, currentPoint.y, 8, 0, 2 * Math.PI)
            ctx.fillStyle = 'rgba(239, 68, 68, 0.3)' // Red with opacity
            ctx.fill()

            ctx.beginPath()
            ctx.arc(currentPoint.x, currentPoint.y, 5, 0, 2 * Math.PI)
            ctx.fillStyle = '#EF4444' // Red
            ctx.fill()
        }

    }, [path, currentLocation])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    )
}