"use client"

import { useCallback, useRef, useState } from "react"
import { GripVertical, Copy, Trash2, Plus, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { SceneFrame } from "@/lib/storyboard-types"
import {
  SHOT_TYPE_LABELS,
  TRANSITION_LABELS,
} from "@/lib/storyboard-types"

interface TimelineProps {
  frames: SceneFrame[]
  selectedFrameId: string | null
  onSelect: (id: string) => void
  onReorder: (from: number, to: number) => void
  onDuplicate: (id: string) => void
  onRemove: (id: string) => void
  onAdd: () => void
}

export function Timeline({
  frames,
  selectedFrameId,
  onSelect,
  onReorder,
  onDuplicate,
  onRemove,
  onAdd,
}: TimelineProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [overIdx, setOverIdx] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const dragRef = useRef<number | null>(null)

  const handleDragStart = useCallback(
    (e: React.DragEvent, idx: number) => {
      dragRef.current = idx
      setDragIdx(idx)
      e.dataTransfer.effectAllowed = "move"
    },
    []
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault()
      setOverIdx(idx)
    },
    []
  )

  const handleDrop = useCallback(
    (_e: React.DragEvent, idx: number) => {
      if (dragRef.current !== null && dragRef.current !== idx) {
        onReorder(dragRef.current, idx)
      }
      dragRef.current = null
      setDragIdx(null)
      setOverIdx(null)
    },
    [onReorder]
  )

  const handleDragEnd = useCallback(() => {
    dragRef.current = null
    setDragIdx(null)
    setOverIdx(null)
  }, [])

  return (
    <div className="border-t border-border bg-card shrink-0" role="region" aria-label="Storyboard timeline">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Timeline
          </h2>
          <span className="text-[10px] text-muted-foreground/60 font-mono hidden sm:inline">
            {collapsed ? `${frames.length} frames` : "-- drag frames to reorder, click to edit"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {collapsed && (
            <span className="text-[10px] text-muted-foreground font-mono">
              {frames.length} {frames.length === 1 ? "frame" : "frames"}
            </span>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label={collapsed ? "Expand timeline" : "Minimize timeline"}
          >
            {collapsed ? (
              <>
                <ChevronUp className="h-3 w-3" />
                <span className="hidden sm:inline">Expand</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                <span className="hidden sm:inline">Minimize</span>
              </>
            )}
          </button>
        </div>
      </div>
      {!collapsed && (
      <ScrollArea className="w-full">
        <div className="flex items-stretch gap-1.5 p-3">
          <TooltipProvider delayDuration={200}>
            {frames.map((frame, idx) => (
              <div key={frame.id} className="flex items-center gap-1">
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onSelect(frame.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Scene ${frame.sceneNumber}: ${frame.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onSelect(frame.id)
                    }
                  }}
                  className={cn(
                    "group relative flex flex-col w-[130px] min-w-[130px] rounded-lg border cursor-pointer transition-all duration-150",
                    selectedFrameId === frame.id
                      ? "border-primary bg-secondary ring-1 ring-primary/30"
                      : "border-border bg-secondary/50 hover:border-muted-foreground/30 hover:bg-secondary",
                    dragIdx === idx && "opacity-50",
                    overIdx === idx && dragIdx !== idx && "ring-2 ring-primary/50"
                  )}
                >
                  {/* Color stripe */}
                  <div
                    className="h-1 w-full rounded-t-lg"
                    style={{ backgroundColor: frame.color }}
                  />

                  {/* Sketch preview or placeholder */}
                  <div className="relative h-[64px] w-full bg-background/50 flex items-center justify-center overflow-hidden">
                    {frame.sketchDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={frame.sketchDataUrl}
                        alt={`Sketch for ${frame.title}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="h-6 w-10 rounded border border-dashed border-muted-foreground/20" />
                        <span className="text-[8px] text-muted-foreground/40 font-mono">
                          No sketch
                        </span>
                      </div>
                    )}

                    {/* Drag handle */}
                    <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="h-3 w-3 text-muted-foreground" />
                    </div>

                    {/* Actions */}
                    <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onDuplicate(frame.id)
                            }}
                            className="h-5 w-5 rounded flex items-center justify-center bg-card/80 hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Duplicate scene ${frame.sceneNumber}`}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-popover border-border text-popover-foreground text-xs"
                        >
                          Duplicate
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onRemove(frame.id)
                            }}
                            className="h-5 w-5 rounded flex items-center justify-center bg-card/80 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={`Delete scene ${frame.sceneNumber}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-popover border-border text-popover-foreground text-xs"
                        >
                          Delete
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold font-mono shrink-0"
                        style={{
                          backgroundColor: frame.color,
                          color: "#1a1a2e",
                        }}
                      >
                        {frame.sceneNumber}
                      </span>
                      <span className="text-[11px] font-medium text-foreground truncate">
                        {frame.title}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[9px] text-muted-foreground font-mono">
                      <span>{SHOT_TYPE_LABELS[frame.shotType]}</span>
                      <span className="text-border">{"/"}</span>
                      <span>{frame.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Transition indicator */}
                {idx < frames.length - 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-0.5 px-0.5" aria-hidden="true">
                        <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
                        <span className="text-[7px] text-muted-foreground/50 font-mono uppercase leading-none">
                          {TRANSITION_LABELS[frame.transition]}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-popover border-border text-popover-foreground text-xs"
                    >
                      Transition: {TRANSITION_LABELS[frame.transition]}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))}
          </TooltipProvider>

          {/* Add frame button */}
          <button
            onClick={onAdd}
            className="flex flex-col items-center justify-center w-[130px] min-w-[130px] rounded-lg border border-dashed border-muted-foreground/20 hover:border-primary/40 bg-transparent hover:bg-secondary/30 transition-all"
            aria-label="Add a new frame"
          >
            <Plus className="h-5 w-5 text-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground/40 mt-1 font-mono">
              Add Frame
            </span>
          </button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      )}
    </div>
  )
}
