"use client"

import {
  Camera,
  Clock,
  MapPin,
  MessageSquare,
  Move,
  Music,
  Palette,
  Users,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SceneFrame } from "@/lib/storyboard-types"
import {
  SHOT_TYPE_LABELS,
  CAMERA_ANGLE_LABELS,
  CAMERA_MOVEMENT_LABELS,
  TRANSITION_LABELS,
  MOOD_LABELS,
  PACING_LABELS,
  TIME_OF_DAY_LABELS,
} from "@/lib/storyboard-types"

interface FramePreviewProps {
  frame: SceneFrame
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  if (!value) return null
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <span className="text-[10px] font-mono uppercase text-muted-foreground">
          {label}
        </span>
        <p className="text-xs text-foreground leading-relaxed">{value}</p>
      </div>
    </div>
  )
}

export function FramePreview({ frame }: FramePreviewProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span
          className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold font-mono"
          style={{ backgroundColor: frame.color, color: "#1a1a2e" }}
        >
          {frame.sceneNumber}
        </span>
        <h3 className="text-sm font-semibold text-foreground">
          {frame.title}
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Sketch */}
          <div className="relative aspect-video w-full rounded-lg border border-border bg-background/50 overflow-hidden mb-4">
            {frame.sketchDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={frame.sketchDataUrl}
                alt={`Sketch for ${frame.title}`}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-xs text-muted-foreground/40 font-mono">
                  No sketch added
                </p>
              </div>
            )}

            {/* Overlay badges */}
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              <Badge className="bg-card/90 text-foreground border-border text-[9px] font-mono backdrop-blur-sm">
                {SHOT_TYPE_LABELS[frame.shotType]}
              </Badge>
              <Badge className="bg-card/90 text-foreground border-border text-[9px] font-mono backdrop-blur-sm">
                {CAMERA_ANGLE_LABELS[frame.cameraAngle]}
              </Badge>
            </div>
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-card/90 text-primary border-primary/30 text-[9px] font-mono backdrop-blur-sm">
                {frame.duration}
              </Badge>
            </div>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <Badge variant="secondary" className="text-[9px] font-mono bg-secondary text-secondary-foreground">
              <Camera className="h-2.5 w-2.5 mr-1" />
              {CAMERA_MOVEMENT_LABELS[frame.cameraMovement]}
            </Badge>
            <Badge variant="secondary" className="text-[9px] font-mono bg-secondary text-secondary-foreground">
              <Zap className="h-2.5 w-2.5 mr-1" />
              {TRANSITION_LABELS[frame.transition]}
            </Badge>
            <Badge variant="secondary" className="text-[9px] font-mono bg-primary/15 text-primary border-primary/20">
              <Palette className="h-2.5 w-2.5 mr-1" />
              {MOOD_LABELS[frame.mood]}
            </Badge>
            <Badge variant="secondary" className="text-[9px] font-mono bg-secondary text-secondary-foreground">
              <Clock className="h-2.5 w-2.5 mr-1" />
              {PACING_LABELS[frame.pacing]}
            </Badge>
            <Badge variant="secondary" className="text-[9px] font-mono bg-secondary text-secondary-foreground">
              {TIME_OF_DAY_LABELS[frame.timeOfDay]}
            </Badge>
          </div>

          {/* Details */}
          <div className="grid gap-3">
            <InfoRow
              icon={MapPin}
              label="Location"
              value={frame.location}
            />
            <InfoRow
              icon={Users}
              label="Characters"
              value={frame.characters}
            />
            {frame.description && (
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                  Description
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {frame.description}
                </p>
              </div>
            )}
            {frame.dialogue && (
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1 mb-1">
                  <MessageSquare className="h-3 w-3" /> Dialogue
                </span>
                <p className="text-xs text-foreground leading-relaxed font-mono italic">
                  {frame.dialogue}
                </p>
              </div>
            )}
            {frame.actionNotes && (
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1 mb-1">
                  <Move className="h-3 w-3" /> Action Notes
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {frame.actionNotes}
                </p>
              </div>
            )}
            {frame.soundNotes && (
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1 mb-1">
                  <Music className="h-3 w-3" /> Sound Notes
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {frame.soundNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
