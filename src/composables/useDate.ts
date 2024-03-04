import dayjs from "dayjs";

type DateTime = string | number | Date | dayjs.Dayjs | null | undefined;

export const useDate = () => {
  const now = () => dayjs();
  const formatDateTime = (date: DateTime) =>
    dayjs(date).format("D MMM YYYY, mm:ss");
  return { now, formatDateTime };
};
