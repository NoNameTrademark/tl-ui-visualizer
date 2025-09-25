## Importing T&L UI files (.azj)

The in-game .azj file is often binary and cannot be parsed directly as JSON in the browser. The visualizer expects a JSON file.

- If you already have a JSON export of your .azj, import it directly.
- If you select a non-JSON .azj, the UI will show a clear message asking you to convert it first.
- See `parser/test.json` for the expected structure (payload.transforms + reference) used by the demo.

Note: The scripts in `parser/` are examples for working with a JSON export; they are not a binary `.azj` converter.