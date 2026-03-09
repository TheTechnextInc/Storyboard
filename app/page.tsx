"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/storyboard/welcome-screen"
import { StoryboardWorkspace } from "@/components/storyboard/workspace"
import type { ProjectMeta } from "@/lib/storyboard-types"

export default function StoryboardPage() {
  const [started, setStarted] = useState(false)
  const [project, setProject] = useState<ProjectMeta>({
    title: "",
    director: "",
    genre: "",
    logline: "",
    targetDuration: "",
  })

  if (!started) {
    return (
      <WelcomeScreen
        project={project}
        onUpdateProject={(updates) => setProject((p) => ({ ...p, ...updates }))}
        onStart={() => setStarted(true)}
      />
    )
  }

  return <StoryboardWorkspace initialProject={project} />
}
