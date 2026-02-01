export const fmtCurrency = (cents = 0) => `$${(cents / 100).toFixed(2)}`;
