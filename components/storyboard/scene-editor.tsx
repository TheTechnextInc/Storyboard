"use client"

import {
  Camera,
  Clapperboard,
  Clock,
  MapPin,
  MessageSquare,
  Move,
  Music,
  Palette,
  Users,
  Zap,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { SketchPad } from "./sketch-pad"
import type { SceneFrame } from "@/lib/storyboard-types"
import {
  SHOT_TYPE_LABELS,
  CAMERA_ANGLE_LABELS,
  CAMERA_MOVEMENT_LABELS,
  TRANSITION_LABELS,
  MOOD_LABELS,
  PACING_LABELS,
  TIME_OF_DAY_LABELS,
  SCENE_COLORS,
} from "@/lib/storyboard-types"
import type {
  ShotType,
  CameraAngle,
  CameraMovement,
  Transition,
  Mood,
  Pacing,
  TimeOfDay,
} from "@/lib/storyboard-types"

interface SceneEditorProps {
  frame: SceneFrame
  onUpdate: (id: string, updates: Partial<SceneFrame>) => void
}

function FieldGroup({
  label,
  icon: Icon,
  hint,
  children,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </Label>
      {children}
      {hint && (
        <p className="text-[10px] leading-relaxed text-muted-foreground/60">
          {hint}
        </p>
      )}
    </div>
  )
}

function TabHint({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/50 p-3 mb-4">
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        {text}
      </p>
    </div>
  )
}

export function SceneEditor({ frame, onUpdate }: SceneEditorProps) {
  const update = (updates: Partial<SceneFrame>) =>
    onUpdate(frame.id, updates)

  return (
    <div className="flex h-full flex-col">
      {/* Scene header with title + color picker */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold font-mono"
          style={{ backgroundColor: frame.color, color: "#1a1a2e" }}
        >
          {frame.sceneNumber}
        </span>
        <Input
          value={frame.title}
          onChange={(e) => update({ title: e.target.value })}
          className="h-8 border-none bg-transparent px-0 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          placeholder="Give this scene a name..."
        />
        <div className="flex items-center gap-1 ml-auto shrink-0">
          <span className="text-[10px] text-muted-foreground mr-1 hidden sm:inline">Color:</span>
          {SCENE_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => update({ color: c })}
              className={`h-3.5 w-3.5 rounded-full border transition-transform ${
                frame.color === c
                  ? "border-foreground scale-125"
                  : "border-transparent hover:scale-110"
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Set scene color to ${c}`}
            />
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 h-9">
            <TabsTrigger
              value="visual"
              className="text-xs font-mono uppercase tracking-wider data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground"
            >
              Visual
            </TabsTrigger>
            <TabsTrigger
              value="narrative"
              className="text-xs font-mono uppercase tracking-wider data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground"
            >
              Narrative
            </TabsTrigger>
            <TabsTrigger
              value="sketch"
              className="text-xs font-mono uppercase tracking-wider data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground"
            >
              Sketch
            </TabsTrigger>
            <TabsTrigger
              value="technical"
              className="text-xs font-mono uppercase tracking-wider data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground"
            >
              Technical
            </TabsTrigger>
          </TabsList>

          {/* VISUAL TAB */}
          <TabsContent value="visual" className="p-4">
            <TabHint text="Define how this scene looks on camera. Choose the framing, angle, how the camera moves, and what transition leads into the next scene." />
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <FieldGroup
                  label="Shot Type"
                  icon={Camera}
                  hint="How much of the scene is visible (wide shows environment, close-up shows detail)"
                >
                  <Select
                    value={frame.shotType}
                    onValueChange={(v) => update({ shotType: v as ShotType })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(SHOT_TYPE_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup
                  label="Camera Angle"
                  icon={Camera}
                  hint="The vertical position of the camera relative to the subject"
                >
                  <Select
                    value={frame.cameraAngle}
                    onValueChange={(v) => update({ cameraAngle: v as CameraAngle })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(CAMERA_ANGLE_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup
                  label="Camera Movement"
                  icon={Move}
                  hint="How the camera physically moves during the shot"
                >
                  <Select
                    value={frame.cameraMovement}
                    onValueChange={(v) => update({ cameraMovement: v as CameraMovement })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(CAMERA_MOVEMENT_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup
                  label="Transition"
                  icon={Zap}
                  hint="How this scene transitions to the next one"
                >
                  <Select
                    value={frame.transition}
                    onValueChange={(v) => update({ transition: v as Transition })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(TRANSITION_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <FieldGroup label="Mood" icon={Palette} hint="Emotional tone">
                  <Select
                    value={frame.mood}
                    onValueChange={(v) => update({ mood: v as Mood })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(MOOD_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup label="Pacing" icon={Zap} hint="Scene rhythm">
                  <Select
                    value={frame.pacing}
                    onValueChange={(v) => update({ pacing: v as Pacing })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(PACING_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup label="Time of Day" icon={Clock} hint="Lighting context">
                  <Select
                    value={frame.timeOfDay}
                    onValueChange={(v) => update({ timeOfDay: v as TimeOfDay })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(TIME_OF_DAY_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>

              {/* Quick badges summary */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                <span className="text-[10px] font-mono text-muted-foreground mr-1 self-center">Summary:</span>
                <Badge variant="secondary" className="text-[10px] font-mono bg-secondary text-secondary-foreground border-border">
                  {SHOT_TYPE_LABELS[frame.shotType]}
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-mono bg-secondary text-secondary-foreground border-border">
                  {CAMERA_ANGLE_LABELS[frame.cameraAngle]}
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-mono bg-secondary text-secondary-foreground border-border">
                  {CAMERA_MOVEMENT_LABELS[frame.cameraMovement]}
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-mono bg-primary/20 text-primary border-primary/30">
                  {MOOD_LABELS[frame.mood]}
                </Badge>
              </div>
            </div>
          </TabsContent>

          {/* NARRATIVE TAB */}
          <TabsContent value="narrative" className="p-4">
            <TabHint text="Write the story content for this scene. What happens, who speaks, where it takes place, and any physical actions." />
            <div className="grid gap-4">
              <FieldGroup
                label="Scene Description"
                icon={Clapperboard}
                hint="Describe what the audience sees and what happens in this moment"
              >
                <Textarea
                  value={frame.description}
                  onChange={(e) => update({ description: e.target.value })}
                  placeholder="e.g. A dimly lit kitchen. Sarah enters through the back door, shaking rain off her coat..."
                  rows={4}
                  className="text-xs bg-secondary border-border text-foreground resize-none placeholder:text-muted-foreground/50"
                />
              </FieldGroup>

              <FieldGroup
                label="Dialogue"
                icon={MessageSquare}
                hint="Write character dialogue in screenplay format"
              >
                <Textarea
                  value={frame.dialogue}
                  onChange={(e) => update({ dialogue: e.target.value })}
                  placeholder={'e.g. SARAH: "I thought you\'d already left."'}
                  rows={3}
                  className="text-xs bg-secondary border-border text-foreground resize-none font-mono placeholder:text-muted-foreground/50"
                />
              </FieldGroup>

              <FieldGroup
                label="Action Notes"
                icon={Zap}
                hint="Blocking, choreography, physical movements that need to be planned"
              >
                <Textarea
                  value={frame.actionNotes}
                  onChange={(e) => update({ actionNotes: e.target.value })}
                  placeholder="e.g. Sarah crosses to the table, pauses, then turns slowly toward the camera..."
                  rows={3}
                  className="text-xs bg-secondary border-border text-foreground resize-none placeholder:text-muted-foreground/50"
                />
              </FieldGroup>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup
                  label="Location"
                  icon={MapPin}
                  hint="Use screenplay format: INT/EXT. PLACE - TIME"
                >
                  <Input
                    value={frame.location}
                    onChange={(e) => update({ location: e.target.value })}
                    placeholder="INT. KITCHEN - NIGHT"
                    className="h-8 text-xs bg-secondary border-border text-foreground font-mono placeholder:text-muted-foreground/50"
                  />
                </FieldGroup>

                <FieldGroup
                  label="Characters"
                  icon={Users}
                  hint="Who appears in this scene"
                >
                  <Input
                    value={frame.characters}
                    onChange={(e) => update({ characters: e.target.value })}
                    placeholder="Sarah, Marcus"
                    className="h-8 text-xs bg-secondary border-border text-foreground placeholder:text-muted-foreground/50"
                  />
                </FieldGroup>
              </div>
            </div>
          </TabsContent>

          {/* SKETCH TAB */}
          <TabsContent value="sketch" className="p-4">
            <TabHint text="Draw a rough composition sketch for this frame. Use the pen tool to sketch, pick colors, adjust brush size, or erase. Your sketch will appear in the timeline thumbnail and in exports." />
            <SketchPad
              dataUrl={frame.sketchDataUrl}
              onChange={(url) => update({ sketchDataUrl: url })}
            />
          </TabsContent>

          {/* TECHNICAL TAB */}
          <TabsContent value="technical" className="p-4">
            <TabHint text="Set timing and sound details for this scene. The summary card at the bottom shows all your current settings at a glance." />
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <FieldGroup
                  label="Duration"
                  icon={Clock}
                  hint="Estimated time this scene occupies on screen"
                >
                  <Input
                    value={frame.duration}
                    onChange={(e) => update({ duration: e.target.value })}
                    placeholder="5s"
                    className="h-8 text-xs bg-secondary border-border text-foreground font-mono placeholder:text-muted-foreground/50"
                  />
                </FieldGroup>

                <FieldGroup
                  label="Transition Out"
                  icon={Zap}
                  hint="How this scene ends and the next begins"
                >
                  <Select
                    value={frame.transition}
                    onValueChange={(v) => update({ transition: v as Transition })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(TRANSITION_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-xs text-popover-foreground">
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>

              <FieldGroup
                label="Sound / Music Notes"
                icon={Music}
                hint="Describe ambient sound, music cues, and audio design for this scene"
              >
                <Textarea
                  value={frame.soundNotes}
                  onChange={(e) => update({ soundNotes: e.target.value })}
                  placeholder="e.g. Rain on windows, distant thunder. Soft piano begins at the end of Sarah's line..."
                  rows={3}
                  className="text-xs bg-secondary border-border text-foreground resize-none placeholder:text-muted-foreground/50"
                />
              </FieldGroup>

              {/* Visual summary card */}
              <div className="rounded-lg border border-border bg-background/50 p-3">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Frame Summary
                </h4>
                <div className="grid grid-cols-2 gap-y-1.5 text-[11px]">
                  <span className="text-muted-foreground">Shot</span>
                  <span className="text-foreground font-medium">
                    {SHOT_TYPE_LABELS[frame.shotType]}
                  </span>
                  <span className="text-muted-foreground">Angle</span>
                  <span className="text-foreground font-medium">
                    {CAMERA_ANGLE_LABELS[frame.cameraAngle]}
                  </span>
                  <span className="text-muted-foreground">Movement</span>
                  <span className="text-foreground font-medium">
                    {CAMERA_MOVEMENT_LABELS[frame.cameraMovement]}
                  </span>
                  <span className="text-muted-foreground">Mood</span>
                  <span className="text-foreground font-medium">
                    {MOOD_LABELS[frame.mood]}
                  </span>
                  <span className="text-muted-foreground">Pacing</span>
                  <span className="text-foreground font-medium">
                    {PACING_LABELS[frame.pacing]}
                  </span>
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground font-medium">
                    {frame.duration || "Not set"}
                  </span>
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground font-medium">
                    {frame.location || "Not set"}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  )
}
