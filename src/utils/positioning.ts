/**
 * positioning.ts
 * Utilities to compute x/y coordinates for preset positions based on inner and outer (active area) sizes.
 * All inputs/outputs are in centimeters (cm).
 */

export type PresetPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'Custom';

export interface ComputeCoordinatesInput {
  position: PresetPosition;
  innerWidthCm: number;  // width of the inner element (top-left is the reference point)
  innerHeightCm: number; // height of the inner element
  activeWidthCm: number; // width of the active area (where 0,0 is the top-left)
  activeHeightCm: number; // height of the active area
  clampToActiveArea?: boolean; // default true
}

export interface ComputeCoordinatesOutput {
  xCm: number; // top-left x within active area
  yCm: number; // top-left y within active area
}

// Horizontal/Vertical anchor identifiers
type HAnchor = 'left' | 'center' | 'right';
type VAnchor = 'top' | 'middle' | 'bottom';

interface Anchors {
  outerH: HAnchor;
  outerV: VAnchor;
  innerH: HAnchor;
  innerV: VAnchor;
}

export const computeAnchors = (position: PresetPosition): Anchors => {
  switch (position) {
    case 'top-left': return { outerH: 'left', outerV: 'top', innerH: 'left', innerV: 'top' };
    case 'top-center': return { outerH: 'center', outerV: 'top', innerH: 'center', innerV: 'top' };
    case 'top-right': return { outerH: 'right', outerV: 'top', innerH: 'right', innerV: 'top' };
    case 'middle-left': return { outerH: 'left', outerV: 'middle', innerH: 'left', innerV: 'middle' };
    case 'middle-center': return { outerH: 'center', outerV: 'middle', innerH: 'center', innerV: 'middle' };
    case 'middle-right': return { outerH: 'right', outerV: 'middle', innerH: 'right', innerV: 'middle' };
    case 'bottom-left': return { outerH: 'left', outerV: 'bottom', innerH: 'left', innerV: 'bottom' };
    case 'bottom-center': return { outerH: 'center', outerV: 'bottom', innerH: 'center', innerV: 'bottom' };
    case 'bottom-right': return { outerH: 'right', outerV: 'bottom', innerH: 'right', innerV: 'bottom' };
    default:
      // Custom: not used for anchor-based computation; provide a reasonable default
      return { outerH: 'left', outerV: 'top', innerH: 'left', innerV: 'top' };
  }
};

const anchorOffsetX = (h: HAnchor, width: number): number => {
  if (h === 'left') return 0;
  if (h === 'center') return width / 2;
  return width; // right
};

const anchorOffsetY = (v: VAnchor, height: number): number => {
  if (v === 'top') return 0;
  if (v === 'middle') return height / 2;
  return height; // bottom
};

export const computeCoordinates = (input: ComputeCoordinatesInput): ComputeCoordinatesOutput => {
  const {
    position,
    innerWidthCm,
    innerHeightCm,
    activeWidthCm,
    activeHeightCm,
    clampToActiveArea = true,
  } = input;

  if (position === 'Custom') {
    // Caller should preserve user-specified x/y; this function isn't used.
    return { xCm: 0, yCm: 0 };
  }

  const { outerH, outerV, innerH, innerV } = computeAnchors(position);

  // Outer anchor positions within active area
  const outerAnchorX = anchorOffsetX(outerH, activeWidthCm);
  const outerAnchorY = anchorOffsetY(outerV, activeHeightCm);

  // Inner anchor offsets within inner dimensions
  const innerAnchorX = anchorOffsetX(innerH, innerWidthCm);
  const innerAnchorY = anchorOffsetY(innerV, innerHeightCm);

  // Compute inner top-left position so that anchors coincide
  let xCm = outerAnchorX - innerAnchorX;
  let yCm = outerAnchorY - innerAnchorY;

  if (clampToActiveArea) {
    const maxX = Math.max(0, activeWidthCm - innerWidthCm);
    const maxY = Math.max(0, activeHeightCm - innerHeightCm);
    if (xCm < 0) xCm = 0; else if (xCm > maxX) xCm = maxX;
    if (yCm < 0) yCm = 0; else if (yCm > maxY) yCm = maxY;
  }

  return { xCm, yCm };
};

