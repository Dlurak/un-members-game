import { Score } from "../../types";

export const DEFAULT_BG_COLOR = "#D6D6DA";
export const WARNING_BG_COLOR = "#fbbf24";
export const CORRECT_BG_COLOR = "#34d399";
export const INCORRECT_BG_COLOR = "#ef4444";

export const getBackgroundColor = (score: Score) => {
  if (score.tries >= 5) return INCORRECT_BG_COLOR;
  if (score.tries >= 2 && score.status === "solved") return WARNING_BG_COLOR;
  if (score.status === "solved") return CORRECT_BG_COLOR;

  return DEFAULT_BG_COLOR;
};
