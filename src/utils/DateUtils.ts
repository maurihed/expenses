import { CalendarDate, parseDate } from "@internationalized/date";

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Dicdiembre"];
export const formatTransactionDate = (date: string) => {
  const _date = new Date(date).getTime();
  const currentDate = new Date().getTime();
  const diff = currentDate - _date;
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));

  if (diffDays < 1) {
    return "Hoy";
  }

  if (diffDays < 2) {
    return "Ayer";
  }

  return formatDateName(new Date(date));
}

// 08-09-2024
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}-${day}-${year}`;
}

export const formatDateName = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  return `${day} ${MONTHS[month]}`;
}

export const toDatePickerFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return parseDate(`${year}-${month}-${day}`);
}

export const parseDatePickerValue = (calendarDate: CalendarDate) => {
  return new Date(`${calendarDate.month}-${calendarDate.day}-${calendarDate.year}`);
}