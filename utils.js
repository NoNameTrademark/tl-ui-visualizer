// utils.js — back-compat + enhanced parsing helpers

// --- Back-compat: ancien mapping minimal (fallback si DB non chargée) ---
const LEGACY_COMPONENTS = {
  1: "MAIN_MENU",
  3: "TOGGLE_CHAT_BUTTON",
  101: "CURRENCY",
  102: "PC_INFO",
  103: "TEAM_INTERFACE",
  106: "TARGET_BOSS",
  108: "MINIMAP",
  113: "NOTIFICATION_VIEWER",
  114: "TARGET_SCAN_VIEW",
  116: "OBTAIN_MESSAGE",
  119: "FIXED_SLOT",
  120: "SKILL_SLOT",
  123: "EQUIPPED_WEAPON_SHADOWS_STELLA_COMBAT_ASSIST",
  126: "COUNTER_ATTACK",
  128: "AMITOI_DIALOGUE",
  129: "TEAM_LEADER_ASSIST",
  130: "PVP_MESSAGE",
  140: "GROUP_TARGET",
  141: "TARGET_GROUP",
  143: "RETURN_BUTTON",
  144: "INVENTORY_BUTTON",
  145: "EVENT_TIMELINE",
  146: "DRAFTS_BUTTON",
  147: "NOTATION_IN_REAL_TIME",
  148: "SYSTEM_MESSAGE",
  149: "FULL_SCREEN_SYSTEM_MSG",
  150: "WEAPON_SWITCH_BUTTON",
  153: "STELLABOOM",
  155: "AMITOI_HEALING_SKILL",
  156: "ABYSSAL_TOKEN",
  157: "ABILTY_INDICATOR_BAR",
  158: "RESISTANCE_INDICATOR",
  159: "BUFF_DEBUFF_SLOT_PANEL",
  160: "ACTION_MODE",
  161: "DIMENSION_CONTRACT_TOKEN_1",
  162: "EMOTION_EXPRESSION",
  164: "FISHING_BUTTON",
  165: "AMITOI_ICON",
  166: "DIMENSION_CONTRACT_TOKEN_2",
};

// --- Back-compat: ancien export des échelles ---
export const scales = {
  TIER_1: 0.75,
  TIER_2: 0.80000001192092896,
  TIER_3: 0.85000002384185791,
  TIER_4: 0.89999997615814209,
  TIER_5: 1,
  TIER_6: 1.1000000238418579,
  TIER_7: 1.1599999666213989,
  TIER_8: 1.2300000190734863,
};

// --- Base de données des composants (optionnelle) ---
let DB_CACHE = null;
export async function loadDatabase(url = "./components-database.json") {
  if (DB_CACHE) return DB_CACHE;
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const db = await res.json();
  const byId = new Map();
  for (const c of db.components || []) {
    if (typeof c.id === "number") byId.set(c.id, c);
  }
  DB_CACHE = { ...db, byId };
  return DB_CACHE;
}

export function getComponentMeta(db, id) {
  if (!db) return null;
  return db.byId?.get?.(Number(id)) || null;
}

export function getDisplayName(db, id, lang = "en") {
  const meta = getComponentMeta(db, id);
  const base = `Unknown component #${id}`;
  if (!meta) return base;
  switch (lang) {
    case "ko": return meta.name_ko || meta.name_en || base;
    case "fr": return meta.name_fr || meta.name_en || base;
    default: return meta.name_en || meta.name_fr || meta.name_ko || base;
  }
}

export function isVariant(db, id) {
  const meta = getComponentMeta(db, id);
  if (meta?.variantsOf != null) return true;
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

export function getCategoryColor(db, category) {
  const color =
    db?.categories?.[category]?.color ||
    db?.categories?.Unknown?.color ||
    "#7a7f8c";
  return color;
}

export function coalesce(...vals) {
  for (const v of vals) {
    if (v !== undefined && v !== null && Number.isFinite(Number(v))) return v;
  }
  return undefined;
}

// --- Nouvelle fonction: parsing robuste d'un .azj (JSON attendu) ---
export function parseAzj(text) {
  // Détection simple: si ce n'est pas JSON, on remonte une erreur explicite
  const looksJson = /^[\s\r\n\t]*[\[{]/.test(text);
  if (!looksJson) {
    throw new Error(
      "Le fichier sélectionné ne semble pas être un JSON lisible. Convertissez votre .azj du jeu en JSON (voir README > Conversion .azj), puis importez ce JSON."
    );
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid JSON: " + e.message);
  }

  const meta = {
    system: null,
    game: null,
    viewportScale: 1.0,
  };

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

  // Essayer différentes clés possibles pour la liste des composants
  let comps = [];
  if (Array.isArray(data?.components)) {
    comps = data.components;
  } else if (Array.isArray(data?.items)) {
    comps = data.items;
  } else if (Array.isArray(data?.ui)) {
    comps = data.ui;
  } else if (Array.isArray(data?.nodes)) {
    comps = data.nodes;
  } else if (data?.payload?.transforms && Array.isArray(data.payload.transforms)) {
    // Schéma de test présent dans parser/test.json
    comps = data.payload.transforms.map(t => ({
      id: Number(coalesce(t.componentKey, t.id, 0)),
      x: Number(coalesce(t.translate?.x, 0)),
      y: Number(coalesce(t.translate?.y, 0)),
      w: Number(coalesce(t.desiredSize?.width, t.w, 120)),
      h: Number(coalesce(t.desiredSize?.height, t.h, 48)),
      align: t.align,
      raw: t,
    }));
  }

  const norm = comps.map((c) => {
    const id = Number(coalesce(c.id, c.ID, c.type, c.key, 0));
    const x = Number(coalesce(c.x, c.left, c.posX, c.positionX, 0));
    const y = Number(coalesce(c.y, c.top,  c.posY, c.positionY, 0));
    const w = Number(coalesce(c.w, c.width, c.sizeX, c.sizeW, c.desiredSize?.width, 120));
    const h = Number(coalesce(c.h, c.height,c.sizeY, c.sizeH, c.desiredSize?.height, 48));
    const visible = (c.visible !== false) && (c.enabled !== false) && (c.hidden !== true);
    return { id, x, y, w, h, visible, hidden: !visible, raw: c };
  });

  if (!norm.length) {
    throw new Error("No UI components found. Fichier vide ou schéma .azj non pris en charge.");
  }

  return { meta, components: norm };
}

// --- Calcul du viewport/canvas à partir des métadonnées ---
export function computeViewportTransform(meta) {
  const defaultW = 1920, defaultH = 1080;
  const game = meta?.game || { w: defaultW, h: defaultH };
  const scale = Number(meta?.viewportScale) || 1.0;

  const baseW = Math.round(game.w);
  const baseH = Math.round(game.h);

  const canvasW = Math.max(640, Math.round(baseW * scale));
  const canvasH = Math.max(360, Math.round(baseH * scale));

  const scaleX = canvasW / baseW;
  const scaleY = canvasH / baseH;

  return { scaleX, scaleY, offsetX: 0, offsetY: 0, canvasW, canvasH, game, viewportScale: scale };
}

// --- Back-compat: APIs historiques utilisées par l'ancien index.html ---

export const getNameById = (id) => {
  // Essaie DB si chargée, sinon fallback legacy
  if (DB_CACHE) {
    return getDisplayName(DB_CACHE, id, "en") || ("missing: " + id);
  }
  return LEGACY_COMPONENTS[id] ?? "missing: " + id;
};

export const getCorrectedAlignment = (alignment, translation) => {
  const { x = 0, y = 0 } = translation || {};
  const alignments = {
    RightBottom: { left:  `calc((100% + ${x}px)`, top: `calc(100% + ${y}px)` },
    LeftBottom: { right: `calc(50% + ${x}px)`, top: `${y}px` },
    CenterTop: { right: `calc(50% + ${x}px)`, top: `${y}px` },
    LeftCenter: { right:  `calc(0 + ${x}px)`, top: `calc(50% + ${y}px)` },
    CenterBottom: { left: `calc(50% + ${x}px)`, top: `calc(100% + ${y}px)` },
    LeftTop: { right: `calc(0 + ${x}px)`, top: `calc(0 + ${y}px)` },
    RightTop: { left: `calc(100% + ${x}px)`, top: `calc(0 + ${y}px)` },
    CenterCenter: {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
    },
  };
  return alignments[alignment] ?? { left: `${x}px`, top: `${y}px` };
};