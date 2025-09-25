const components = {
  1: "MAIN_MENU",
  3: "TOGGLE_CHAT_BUTTON",
  101: "CURRENCY",
  102: "PC_INFO",
  103: "TEAM_INTERFACE",
  106: "TARGET_BOSS",
  108: "MINIMAP",
  113: "NOTIFICATION_VIEWER",
  114: "TARGET_SCAN_VIEW", // Visão astral
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
  157: "ABILITY_INDICATOR_BAR", // Cast bar
  158: "RESISTANCE_INDICATOR", // nivel máximo de voo / corrida
  159: "BUFF_DEBUFF_SLOT_PANEL",
  160: "ACTION_MODE",
  161: "DIMENSION_CONTRACT_TOKEN_1",
  162: "EMOTION_EXPRESSION",
  164: "FISHING_BUTTON",
  165: "AMITOI_ICON",
  166: "DIMENSION_CONTRACT_TOKEN_2"
};

export const scales = {
  "TIER_1": 0.75,
  "TIER_2": 0.80000001192092896,
  "TIER_3": 0.85000002384185791,
  "TIER_4": 0.89999997615814209,
  "TIER_5": 1,
  "TIER_6": 1.1000000238418579,
  "TIER_7": 1.1599999666213989,
  "TIER_8": 1.2300000190734863,
}

export const getNameById = (id) => {
  return components[id] ?? "missing: " + id;
};

export const getCorrectedAlignment = (alignment, translation) => {
  const { x, y } = translation;
  
  const alignments = {
    RightBottom: { left: `calc(100% + ${x}px)`, top: `calc(100% + ${y}px)` },
    LeftBottom: { left: `calc(0% + ${x}px)`, top: `calc(100% + ${y}px)` },
    CenterTop: { left: `calc(50% + ${x}px)`, top: `calc(0% + ${y}px)` },
    LeftCenter: { left: `calc(0% + ${x}px)`, top: `calc(50% + ${y}px)` },
    RightCenter: { left: `calc(100% + ${x}px)`, top: `calc(50% + ${y}px)` },
    CenterBottom: { left: `calc(50% + ${x}px)`, top: `calc(100% + ${y}px)` },
    LeftTop: { left: `calc(0% + ${x}px)`, top: `calc(0% + ${y}px)` },
    RightTop: { left: `calc(100% + ${x}px)`, top: `calc(0% + ${y}px)` },
    CenterCenter: {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
    },
  };
  return alignments[alignment] ?? "missing: " + alignment;
};