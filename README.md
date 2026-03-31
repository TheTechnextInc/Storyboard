# FrameForge - Storyboard Generator for Short Films

A comprehensive storyboard generator designed for filmmakers and writers to visualize their short film concepts. Built with Next.js, React, and Tailwind CSS.

## Features

- **Scene Management** - Create, edit, duplicate, and delete scenes with drag-and-drop reordering
- **Visual Settings** - Configure shot types, camera angles, movements, and transitions
- **Narrative Elements** - Add dialogue, action descriptions, and sound/music notes
- **Built-in Sketch Pad** - Draw rough compositions directly in the browser with pen/eraser tools
- **Mood & Pacing** - Set emotional tone, time of day, and scene pacing
- **Timeline View** - Visual timeline strip showing all frames with transition indicators
- **Export Options** - Export to HTML (print-ready), JSON (data), or CSV (spreadsheet)
- **Guide System** - Built-in help sidebar explaining each feature

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm

### Installation

1. Clone or download this project

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main entry point
│   ├── layout.tsx            # Root layout with fonts/metadata
│   └── globals.css           # Theme and global styles
├── components/
│   └── storyboard/
│       ├── welcome-screen.tsx   # Landing page with project setup
│       ├── workspace.tsx        # Main workspace layout
│       ├── header.tsx           # Top bar with project info/actions
│       ├── timeline.tsx         # Bottom timeline strip
│       ├── scene-editor.tsx     # Tabbed editor for scene details
│       ├── sketch-pad.tsx       # Drawing canvas component
│       ├── frame-preview.tsx    # Visual preview of selected frame
│       ├── guide-sidebar.tsx    # Help panel
│       └── export-dialog.tsx    # Export options modal
├── lib/
│   ├── storyboard-types.ts   # TypeScript types and constants
│   ├── use-storyboard.ts     # Main state management hook
│   └── export-storyboard.ts  # Export utility functions
```

## How to Use

### 1. Create a New Project
Enter your film title on the welcome screen and click "Start Creating"

### 2. Add Scenes
Click the "+" button in the timeline to add new frames. Each frame represents one shot or scene.

### 3. Edit Scene Details
Click a frame in the timeline to select it, then use the tabbed editor:
- **Visual** - Shot type, camera angle, movement, transition
- **Narrative** - Location, characters, action, dialogue
- **Sketch** - Draw a rough composition
- **Technical** - Mood, pacing, time of day, notes

### 4. Reorder Scenes
Drag frames in the timeline to reorder your storyboard sequence.

### 5. Export
Click the Export button to download your storyboard as:
- **HTML** - Formatted document for printing
- **JSON** - Raw data for other tools
- **CSV** - Spreadsheet format

## Keyboard Shortcuts

- Click timeline frames to select
- Drag timeline frames to reorder

## Technologies

- **Next.js 15** - React framework
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## License

MIT
