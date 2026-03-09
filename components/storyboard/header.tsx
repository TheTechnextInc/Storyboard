"use client"

import { Film, Download, Plus, Settings2, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectMeta } from "@/lib/storyboard-types"

interface HeaderProps {
  project: ProjectMeta
  onUpdateProject: (updates: Partial<ProjectMeta>) => void
  onAddFrame: () => void
  onExport: () => void
  frameCount: number
  showGuide: boolean
  onToggleGuide: () => void
}

export function Header({
  project,
  onUpdateProject,
  onAddFrame,
  onExport,
  frameCount,
  showGuide,
  onToggleGuide,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-2.5 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Film className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold tracking-tight text-foreground leading-none">
              FrameForge
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
              Storyboard Studio
            </p>
          </div>
        </div>

        <div className="hidden md:block h-5 w-px bg-border" />

        <div className="hidden md:block">
          <p className="text-sm font-medium text-foreground truncate max-w-[200px] lg:max-w-[300px]">
            {project.title || "Untitled Project"}
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            {frameCount} {frameCount === 1 ? "frame" : "frames"}
            {project.genre ? ` / ${project.genre}` : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 text-xs ${showGuide ? "text-primary" : "text-muted-foreground"} hover:text-foreground`}
          onClick={onToggleGuide}
          aria-label="Toggle guide panel"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Guide</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Project Details</DialogTitle>
            </DialogHeader>
            <p className="text-xs text-muted-foreground -mt-2">
              Update your film details. These appear in all exports.
            </p>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label htmlFor="project-title" className="text-xs text-muted-foreground">Title</Label>
                <Input
                  id="project-title"
                  value={project.title}
                  onChange={(e) => onUpdateProject({ title: e.target.value })}
                  placeholder="My Short Film"
                  className="bg-secondary border-border text-foreground"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="project-director" className="text-xs text-muted-foreground">Director</Label>
                <Input
                  id="project-director"
                  value={project.director}
                  onChange={(e) => onUpdateProject({ director: e.target.value })}
                  placeholder="Jane Doe"
                  className="bg-secondary border-border text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="project-genre" className="text-xs text-muted-foreground">Genre</Label>
                  <Input
                    id="project-genre"
                    value={project.genre}
                    onChange={(e) => onUpdateProject({ genre: e.target.value })}
                    placeholder="Drama"
                    className="bg-secondary border-border text-foreground"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="project-duration" className="text-xs text-muted-foreground">Target Duration</Label>
                  <Input
                    id="project-duration"
                    value={project.targetDuration}
                    onChange={(e) =>
                      onUpdateProject({ targetDuration: e.target.value })
                    }
                    placeholder="15 min"
                    className="bg-secondary border-border text-foreground"
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="project-logline" className="text-xs text-muted-foreground">Logline</Label>
                <Textarea
                  id="project-logline"
                  value={project.logline}
                  onChange={(e) => onUpdateProject({ logline: e.target.value })}
                  placeholder="A brief summary of your story..."
                  rows={3}
                  className="bg-secondary border-border text-foreground resize-none"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          onClick={onAddFrame}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Frame</span>
        </Button>

        <Button
          size="sm"
          className="gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </header>
  )
}
