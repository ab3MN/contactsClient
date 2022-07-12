export const getCurrentDay = () =>
  new Date().toISOString().slice(0, 10).split('-').reverse().join('.');

export const getFormatDate = (date: string): string =>
  date.slice(0, 10).split('-').reverse().join('.');
