/* All date and time related function will resides here */

import { useEffect, useState } from 'react';
import { format, formatDistance, formatISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const useLocalDateTime = () => {
  const [userTimeZone, setUserTimeZone] = useState('');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    setUserTimeZone(timeZone);

    const now = new Date();
    const currentTimeInTimeZone = toZonedTime(now, timeZone);
    setCurrentTime(currentTimeInTimeZone);
  }, []);

  return { userTimeZone, currentTime };
};

export const formatDate = (date: Date, formatStr = 'dd-LLL-yyyy') =>
  date ? format(date, formatStr) : date;

export const formatDateTime = (date: Date, formatStr = 'dd-LLL-yyy HH:mm') =>
  date ? format(date, formatStr) : date;

export const formatDateDistance = (date: Date) =>
  date
    ? formatDistance(date, new Date(), {
        addSuffix: true,
        includeSeconds: false,
      })
    : date;

export function formatDateTimeLocal(
  date: Date | string | undefined,
  formatStr = 'yyyy/MM/dd, HH:mm:ss',
  userTimeZone: string,
) {
  if (date) {
    const originalDate = typeof date === 'string' ? new Date(date) : date;
    const currentTimeInTimeZone = toZonedTime(originalDate, userTimeZone);

    return formatDate(currentTimeInTimeZone, formatStr);
  }

  return '';
}

export const utcFormatDate = (
  dateString: string | null,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
): string | null => {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  date.setHours(hours, minutes, seconds, milliseconds);

  return date.toISOString();
};

// TODO date-fns utc for api

// export const formatDateTimeUTCForAPI = (
//   date,
//   formatStr = "yyyy-MM-dd kk:mm:ss xxx"
// ) => (date ? format(date, formatStr, {timeZone: "UTC"}) : date);

// write function using date-fns utc for api
export const formatDateTimeUTCForAPI = (date: Date, formatStr: undefined) =>
  date ? formatISO(date, formatStr) : date;

// export const formatDate from csv

export const convertDateFromCSV = (dateStr: string): string => {
  const formatDate = (year: string, month: string) => {
    const date = new Date(`20${year}-${month}-01`);

    return date.toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
  };

  // EXOS-48: Check if the date is in MM/DD/YY format
  if (/\d{2}\/\d{2}\/\d{2}/.test(dateStr)) {
    const [month, , year] = dateStr.split('/');

    return formatDate(year, month);
  }

  // EXOS-48: Check if the date is in MMM YYYY format
  if (/[a-zA-Z]{3} \d{4}/.test(dateStr)) {
    return dateStr;
  }

  // EXOS-48: Check if the date is in MMM-YY format
  if (/[a-zA-Z]{3}-\d{2}/.test(dateStr)) {
    const [month, year] = dateStr.split('-');

    return formatDate(year, month);
  }

  return dateStr;
};
