/**
 * Splits an array in half and returns an object with two arrays (each half).
 * @param {T[]} array - The array to split.
 * @return {{firstHalf: T[] , secondHalf: T[]}} Object with two arrays (each half).
 */
export function halfArray<T = unknown>(array: T[]): { firstHalf: T[]; secondHalf: T[] } {
  if (array.length >= 2) {
    const half = Math.floor(array.length / 2);
    return {
      firstHalf: array.slice(0, half),
      secondHalf: array.slice(half),
    };
  }

  return {
    firstHalf: array,
    secondHalf: [],
  };
}
