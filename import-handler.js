// import-handler.js — branche les inputs de fichier et fournit un message clair

import { parseAzj, loadDatabase } from "./utils.js";

(async () => {
  try { await loadDatabase().catch(() => {}); } catch {}

  // On essaie d’attraper un input#file sinon le premier input[type=file]
  const input =
    document.querySelector("#file") ||
    document.querySelector('input[type="file"]');

  if (!input) return; // pas d’input détecté (UI custom), on ne fait rien

  // Accepter .json et .azj
  if (!input.accept) input.setAttribute("accept", ".json,.azj");

  input.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseAzj(text);

      // Emet un événement global que l’UI enhanced peut écouter si besoin
      window.dispatchEvent(
        new CustomEvent("azj:loaded", {
          detail: { name: file.name, ...parsed },
        })
      );

      // Optionnel: petit feedback utilisateur
      console.info(`Loaded: ${file.name} (${parsed.components.length} components)`);
    } catch (err) {
      alert(
        `${file.name}\n\n${err?.message || err}\n\n` +
        "Si votre fichier est un .azj binaire du jeu, convertissez-le d'abord en JSON (voir README > Conversion .azj)."
      );
      console.error(err);
    }
  });
})();