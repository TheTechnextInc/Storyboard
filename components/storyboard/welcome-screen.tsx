"use client"

import {
  Film,
  Camera,
  Palette,
  Layers,
  Download,
  Pencil,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectMeta } from "@/lib/storyboard-types"

interface WelcomeScreenProps {
  project: ProjectMeta
  onUpdateProject: (updates: Partial<ProjectMeta>) => void
  onStart: () => void
}

const FEATURES = [
  {
    icon: Camera,
    title: "Scene by Scene",
    desc: "Build your film frame by frame. Each scene gets its own card with shot type, camera angle, and movement.",
  },
  {
    icon: Pencil,
    title: "Sketch Your Vision",
    desc: "Draw directly on canvas for each frame. Quick sketches help your crew understand the visual intent.",
  },
  {
    icon: Palette,
    title: "Mood and Pacing",
    desc: "Set the emotional tone and rhythm for each scene. Track mood, pacing, time of day, and transitions.",
  },
  {
    icon: Layers,
    title: "Drag and Drop Timeline",
    desc: "Reorder scenes instantly by dragging them. See your full story arc at a glance in the timeline strip.",
  },
  {
    icon: Film,
    title: "Narrative Details",
    desc: "Add dialogue, action notes, locations, and character info. Everything a production team needs in one place.",
  },
  {
    icon: Download,
    title: "Export for Production",
    desc: "Download your storyboard as a print-ready HTML page, a JSON file, or a CSV spreadsheet.",
  },
]

export function WelcomeScreen({
  project,
  onUpdateProject,
  onStart,
}: WelcomeScreenProps) {
  return (
    <div className="min-h-dvh bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Film className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
              FrameForge
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-primary">
              Storyboard Generator
            </p>
          </div>
        </div>

        <p className="mt-4 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
          Plan your short film visually. Create scenes, sketch compositions,
          define camera work, and export a production-ready storyboard -- all
          in one place.
        </p>

        {/* How it works */}
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground text-center mb-6">
            How it works
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick start form */}
        <div className="mt-12 w-full max-w-md rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Start a new project
          </h2>
          <p className="text-xs text-muted-foreground mb-5">
            Give your project a name to get started. You can always change
            these details later.
          </p>

          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="w-title" className="text-xs text-muted-foreground">
                Project Title
              </Label>
              <Input
                id="w-title"
                value={project.title}
                onChange={(e) => onUpdateProject({ title: e.target.value })}
                placeholder="e.g. The Last Light"
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="w-director" className="text-xs text-muted-foreground">
                  Director
                </Label>
                <Input
                  id="w-director"
                  value={project.director}
                  onChange={(e) => onUpdateProject({ director: e.target.value })}
                  placeholder="Your name"
                  className="bg-secondary border-border text-foreground"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="w-genre" className="text-xs text-muted-foreground">
                  Genre
                </Label>
                <Input
                  id="w-genre"
                  value={project.genre}
                  onChange={(e) => onUpdateProject({ genre: e.target.value })}
                  placeholder="Drama, Thriller..."
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="w-logline" className="text-xs text-muted-foreground">
                Logline (optional)
              </Label>
              <Textarea
                id="w-logline"
                value={project.logline}
                onChange={(e) => onUpdateProject({ logline: e.target.value })}
                placeholder="A one-sentence summary of your story..."
                rows={2}
                className="bg-secondary border-border text-foreground resize-none"
              />
            </div>
          </div>

          <Button
            className="w-full mt-5 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            onClick={onStart}
          >
            Create Storyboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 text-center">
        <p className="text-[11px] text-muted-foreground font-mono">
          FrameForge -- a storyboard tool for filmmakers and writers
        </p>
      </footer>
    </div>
  )
}
