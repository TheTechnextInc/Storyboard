"use client"

import { useState } from "react"
import { Header } from "@/components/storyboard/header"
import { Timeline } from "@/components/storyboard/timeline"
import { SceneEditor } from "@/components/storyboard/scene-editor"
import { FramePreview } from "@/components/storyboard/frame-preview"
import { ExportDialog } from "@/components/storyboard/export-dialog"
import { GuideSidebar } from "@/components/storyboard/guide-sidebar"
import { useStoryboard } from "@/lib/use-storyboard"
import type { ProjectMeta } from "@/lib/storyboard-types"

interface WorkspaceProps {
  initialProject: ProjectMeta
}

export function StoryboardWorkspace({ initialProject }: WorkspaceProps) {
  const {
    frames,
    selectedFrame,
    selectedFrameId,
    setSelectedFrameId,
    addFrame,
    duplicateFrame,
    removeFrame,
    updateFrame,
    reorderFrames,
    project,
    updateProject,
  } = useStoryboard(initialProject)

  const [exportOpen, setExportOpen] = useState(false)
  const [showGuide, setShowGuide] = useState(true)

  return (
    <div className="flex h-dvh flex-col bg-background overflow-hidden">
      <Header
        project={project}
        onUpdateProject={updateProject}
        onAddFrame={addFrame}
        onExport={() => setExportOpen(true)}
        frameCount={frames.length}
        showGuide={showGuide}
        onToggleGuide={() => setShowGuide((p) => !p)}
      />

      {/* Main workspace */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Guide sidebar */}
        {showGuide && (
          <GuideSidebar
            hasSelection={!!selectedFrame}
            onClose={() => setShowGuide(false)}
          />
        )}

        {/* Editor panel */}
        <div className="flex-1 min-h-0 overflow-auto">
          {selectedFrame ? (
            <SceneEditor frame={selectedFrame} onUpdate={updateFrame} />
          ) : (
            <EmptyEditor onSelectFirst={() => {
              if (frames.length > 0) setSelectedFrameId(frames[0].id)
            }} />
          )}
        </div>

        {/* Preview panel - hidden on small screens */}
        {selectedFrame && (
          <div className="hidden lg:flex w-[380px] flex-col overflow-hidden border-l border-border bg-card">
            <FramePreview frame={selectedFrame} />
          </div>
        )}
      </div>

      {/* Timeline */}
      <Timeline
        frames={frames}
        selectedFrameId={selectedFrameId}
        onSelect={setSelectedFrameId}
        onReorder={reorderFrames}
        onDuplicate={duplicateFrame}
        onRemove={removeFrame}
        onAdd={addFrame}
      />

      {/* Export dialog */}
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        project={project}
        frames={frames}
      />
    </div>
  )
}

function EmptyEditor({ onSelectFirst }: { onSelectFirst: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex flex-col items-center gap-3 max-w-xs">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-border">
          <span className="text-2xl text-muted-foreground">1</span>
        </div>
        <h3 className="text-base font-semibold text-foreground">
          Click a frame to start editing
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your storyboard starts with 3 blank frames in the timeline below.
          Click any frame to open it in the editor, where you can set the shot
          type, camera angle, mood, write dialogue, and sketch your composition.
        </p>
        <button
          onClick={onSelectFirst}
          className="mt-2 text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          Open Scene 1
        </button>
      </div>

      {/* Mini guide */}
      <div className="mt-6 grid gap-3 max-w-sm w-full text-left">
        <StepHint number={1} text="Click a frame in the timeline below" />
        <StepHint number={2} text="Fill in visual details like shot type and camera angle" />
        <StepHint number={3} text="Add narrative: description, dialogue, and action notes" />
        <StepHint number={4} text="Sketch a rough composition for your crew" />
        <StepHint number={5} text="Export when done for production planning" />
      </div>
    </div>
  )
}

function StepHint({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold font-mono text-primary">
        {number}
      </span>
      <span className="text-xs text-muted-foreground">{text}</span>
    </div>
  )
}
