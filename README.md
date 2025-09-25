# TL UI Visualizer — Enhanced Compatibility

This version improves compatibility with Throne and Liberty `.azj` UI layout files across different resolutions, UI scales, and player configurations.

## What’s new

- Dynamic resolution and scale support
  - Automatically reads `systemResolution`, `gameResolution`, and `viewportScale` from the imported `.azj` (JSON).
  - Renders consistently across 1080p, 1440p, ultrawide, and arbitrary UI scales (e.g., 0.75, 1.0, 1.1).
- Multilingual component names
  - English (EN), Korean (KO), French (FR) via `components-database.json`.
  - Language switcher in the header.
- Enhanced visualization and UX
  - Category-based colors with a legend.
  - Filters to show/hide unknown components, hidden/inactive items, and variant overlays.
  - Tooltips with ID, base component, category, and translations.
  - Status panel showing counts and resolution/scale metadata.
- Robust parsing and error handling
  - Validates `.azj` JSON structure with helpful errors.
  - Unknown IDs render using a safe fallback and neutral color (no crashes).
  - Variant mapping supported and toggled via UI.

## Usage

1. Open `index.html` in a modern browser (no build step required).
2. Click the file picker and load a `.azj` JSON file.
3. Use the language picker (EN / 한국어 / FR) to adjust labels.
4. Adjust filters to show/hide unknowns, variants, and hidden items.

Tip: The app attempts to adapt to multiple input shapes. If your `.azj` uses different keys for component geometry, the parser tries common alternatives.

## Files

- `components-database.json`
  - Extensible database of component metadata: names, categories, and variants.
  - Add missing entries as needed; unknown items are still rendered safely.
- `utils.js`
  - Database loading and lookup helpers.
  - `.azj` parsing and dynamic viewport transform.
- `index.html`
  - UI, canvas rendering (SVG), filters, legend, status, and tooltips.

## Extending the component database

Add or edit entries in `components-database.json`. Example:

```json
{ "id": 123, "key": "example", "name_en": "Example", "name_ko": "예시", "name_fr": "Exemple", "category": "General" }
```

- Set `variantsOf` for variants:
```json
{ "id": 10123, "variantsOf": 123, "name_en": "Example Variant", "category": "General" }
```

If `variantsOf` is omitted, the visualizer will also try a generic rule (`id >= 10000` → base `id - 10000`) when the base exists.

## Troubleshooting

- “Failed to load component database”
  - Ensure `components-database.json` is present next to `index.html` and served with correct MIME type.
- “No UI components found”
  - Your `.azj` schema may differ. The parser checks `components`, `items`, `ui`, `nodes`, and `layout.components`. Update `parseAzj` if needed.
- Misplaced elements at unusual scales
  - Check `viewportScale` in your file. The visualizer scales the canvas using this value.

## License

MIT