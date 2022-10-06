export const getCurrentDay = () =>
  new Date().toISOString().slice(0, 10).split('-').reverse().join('.');

export const getFormatDate = (date: string): string =>
  date.slice(0, 10).split('-').reverse().join('.');

export const getFullDate = (date: any) => {
  let day = date.getDate();
  let month = date.getMonth();
  const year = date.getFullYear();

  if (month < 12) month += 1;
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;

  return `${day}.${month}.${year}`;
};
