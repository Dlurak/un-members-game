/**
 * Shuffles an array without mutating the original array.
 */
export const shuffle = <T>(arr: T[]): T[] =>
  arr.sort(() => Math.random() - 0.5);
