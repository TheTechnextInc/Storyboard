import type { SceneFrame, ProjectMeta } from "./storyboard-types"
import {
  SHOT_TYPE_LABELS,
  CAMERA_ANGLE_LABELS,
  CAMERA_MOVEMENT_LABELS,
  TRANSITION_LABELS,
  MOOD_LABELS,
  PACING_LABELS,
  TIME_OF_DAY_LABELS,
} from "./storyboard-types"

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export function exportAsJSON(project: ProjectMeta, frames: SceneFrame[]) {
  const data = {
    project,
    frames: frames.map(({ id, ...rest }) => rest),
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  })
  downloadBlob(blob, `${project.title || "storyboard"}.json`)
}

export function exportAsCSV(project: ProjectMeta, frames: SceneFrame[]) {
  const headers = [
    "Scene",
    "Title",
    "Description",
    "Shot Type",
    "Camera Angle",
    "Camera Movement",
    "Transition",
    "Mood",
    "Pacing",
    "Time of Day",
    "Location",
    "Characters",
    "Duration",
    "Dialogue",
    "Action Notes",
    "Sound Notes",
  ]

  const rows = frames.map((f) => [
    f.sceneNumber,
    f.title,
    f.description,
    SHOT_TYPE_LABELS[f.shotType],
    CAMERA_ANGLE_LABELS[f.cameraAngle],
    CAMERA_MOVEMENT_LABELS[f.cameraMovement],
    TRANSITION_LABELS[f.transition],
    MOOD_LABELS[f.mood],
    PACING_LABELS[f.pacing],
    TIME_OF_DAY_LABELS[f.timeOfDay],
    f.location,
    f.characters,
    f.duration,
    f.dialogue,
    f.actionNotes,
    f.soundNotes,
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  downloadBlob(blob, `${project.title || "storyboard"}.csv`)
}

export function exportAsHTML(project: ProjectMeta, frames: SceneFrame[]) {
  const framesHtml = frames
    .map(
      (f) => `
    <div class="frame">
      <div class="frame-header" style="border-left: 4px solid ${f.color};">
        <span class="scene-num">${f.sceneNumber}</span>
        <h3>${escapeHtml(f.title)}</h3>
        <span class="duration">${escapeHtml(f.duration)}</span>
      </div>
      ${
        f.sketchDataUrl
          ? `<div class="sketch"><img src="${f.sketchDataUrl}" alt="Scene sketch" /></div>`
          : ""
      }
      <div class="frame-body">
        <div class="meta-grid">
          <div><strong>Shot:</strong> ${SHOT_TYPE_LABELS[f.shotType]}</div>
          <div><strong>Angle:</strong> ${CAMERA_ANGLE_LABELS[f.cameraAngle]}</div>
          <div><strong>Movement:</strong> ${CAMERA_MOVEMENT_LABELS[f.cameraMovement]}</div>
          <div><strong>Transition:</strong> ${TRANSITION_LABELS[f.transition]}</div>
          <div><strong>Mood:</strong> ${MOOD_LABELS[f.mood]}</div>
          <div><strong>Pacing:</strong> ${PACING_LABELS[f.pacing]}</div>
          <div><strong>Time:</strong> ${TIME_OF_DAY_LABELS[f.timeOfDay]}</div>
          ${f.location ? `<div><strong>Location:</strong> ${escapeHtml(f.location)}</div>` : ""}
          ${f.characters ? `<div><strong>Characters:</strong> ${escapeHtml(f.characters)}</div>` : ""}
        </div>
        ${f.description ? `<div class="section"><h4>Description</h4><p>${escapeHtml(f.description)}</p></div>` : ""}
        ${f.dialogue ? `<div class="section"><h4>Dialogue</h4><p class="dialogue">${escapeHtml(f.dialogue)}</p></div>` : ""}
        ${f.actionNotes ? `<div class="section"><h4>Action Notes</h4><p>${escapeHtml(f.actionNotes)}</p></div>` : ""}
        ${f.soundNotes ? `<div class="section"><h4>Sound Notes</h4><p>${escapeHtml(f.soundNotes)}</p></div>` : ""}
      </div>
    </div>`
    )
    .join("\n")

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(project.title || "Storyboard")} - Storyboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #0f0f1a; color: #e8dcc8; padding: 2rem; }
    .header { margin-bottom: 2rem; border-bottom: 1px solid #2a2a3e; padding-bottom: 1rem; }
    .header h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
    .header p { font-size: 0.875rem; color: #8a8a9a; }
    .header .meta { display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.75rem; color: #6a6a7a; }
    .frames { display: grid; gap: 1.5rem; }
    .frame { border: 1px solid #2a2a3e; border-radius: 0.5rem; overflow: hidden; background: #1a1a2e; }
    .frame-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-bottom: 1px solid #2a2a3e; }
    .scene-num { background: #c4a35a; color: #0f0f1a; font-weight: 700; font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }
    .frame-header h3 { flex: 1; font-size: 0.875rem; }
    .duration { font-size: 0.75rem; color: #c4a35a; font-family: monospace; }
    .sketch { background: #0f0f1a; padding: 0.5rem; }
    .sketch img { width: 100%; max-height: 200px; object-fit: contain; }
    .frame-body { padding: 1rem; }
    .meta-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem; font-size: 0.75rem; margin-bottom: 0.75rem; }
    .meta-grid strong { color: #8a8a9a; }
    .section { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #2a2a3e; }
    .section h4 { font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6a6a7a; margin-bottom: 0.25rem; }
    .section p { font-size: 0.8125rem; line-height: 1.5; }
    .dialogue { font-family: monospace; font-style: italic; }
    @media print { body { background: white; color: #1a1a2e; } .frame { border-color: #ccc; background: #fafafa; } .section { border-top-color: #eee; } .header { border-bottom-color: #eee; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(project.title || "Untitled Storyboard")}</h1>
    ${project.logline ? `<p>${escapeHtml(project.logline)}</p>` : ""}
    <div class="meta">
      ${project.director ? `<span>Director: ${escapeHtml(project.director)}</span>` : ""}
      ${project.genre ? `<span>Genre: ${escapeHtml(project.genre)}</span>` : ""}
      ${project.targetDuration ? `<span>Duration: ${escapeHtml(project.targetDuration)}</span>` : ""}
      <span>${frames.length} frames</span>
    </div>
  </div>
  <div class="frames">
    ${framesHtml}
  </div>
</body>
</html>`

  const blob = new Blob([html], { type: "text/html" })
  downloadBlob(blob, `${project.title || "storyboard"}.html`)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
