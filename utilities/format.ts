import { format, parse } from "date-fns";

export const DATE_OF_BIRTH1 = "dd/MM/yyyy";
export const DATE_OF_BIRTH = "dd-MM-yyyy";
export const DATE_OF_BIRTH_REVERSE = "yyyy-MM-dd";
export const FULL_DATE_REVERSE = "yyyy-MM-dd HH:mm:ss";
export const FULL_DATE = "dd-MM-yyyy HH:mm:ss";

export const formatStringToDate = (date: string) => {
  if (!date) return new Date();
  return parse(date || "", DATE_OF_BIRTH, new Date()) || new Date();
};

export const formatFullStringToDate = (date: string) => {
  if (!date) return new Date();
  return parse(date || "", FULL_DATE, new Date()) || new Date();
};

export const formatStringToDateReverse = (date: string) => {
  if (!date) return new Date();
  return parse(date || "", DATE_OF_BIRTH_REVERSE, new Date()) || new Date();
};

export const formatFullStringToDateReverse = (date: string) => {
  if (!date) return new Date();
  return parse(date || "", FULL_DATE_REVERSE, new Date()) || new Date();
};

export const formatDateToString = (date: Date) => {
  if (!date) return "";
  return format(date, DATE_OF_BIRTH);
};

export const formatDateToString1 = (date: Date) => {
  if (!date) return "";
  return format(date, DATE_OF_BIRTH1);
};

export const convertIdToObject = (ids: number[], data: any[]) => {
  if (!ids.length || !data.length) return [];
  return ids?.map((id: any) => {
    const name = data.find((opt: any) => opt.id == id);
    return {
      id: id,
      name: data.find((opt: any) => opt.id == id)?.name,
    };
  });
};
