export const moneyFormat = (num: string | number): string => {
  const numParsed = typeof num === 'number' ? num : parseInt(num) ?? 0
  return (
    '$ ' +
    Number(numParsed).toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  )
}
