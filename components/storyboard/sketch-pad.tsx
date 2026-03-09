"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Eraser, Pen, Undo2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface SketchPadProps {
  dataUrl: string | null
  onChange: (dataUrl: string | null) => void
}

const COLORS = ["#e8dcc8", "#c4a35a", "#5a8fc4", "#c45a5a", "#5ac47a", "#fff"]

export function SketchPad({ dataUrl, onChange }: SketchPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pen" | "eraser">("pen")
  const [color, setColor] = useState(COLORS[0])
  const [brushSize, setBrushSize] = useState(2)
  const historyRef = useRef<string[]>([])
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.scale(dpr, dpr)
    ctx.fillStyle = "transparent"
    ctx.fillRect(0, 0, rect.width, rect.height)

    if (dataUrl) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height)
      }
      img.src = dataUrl
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }
      const rect = canvas.getBoundingClientRect()
      const clientX =
        "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY =
        "touches" in e ? e.touches[0].clientY : e.clientY
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    },
    []
  )

  const saveState = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    historyRef.current.push(canvas.toDataURL())
    if (historyRef.current.length > 30) historyRef.current.shift()
  }, [])

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      saveState()
      const pos = getPos(e)
      lastPosRef.current = pos
      setIsDrawing(true)

      const ctx = canvasRef.current?.getContext("2d")
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2)
      ctx.fillStyle = tool === "eraser" ? "rgba(0,0,0,0)" : color
      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out"
        ctx.fill()
        ctx.globalCompositeOperation = "source-over"
      } else {
        ctx.fill()
      }
    },
    [getPos, saveState, brushSize, tool, color]
  )

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return
      e.preventDefault()
      const pos = getPos(e)
      const ctx = canvasRef.current?.getContext("2d")
      if (!ctx || !lastPosRef.current) return

      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out"
        ctx.strokeStyle = "rgba(0,0,0,1)"
      } else {
        ctx.globalCompositeOperation = "source-over"
        ctx.strokeStyle = color
      }

      ctx.beginPath()
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()

      lastPosRef.current = pos
    },
    [isDrawing, getPos, brushSize, tool, color]
  )

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    lastPosRef.current = null
    const canvas = canvasRef.current
    if (canvas) {
      onChange(canvas.toDataURL("image/png"))
    }
  }, [isDrawing, onChange])

  const undo = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || historyRef.current.length === 0) return

    const prev = historyRef.current.pop()!
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr)
      onChange(canvas.toDataURL("image/png"))
    }
    img.src = prev
  }, [onChange])

  const clearCanvas = useCallback(() => {
    saveState()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
    onChange(null)
  }, [onChange, saveState])

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 w-7 p-0",
              tool === "pen" && "bg-secondary text-foreground"
            )}
            onClick={() => setTool("pen")}
            aria-label="Pen tool"
          >
            <Pen className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 w-7 p-0",
              tool === "eraser" && "bg-secondary text-foreground"
            )}
            onClick={() => setTool("eraser")}
            aria-label="Eraser tool"
          >
            <Eraser className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c)
                setTool("pen")
              }}
              className={cn(
                "h-5 w-5 rounded-full border-2 transition-transform",
                color === c && tool === "pen"
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: c }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] text-muted-foreground font-mono">
            Size
          </span>
          <Slider
            value={[brushSize]}
            onValueChange={([v]) => setBrushSize(v)}
            min={1}
            max={12}
            step={1}
            className="w-16"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
          onClick={undo}
          aria-label="Undo"
        >
          <Undo2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
          onClick={clearCanvas}
          aria-label="Clear canvas"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-lg border border-border bg-background/50 overflow-hidden cursor-crosshair touch-none"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0"
        />
      </div>
    </div>
  )
}
