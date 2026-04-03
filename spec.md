# Women Farmer Newsletter Editor

## Current State
Project has a Soil Health Management App backend and basic frontend.

## Requested Changes (Diff)

### Add
- Canva-style editable newsletter page for women farmer success story
- Infographic layout similar to uploaded images (dark banner title, photo area, stat boxes, checklist, footer)
- Editable text fields for: farmer name, crop, all stats, support points, taglines
- Color theme editor (background, accent colors)
- Upload photo option for farmer image
- Download as PNG/PDF button
- Live preview that reflects edits instantly

### Modify
- App landing page now shows the newsletter editor

### Remove
- Nothing removed

## Implementation Plan
1. Build a full-page newsletter editor component
2. Left panel: editable fields (name, crop, stats, checklist items, tagline)
3. Right panel: live preview of the infographic in the style of uploaded images
4. Inline editing on preview (click to edit)
5. Download button using html2canvas or browser print
6. Pre-populated with women farmer sample data
