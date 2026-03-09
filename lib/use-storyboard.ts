"use client"

import { useCallback, useState } from "react"
import type { SceneFrame, ProjectMeta } from "./storyboard-types"
import { createDefaultFrame } from "./storyboard-types"

export function useStoryboard(initialProject?: ProjectMeta) {
  const [frames, setFrames] = useState<SceneFrame[]>([
    createDefaultFrame(1),
    createDefaultFrame(2),
    createDefaultFrame(3),
  ])
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(
    null
  )
  const [project, setProject] = useState<ProjectMeta>(
    initialProject ?? {
      title: "",
      director: "",
      genre: "",
      logline: "",
      targetDuration: "",
    }
  )

  const selectedFrame = frames.find((f) => f.id === selectedFrameId) ?? null

  const addFrame = useCallback(() => {
    setFrames((prev) => {
      const newFrame = createDefaultFrame(prev.length + 1)
      return [...prev, newFrame]
    })
  }, [])

  const duplicateFrame = useCallback((id: string) => {
    setFrames((prev) => {
      const source = prev.find((f) => f.id === id)
      if (!source) return prev
      const duplicate: SceneFrame = {
        ...source,
        id: crypto.randomUUID(),
        sceneNumber: prev.length + 1,
        title: `${source.title} (copy)`,
      }
      const idx = prev.findIndex((f) => f.id === id)
      const updated = [...prev]
      updated.splice(idx + 1, 0, duplicate)
      return updated.map((f, i) => ({ ...f, sceneNumber: i + 1 }))
    })
  }, [])

  const removeFrame = useCallback(
    (id: string) => {
      setFrames((prev) => {
        if (prev.length <= 1) return prev
        const filtered = prev.filter((f) => f.id !== id)
        return filtered.map((f, i) => ({ ...f, sceneNumber: i + 1 }))
      })
      if (selectedFrameId === id) setSelectedFrameId(null)
    },
    [selectedFrameId]
  )

  const updateFrame = useCallback(
    (id: string, updates: Partial<SceneFrame>) => {
      setFrames((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
      )
    },
    []
  )

  const reorderFrames = useCallback(
    (fromIndex: number, toIndex: number) => {
      setFrames((prev) => {
        const updated = [...prev]
        const [moved] = updated.splice(fromIndex, 1)
        updated.splice(toIndex, 0, moved)
        return updated.map((f, i) => ({ ...f, sceneNumber: i + 1 }))
      })
    },
    []
  )

  const updateProject = useCallback(
    (updates: Partial<ProjectMeta>) => {
      setProject((prev) => ({ ...prev, ...updates }))
    },
    []
  )

  return {
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
  }
}
