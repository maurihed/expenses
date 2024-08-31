export const formatMoney = (amount: number) => {
  const moneyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 1
  });
  return moneyFormatter.format(amount);
}
