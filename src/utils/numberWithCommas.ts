export const numberWithCommas = (number: number | string) => {
  const result = Number(number).toLocaleString();

  return result;
};
