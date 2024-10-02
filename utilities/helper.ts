import {
  addSeconds,
  endOfMonth,
  getDay,
  isAfter,
  isBefore,
  startOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format,
  eachMonthOfInterval,
  subDays,
  addDays,
  isEqual,
} from "date-fns";
import { WEEKDAYS_TITLE } from "./static-value";
import { DateProps } from "@/components/calendar/Day";

const now = new Date();
export const expirationDate = (expirationTime: number) =>
  addSeconds(now, expirationTime);

// Kiểm tra nếu targetDate trước thời gian hiện tại
export const isTargetBeforeCurrent = (targetDate: string | any) =>
  isBefore(new Date(targetDate), now);
export const isTargetAfterCurrent = (targetDate: string | any) =>
  isAfter(new Date(targetDate), now);

export const isMorningTime = () => {
  const hours = now.getHours();
  return hours < 12;
};

export const commonIsEqual = (a: any, b: any) => {
  return isEqual(a, b);
};

export const getDataOfYear = (year: number) => {
  const start = startOfYear(new Date(year, 0, 1)); // Ngày đầu năm
  const end = endOfYear(new Date(year, 0, 1)); // Ngày cuối năm

  // Lấy danh sách tất cả các ngày trong năm
  const datesInYear = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "yyyy-MM-dd")
  );
  let months: any = {};

  datesInYear.forEach((date) => {
    const month = format(date, "MMMM"); // Tên tháng
    const dayOfWeek = format(date, "EEEE"); // Tên ngày trong tuần

    // Khởi tạo tháng nếu chưa có
    if (!months[month]) {
      months[month] = {};
    }

    // Khởi tạo nhóm ngày trong tuần nếu chưa có
    if (!months[month][dayOfWeek]) {
      months[month][dayOfWeek] = [];
    }

    // Thêm ngày vào nhóm tương ứng
    months[month][dayOfWeek].push(format(date, "yyyy-MM-dd"));
  });

  console.log(months);
};

export const getMonthData = (year: number, month: number) => {
  const start = new Date(year, month, 1);
  const end = endOfMonth(start);
  const firstDayOfWeek = subDays(start, getDay(start));
  const lastDayOfWeek = addDays(end, 6 - getDay(end));
  let daysInRange = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });
  if (daysInRange.length <= 35 && daysInRange.length > 28) {
    daysInRange = eachDayOfInterval({
      start: firstDayOfWeek,
      end: addDays(end, 6 - getDay(end) + 7),
    });
  } else if (daysInRange.length <= 28) {
    daysInRange = eachDayOfInterval({
      start: firstDayOfWeek,
      end: addDays(end, 6 - getDay(end) + 14),
    });
  }
  const columns: any = Array.from({ length: 7 }, () => ({
    title: "",
    date: [],
  }));
  const dayNames = WEEKDAYS_TITLE;
  dayNames.forEach((name, index) => {
    columns[index].title = name;
  });

  daysInRange.forEach((day) => {
    const dayIndex = getDay(day); // 0: CN, 1: T2, ..., 6: T7
    const isSpecial = false; // Xác định nếu đây là ngày đặc biệt
    const isDayOfOtherMonth = day.getMonth() !== month; // Kiểm tra nếu ngày thuộc tháng khác
    const type = dayIndex === 0 || dayIndex === 6 ? "off" : "work";
    columns[dayIndex].date.push({
      date: day,
      type,
      isSpecial,
      isDayOfOtherMonth,
    });
  });
  return {
    title: `Tháng ${month + 1}`, // Tháng bắt đầu từ 0
    columns,
  };
};

export const monthsOfYear = (year: number) => {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 0, 1));
  const months = eachMonthOfInterval({ start, end });
  console.log("months", months);
};

export const checkDateInArray = (dateToCheck: Date, dateArray: Date[]) => {
  return dateArray.some((date) => {
    return isEqual(dateToCheck, date);
  });
};
