// rules
// output.width <= containerSize.width
// output.height <= containerSize.height
// zero values should not crash
/**
 *
 * @param {{ width: number, height: number }} containerSize
 * @param {{ width: number, height: number }} originalSize
 * @returns {{ width: number, height: number }}
 */
export function constrainAspectRatio(containerSize, originalSize) {
  if (!containerSize || !originalSize || originalSize.width === 0 || originalSize.height === 0 || containerSize.width === 0 || containerSize.height === 0) return { width: 0, height: 0 };

  let output = { height: containerSize.height, width: containerSize.height / originalSize.height * originalSize. width };

  if (output.width > containerSize.width) {
    output = { width: containerSize.width, height: containerSize.width / originalSize.width * originalSize.height };
  }

  return output;
}
