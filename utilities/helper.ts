import {
  addMilliseconds,
  addSeconds,
  formatISO,
  isAfter,
  isBefore,
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
