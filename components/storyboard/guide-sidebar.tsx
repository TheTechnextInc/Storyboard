"use client"

import {
  X,
  Camera,
  Pencil,
  MessageSquare,
  Music,
  Layers,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GuideSidebarProps {
  hasSelection: boolean
  onClose: () => void
}

const GUIDE_SECTIONS = [
  {
    icon: Camera,
    title: "Visual Tab",
    content:
      "Set the shot type (wide, close-up, aerial, etc.), camera angle (eye-level, low-angle, dutch), camera movement (pan, dolly, tracking), and transition to the next scene (cut, dissolve, fade).",
  },
  {
    icon: MessageSquare,
    title: "Narrative Tab",
    content:
      "Write what happens in the scene: a description of the action, any dialogue spoken by characters, blocking/choreography notes, plus the location and which characters appear.",
  },
  {
    icon: Pencil,
    title: "Sketch Tab",
    content:
      "Draw a rough composition directly in the browser. Use the pen tool to sketch, change colors and brush size, or erase. Your sketch appears in the frame preview and gets included in exports.",
  },
  {
    icon: Music,
    title: "Technical Tab",
    content:
      "Set the estimated duration for the scene, choose the transition out, and add notes about sound design, ambient audio, or music cues. Also shows a summary of all frame settings at a glance.",
  },
  {
    icon: Layers,
    title: "Timeline",
    content:
      "The strip at the bottom shows all your frames in order. Drag frames to reorder them. Hover a frame to see duplicate and delete options. Click the + button to add new frames.",
  },
  {
    icon: Download,
    title: "Exporting",
    content:
      "Click Export in the top-right to download your storyboard. HTML gives you a styled, printable document. JSON is machine-readable for tools. CSV imports into spreadsheets.",
  },
]

export function GuideSidebar({ hasSelection, onClose }: GuideSidebarProps) {
  return (
    <div className="hidden md:flex w-[260px] flex-col border-r border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Quick Guide
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Close guide"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 grid gap-4">
          {/* Context tip */}
          {!hasSelection && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs text-primary font-medium mb-1">
                Getting started
              </p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Click any frame in the timeline below to begin editing. Each
                frame represents one shot in your film.
              </p>
            </div>
          )}
          {hasSelection && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs text-primary font-medium mb-1">
                Editing a frame
              </p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Use the tabs to switch between Visual, Narrative, Sketch, and
                Technical settings. Everything you enter shows up in the
                preview on the right and in your exports.
              </p>
            </div>
          )}

          {/* Guide sections */}
          {GUIDE_SECTIONS.map((s) => (
            <div key={s.title} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <s.icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-foreground mb-0.5">
                  {s.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
