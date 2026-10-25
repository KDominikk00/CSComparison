export const formatNumber = (value, unit) => {
  if (value === null || value === undefined) {
    return '-';
  }
  const text = Number.isInteger(value) ? String(value) : String(Math.round(value * 1000) / 1000);
  return unit ? `${text}${unit}` : text;
};
