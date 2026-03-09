"use client"

import { FileJson, FileSpreadsheet, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { SceneFrame, ProjectMeta } from "@/lib/storyboard-types"
import {
  exportAsJSON,
  exportAsCSV,
  exportAsHTML,
} from "@/lib/export-storyboard"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: ProjectMeta
  frames: SceneFrame[]
}

export function ExportDialog({
  open,
  onOpenChange,
  project,
  frames,
}: ExportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Export Storyboard</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-muted-foreground">
          Choose a format to export your storyboard for production planning.
        </p>
        <div className="grid gap-2 pt-2">
          <Button
            variant="outline"
            className="justify-start gap-3 h-auto py-3 border-border bg-secondary hover:bg-secondary/80 text-foreground"
            onClick={() => {
              exportAsHTML(project, frames)
              onOpenChange(false)
            }}
          >
            <FileText className="h-5 w-5 text-primary" />
            <div className="text-left">
              <span className="text-sm font-medium block">
                HTML Document
              </span>
              <span className="text-[11px] text-muted-foreground">
                Print-ready storyboard with sketches and styling
              </span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="justify-start gap-3 h-auto py-3 border-border bg-secondary hover:bg-secondary/80 text-foreground"
            onClick={() => {
              exportAsJSON(project, frames)
              onOpenChange(false)
            }}
          >
            <FileJson className="h-5 w-5 text-primary" />
            <div className="text-left">
              <span className="text-sm font-medium block">
                JSON Data
              </span>
              <span className="text-[11px] text-muted-foreground">
                Machine-readable format for integrations
              </span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="justify-start gap-3 h-auto py-3 border-border bg-secondary hover:bg-secondary/80 text-foreground"
            onClick={() => {
              exportAsCSV(project, frames)
              onOpenChange(false)
            }}
          >
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <div className="text-left">
              <span className="text-sm font-medium block">
                CSV Spreadsheet
              </span>
              <span className="text-[11px] text-muted-foreground">
                Import into spreadsheets or production tools
              </span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
