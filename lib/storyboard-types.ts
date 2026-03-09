export type ShotType =
  | "wide"
  | "medium"
  | "close-up"
  | "extreme-close-up"
  | "over-the-shoulder"
  | "pov"
  | "aerial"
  | "establishing"
  | "two-shot"
  | "insert"

export type CameraAngle =
  | "eye-level"
  | "low-angle"
  | "high-angle"
  | "dutch-angle"
  | "birds-eye"
  | "worms-eye"

export type CameraMovement =
  | "static"
  | "pan-left"
  | "pan-right"
  | "tilt-up"
  | "tilt-down"
  | "dolly-in"
  | "dolly-out"
  | "tracking"
  | "crane"
  | "handheld"
  | "steadicam"
  | "zoom-in"
  | "zoom-out"

export type Transition =
  | "cut"
  | "dissolve"
  | "fade-in"
  | "fade-out"
  | "wipe"
  | "match-cut"
  | "jump-cut"
  | "cross-dissolve"
  | "iris"
  | "smash-cut"
  | "j-cut"
  | "l-cut"

export type Mood =
  | "tense"
  | "joyful"
  | "melancholic"
  | "mysterious"
  | "romantic"
  | "eerie"
  | "hopeful"
  | "chaotic"
  | "serene"
  | "dramatic"
  | "comedic"
  | "nostalgic"

export type Pacing = "slow" | "moderate" | "fast" | "building" | "climactic"

export type TimeOfDay =
  | "dawn"
  | "morning"
  | "midday"
  | "afternoon"
  | "golden-hour"
  | "dusk"
  | "night"

export interface SceneFrame {
  id: string
  sceneNumber: number
  title: string
  description: string
  dialogue: string
  actionNotes: string
  shotType: ShotType
  cameraAngle: CameraAngle
  cameraMovement: CameraMovement
  transition: Transition
  mood: Mood
  pacing: Pacing
  timeOfDay: TimeOfDay
  location: string
  characters: string
  duration: string
  soundNotes: string
  sketchDataUrl: string | null
  color: string
}

export interface ProjectMeta {
  title: string
  director: string
  genre: string
  logline: string
  targetDuration: string
}

export const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  wide: "Wide Shot",
  medium: "Medium Shot",
  "close-up": "Close-Up",
  "extreme-close-up": "Extreme Close-Up",
  "over-the-shoulder": "Over the Shoulder",
  pov: "POV",
  aerial: "Aerial",
  establishing: "Establishing",
  "two-shot": "Two Shot",
  insert: "Insert",
}

export const CAMERA_ANGLE_LABELS: Record<CameraAngle, string> = {
  "eye-level": "Eye Level",
  "low-angle": "Low Angle",
  "high-angle": "High Angle",
  "dutch-angle": "Dutch Angle",
  "birds-eye": "Bird's Eye",
  "worms-eye": "Worm's Eye",
}

export const CAMERA_MOVEMENT_LABELS: Record<CameraMovement, string> = {
  static: "Static",
  "pan-left": "Pan Left",
  "pan-right": "Pan Right",
  "tilt-up": "Tilt Up",
  "tilt-down": "Tilt Down",
  "dolly-in": "Dolly In",
  "dolly-out": "Dolly Out",
  tracking: "Tracking",
  crane: "Crane",
  handheld: "Handheld",
  steadicam: "Steadicam",
  "zoom-in": "Zoom In",
  "zoom-out": "Zoom Out",
}

export const TRANSITION_LABELS: Record<Transition, string> = {
  cut: "Cut",
  dissolve: "Dissolve",
  "fade-in": "Fade In",
  "fade-out": "Fade Out",
  wipe: "Wipe",
  "match-cut": "Match Cut",
  "jump-cut": "Jump Cut",
  "cross-dissolve": "Cross Dissolve",
  iris: "Iris",
  "smash-cut": "Smash Cut",
  "j-cut": "J-Cut",
  "l-cut": "L-Cut",
}

export const MOOD_LABELS: Record<Mood, string> = {
  tense: "Tense",
  joyful: "Joyful",
  melancholic: "Melancholic",
  mysterious: "Mysterious",
  romantic: "Romantic",
  eerie: "Eerie",
  hopeful: "Hopeful",
  chaotic: "Chaotic",
  serene: "Serene",
  dramatic: "Dramatic",
  comedic: "Comedic",
  nostalgic: "Nostalgic",
}

export const PACING_LABELS: Record<Pacing, string> = {
  slow: "Slow",
  moderate: "Moderate",
  fast: "Fast",
  building: "Building",
  climactic: "Climactic",
}

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  dawn: "Dawn",
  morning: "Morning",
  midday: "Midday",
  afternoon: "Afternoon",
  "golden-hour": "Golden Hour",
  dusk: "Dusk",
  night: "Night",
}

export const SCENE_COLORS = [
  "#c4a35a",
  "#5a8fc4",
  "#c45a5a",
  "#5ac47a",
  "#c45ac4",
  "#5ac4c4",
  "#c49a5a",
  "#8a5ac4",
]

export function createDefaultFrame(sceneNumber: number): SceneFrame {
  return {
    id: crypto.randomUUID(),
    sceneNumber,
    title: `Scene ${sceneNumber}`,
    description: "",
    dialogue: "",
    actionNotes: "",
    shotType: "wide",
    cameraAngle: "eye-level",
    cameraMovement: "static",
    transition: "cut",
    mood: "dramatic",
    pacing: "moderate",
    timeOfDay: "midday",
    location: "",
    characters: "",
    duration: "5s",
    soundNotes: "",
    sketchDataUrl: null,
    color: SCENE_COLORS[(sceneNumber - 1) % SCENE_COLORS.length],
  }
}
