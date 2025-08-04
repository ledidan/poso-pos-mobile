// Poso Reserved

import { set } from "object-path-immutable";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";
import dayjs from "dayjs";

// Lib
import { Constants, Services } from "../../lib";
const { DATE_FORMAT, DEFAULT_TIMEZONE, TIME_FORMAT } = Constants;

// ----------------------------------------------------------------
// Convert a set of extra hours into local time
const _convertExtraHours = async ({ extraHours, timeZone }) => {
  const result = await Object.keys(extraHours).reduce(
    async (previousPromise, timeId) => {
      const previousResult = await previousPromise;
      const convertedTime = await _convertHoursToLocal({
        hours: extraHours[timeId],
        timeZone,
      });
      return set(previousResult, `${timeId}`, convertedTime);
    },
    Promise.resolve({})
  );
  return result;
};

// ----------------------------------------------------------------
// Convert UTC hours to local 24 Hr and 12 Hr
const _convertHoursToLocal = async ({ hours, timeZone }) => {
  const { endAt = "", startAt = "" } = hours;
  const { BUTI } = Services;
  const { ConvertUTCToLocalTime } = BUTI.GetRequests;
  let localEndAt = "",
    localStartAt = "";
  if (endAt) {
    const { localTime = "" } = await ConvertUTCToLocalTime({
      utc_time: endAt,
      timeZone,
    });
    localEndAt = localTime;
  }
  if (startAt) {
    const { localTime = "" } = await ConvertUTCToLocalTime({
      utc_time: startAt,
      timeZone,
    });
    localStartAt = localTime;
  }
  return {
    localEndAt,
    localEndAt12Hr: _convertTime24to12(localEndAt),
    localStartAt,
    localStartAt12Hr: _convertTime24to12(localStartAt),
  };
};

// ----------------------------------------------------------------
// Convert 24 hour time to am/pm
const _convertTime24to12 = (time24 = "") => {
  if (!time24) return "";
  let tmpArr = time24.split(":"),
    result = "";
  if (+tmpArr[0] === 12) result = tmpArr[0] + ":" + tmpArr[1] + " PM";
  else if (+tmpArr[0] === 0) result = "12:" + tmpArr[1] + " AM";
  else if (+tmpArr[0] > 12) result = +tmpArr[0] - 12 + ":" + tmpArr[1] + " PM";
  else result = +tmpArr[0] + ":" + tmpArr[1] + " AM";
  return String(result) === "undefined" ? "" : result;
};

// ----------------------------------------------------------------
// Convert UTC tinestamp created by moment().toISOString()
// into local date & time
const _convertUTCTimestampToLocalTime = ({ localTimeZone, timeStamp }) => {
  if (!timeStamp) return "";
  const local_date = formatToTimeZone(timeStamp, DATE_FORMAT, {
    timeZone: localTimeZone || DEFAULT_TIMEZONE,
  });
  const local_time = formatToTimeZone(timeStamp, TIME_FORMAT, {
    timeZone: localTimeZone || DEFAULT_TIMEZONE,
  });
  return { local_date, local_time };
};

// ----------------------------------------------------------------
// Returns one of "monday", "tuesday", "wednesday", "thursday",
// "friday", "saturday", "sunday"
const GetTodayDay = async ({ date_format = "" } = {}) => {
  const { BUTI } = Services;
  const { GetCurrentUTCTimestamp } = BUTI.GetRequests;
  const { currentTimestamp } = await GetCurrentUTCTimestamp();
  const dayjs_time_stamp = dayjs(currentTimestamp);
  return {
    date: dayjs_time_stamp.format(date_format || "DD-MM-YYYY"),
    name_of_the_day: dayjs_time_stamp.format("dddd").toLowerCase(),
    time: dayjs_time_stamp.format("HH:MM"),
  };
};

const _convertTimeAgo = (time) => {
  const now = new Date();
  const past = new Date(time);
  const diffMs = now - past;

  const seconds = Math.round(diffMs / 1000);
  const minutes = Math.round(diffMs / 60000);
  const hours = Math.round(diffMs / 3600000);
  const days = Math.round(diffMs / 86400000);

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  }
  return `${days} ngày trước`;
};
export default {
  _convertExtraHours,
  _convertHoursToLocal,
  _convertTime24to12,
  _convertUTCTimestampToLocalTime,
  GetTodayDay,
  _convertTimeAgo,
};
