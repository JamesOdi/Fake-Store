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

export function getTotalNumberOfItems(cartData) {
  return cartData.reduce((acc, item) => acc + item.count, 0);
}

export function getTotalPrice(cartData) {
  return formatCurrency(
    cartData.reduce((acc, item) => {
      return acc + item.product.price * item.count;
    }, 0)
  );
}
