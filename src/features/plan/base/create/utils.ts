export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let i = currentYear; i <= currentYear + 10; i++) {
    options.push({ value: i.toString(), label: i.toString() + "年" });
  }
  return options;
};

export const getMonthOptions = (year: string) => {
  const startMonth = getStartMonth(year);
  const options = [];
  for (let i = startMonth; i <= 12; i++) {
    options.push({ value: i.toString(), label: i.toString() + "月" });
  }
  return options;
};

export const getStartMonth = (year: string) => {
  const currentYear = Number(year);
  const currentMonth =
    new Date().getMonth() > 11 ? 1 : new Date().getMonth() + 2;
  return currentYear === new Date().getFullYear() ? currentMonth : 1;
};
