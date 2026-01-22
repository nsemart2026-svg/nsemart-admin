import { format, subDays, parse } from "date-fns";

export const formatDate = (date: Date | undefined) =>
  date ? format(date, "yyyy-MM-dd") : "";

export const parseDate = (value: string) => {
  const parsed = parse(value, "yyyy-MM-dd", new Date());
  return isNaN(parsed.getTime()) ? undefined : parsed;
};

const getThisYearRange = (): [Date, Date] => [
  new Date(new Date().getFullYear(), 0, 1),
  new Date(),
];

const getLastYearRange = (): [Date, Date] => {
  const year = new Date().getFullYear() - 1;
  return [new Date(year, 0, 1), new Date(year, 11, 31)];
};

export const presets: { label: string; range: [Date, Date] }[] = [
  { label: "Today", range: [new Date(), new Date()] },
  {
    label: "Yesterday",
    range: [subDays(new Date(), 1), subDays(new Date(), 1)],
  },
  { label: "Last 7 Days", range: [subDays(new Date(), 6), new Date()] },
  { label: "Last 30 Days", range: [subDays(new Date(), 29), new Date()] },
  { label: "This Year", range: getThisYearRange() },
  { label: "Last Year", range: getLastYearRange() },
];
