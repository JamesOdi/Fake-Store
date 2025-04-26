export function formatNumber(number) {
  if (number === null || number === undefined) {
    return '';
  }

  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-US', options).format(number);
}

export function formatCurrency(number) {
  if (number === null || number === undefined) {
    return '';
  }

  const options = {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-AU', options).format(number);
}
