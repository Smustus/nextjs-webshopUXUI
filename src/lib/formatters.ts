const CURRENCY_FORMATTER_EUR = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export function formatEUR(amount: number) {
  return CURRENCY_FORMATTER_EUR.format(amount);
}

export const firstLetterUC = (string: string) => {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
};
