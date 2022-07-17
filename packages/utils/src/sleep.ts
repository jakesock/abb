/**
 * Function that sleeps for a given amount of time in milliseconds.
 * @param {number} milliseconds - The amount of time to sleep in milliseconds.
 * @return {Promise<void>} - A promise that resolves when the sleep is complete.
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
