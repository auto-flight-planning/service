// size
export const ALL_SIZE_OPTIONS = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;
export const ALL_SIZE_VALUES = ["xs", "sm", "md", "lg", "xl"] as const;
export type AllSize = (typeof ALL_SIZE_VALUES)[number];

// color
export const ALL_COLOR_OPTIONS = {
  PRIMARY: "primary",
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow",
  GRAY: "gray",
  "LIGHT-GRAY": "light-gray",
  WHITE: "white",
  PURPLE: "purple",
} as const;
export const ALL_COLOR_VALUES = [
  "primary",
  "red",
  "green",
  "yellow",
  "gray",
  "light-gray",
  "white",
  "purple",
] as const;
export type AllColor = (typeof ALL_COLOR_VALUES)[number];

// variant
export const ALL_VARIANT_OPTIONS = {
  OUTLINE: "outline",
  SOLID: "solid",
} as const;
export const ALL_VARIANT_VALUES = ["outline", "solid"] as const;
export type AllVariant = (typeof ALL_VARIANT_VALUES)[number];

// rounded
export const ALL_ROUNDED_OPTIONS = {
  NONE: "none",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  "2XL": "2xl",
  FULL: "full",
} as const;
export const ALL_ROUNDED_VALUES = [
  "none",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "full",
] as const;
export type AllRounded = (typeof ALL_ROUNDED_VALUES)[number];

// position
export const ALL_POSITION_OPTIONS = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
} as const;
export const ALL_POSITION_VALUES = ["top", "bottom", "left", "right"] as const;
export type AllPosition = (typeof ALL_POSITION_VALUES)[number];
