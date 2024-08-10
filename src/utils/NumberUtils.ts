export const formatMoney = (amount: number) => {
  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return moneyFormatter.format(amount);
}
