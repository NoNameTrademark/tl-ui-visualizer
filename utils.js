// utils.js — Enhanced helpers for TL UI Visualizer

let DB_CACHE = null;

export async function loadDatabase(url = './components-database.json') {
  if (DB_CACHE) return DB_CACHE;
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const db = await res.json();

  // Normalize indices for quick lookup
  const byId = new Map();
  for (const c of db.components || []) {
    if (typeof c.id === 'number') byId.set(c.id, c);
  }
  DB_CACHE = { ...db, byId };
  return DB_CACHE;
}

export function getComponentMeta(db, id) {
  if (!db) return null;
  return db.byId?.get?.(Number(id)) || null;
}

export function isVariant(db, id) {
  const meta = getComponentMeta(db, id);
  if (meta?.variantsOf != null) return true;
  // Generic heuristic: 10k+ IDs may be variants of (id - 10000)
  const n = Number(id);
  if (n >= 10000 && getComponentMeta(db, n - 10000)) return true;
  return false;
}

export function getBaseId(db, id) {
  const meta = getComponentMeta(db, id);
  if (meta?.variantsOf != null) return Number(meta.variantsOf);
  const n = Number(id);
  if (n >= 10000 && getComponentMeta(db, n - 10000)) return n - 10000;
  return Number(id);
}

export function getDisplayName(db, id, lang = 'en') {
  const meta = getComponentMeta(db, id);
  const baseLabel = `Unknown component #${id}`;
  if (!meta) return baseLabel;

  switch (lang) {
    case 'ko': return meta.name_ko || meta.name_en || baseLabel;
    case 'fr': return meta.name_fr || meta.name_en || baseLabel;
    default: return meta.name_en || meta.name_fr || meta.name_ko || baseLabel;
  }
}

export function getCategoryColor(db, category) {
  const color =
    db?.categories?.[category]?.color ||
    db?.categories?.Unknown?.color ||
    '#7a7f8c';
  return color;
}

export function coalesce(...vals) {
  for (const v of vals) {
    if (v !== undefined && v !== null && Number.isFinite(Number(v))) return v;
  }
  return undefined;
}

// Accepts raw JSON text from .azj and returns normalized structure:
// { meta: { system: {w,h}, game: {w,h}, viewportScale: number }, components: [{id,x,y,w,h,hidden?,visible?,enabled?}] }
export function parseAzj(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }

  // Attempt to detect resolution/scaling fields in multiple possible layouts
  const meta = {
    system: null,
    game: null,
    viewportScale: 1.0,
  };

  // Common patterns
  const sysW = coalesce(
    data?.systemResolution?.w, data?.systemResolution?.width,
    data?.SystemResolutionW, data?.systemW, data?.sysW
  );
  const sysH = coalesce(
    data?.systemResolution?.h, data?.systemResolution?.height,
    data?.SystemResolutionH, data?.systemH, data?.sysH
  );
  if (sysW && sysH) meta.system = { w: Number(sysW), h: Number(sysH) };

  const gameW = coalesce(
    data?.gameResolution?.w, data?.gameResolution?.width,
    data?.GameResolutionW, data?.gameW
  );
  const gameH = coalesce(
    data?.gameResolution?.h, data?.gameResolution?.height,
    data?.GameResolutionH, data?.gameH
  );
  if (gameW && gameH) meta.game = { w: Number(gameW), h: Number(gameH) };

  const scale = coalesce(
    data?.viewportScale, data?.uiScale, data?.scale, data?.UIScale
  );
  if (scale) meta.viewportScale = Number(scale);

  // Extract component list; try several common shapes
  let comps = [];
  if (Array.isArray(data?.components)) {
    comps = data.components;
  } else if (Array.isArray(data?.items)) {
    comps = data.items;
  } else if (Array.isArray(data?.ui)) {
    comps = data.ui;
  } else if (Array.isArray(data?.nodes)) {
    comps = data.nodes;
  } else if (data?.layout && Array.isArray(data.layout.components)) {
    comps = data.layout.components;
  }

  // Normalize each component record
  const norm = comps.map((c, i) => {
    const id = Number(coalesce(c.id, c.ID, c.type, c.name, 0));
    const x = Number(coalesce(c.x, c.left, c.posX, c.positionX, 0));
    const y = Number(coalesce(c.y, c.top,  c.posY, c.positionY, 0));
    const w = Number(coalesce(c.w, c.width, c.sizeX, c.sizeW, 120));
    const h = Number(coalesce(c.h, c.height,c.sizeY, c.sizeH, 48));
    const visible = (c.visible !== false) && (c.enabled !== false) && (c.hidden !== true);
    return { id, x, y, w, h, visible, hidden: !visible, raw: c };
  });

  // Basic validation
  if (!norm.length) {
    throw new Error('No UI components found. Unsupported .azj schema or empty file.');
  }

  return { meta, components: norm };
}

// Choose canvas size and transform from meta.
// Returns { scaleX, scaleY, offsetX, offsetY, canvasW, canvasH }
export function computeViewportTransform(meta) {
  const defaultW = 1920, defaultH = 1080;
  const game = meta?.game || { w: defaultW, h: defaultH };
  const system = meta?.system || game;
  const scale = Number(meta?.viewportScale) || 1.0;

  // Use game resolution as base canvas, scaled by viewportScale
  const baseW = Math.round(game.w);
  const baseH = Math.round(game.h);

  const canvasW = Math.max(640, Math.round(baseW * scale));
  const canvasH = Math.max(360, Math.round(baseH * scale));

  const scaleX = canvasW / baseW;
  const scaleY = canvasH / baseH;

  // Centering offset (no letterboxing if same aspect); here we just keep (0,0)
  const offsetX = 0;
  const offsetY = 0;

  return { scaleX, scaleY, offsetX, offsetY, canvasW, canvasH, system, game, viewportScale: scale };
}