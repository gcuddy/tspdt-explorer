export function clampText(text: string, maxLength: number): string {
  // Smart clamp text: seek for the last space before the max length
  const lastSpaceIndex = text.lastIndexOf(" ", maxLength);
  if (lastSpaceIndex !== -1) {
    return `${text.slice(0, lastSpaceIndex)}...`;
  }
  // If no space found, just cut the text
  return `${text.slice(0, maxLength)}...`;
}
