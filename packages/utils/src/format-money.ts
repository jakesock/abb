/**
 * Format a number as a currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency to format the amount in
 * @param {string | string[] | undefined} locales - (Optional) The locales to use for formatting (defaults to "en-US").
 * @param {number | undefined} minimumFractionDigits - (Optional) The minimum number of fraction digits to use (defaults to 2).
 * @return {string} - The formatted amount
 */
export function formatMoney(
  amount: number,
  currency: string,
  locales: string | string[] | undefined = "en-US",
  minimumFractionDigits: number | undefined = 2
) {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
    minimumFractionDigits,
  }).format(amount);
}
