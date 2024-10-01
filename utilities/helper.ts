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
} from "date-fns";

const isEqual = require("react-fast-compare");

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

export const getDateOfMonth = () => {
  const year = 2023; // Năm
  const month = 9; // Tháng (0 = tháng 1, 1 = tháng 2, ..., 11 = tháng 12)

  // Xác định ngày bắt đầu và kết thúc của tháng
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(new Date(year, month, 1));

  // Lấy danh sách tất cả các ngày trong tháng
  const datesInMonth = eachDayOfInterval({ start, end });

  // Nhóm các ngày theo ngày trong tuần
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const monthDisplay = Array.from({ length: 7 }, () => []); // Mảng rỗng cho 7 ngày trong tuần

  datesInMonth.forEach((date: Date | number | string) => {
    // console.log("-------------", date);
    const dayIndex = getDay(date); // Lấy chỉ số ngày trong tuần (0 - 6)
    monthDisplay[dayIndex].push(format(date, "yyyy-MM-dd")); // Thêm ngày vào mảng tương ứng
  });
  console.log("----datesInMonth----------", datesInMonth);
  // In kết quả
  daysOfWeek.forEach((day, index) => {
    console.log(`${day}: ${monthDisplay[index].join(", ")}`);
  });
  console.log("----monthDisplay----------", monthDisplay);
};

export const monthsOfYear = (year: number) => {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 0, 1));
  const months = eachMonthOfInterval({ start, end });
  console.log("months", months);
};
