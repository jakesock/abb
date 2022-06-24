/**
 * Format a number as a currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency to format the amount in
 * @return {string} - The formatted amount
 */
export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
