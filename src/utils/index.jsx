// Poso Reserved

import dayjs from "dayjs";
import _round from "lodash.round";
import _isEmpty from "lodash.isempty";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

// Lib
import { Constants } from "../lib";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const _convertDateToLocalDate = (data) => {
  const { DATE_FORMAT, DEFAULT_TIMEZONE } = Constants;
  const {
    date,
    localFormat = DATE_FORMAT,
    // originalFormat = "",
    timeZone = DEFAULT_TIMEZONE,
  } = data;
  return dayjs(date)
    .tz(timeZone)
    .format(localFormat);
};

const _formatPhoneNumber = (phoneNumberString = "") => {
  const cleaned = ("" + String(phoneNumberString)).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return "";
};

const _formatVietnamPhoneNumber = (phoneNumberString = "") => {
  const cleaned = ("" + String(phoneNumberString)).replace(/\D/g, ""); // Remove all non-digit characters

  let match;

  if (cleaned.startsWith("0")) {
    if (cleaned.length === 10) {
      match = cleaned.match(/^0(\d{2})(\d{3})(\d{4})$/); // e.g., 090 123 4567
      if (match) {
        return `0${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (cleaned.length === 9) {
      match = cleaned.match(/^0(\d{2})(\d{3})(\d{3})$/); // e.g., 070 123 456
      if (match) {
        return `0${match[1]} ${match[2]} ${match[3]}`;
      }
    }
  } else {
    if (cleaned.length === 9) {
      // e.g., 901234567
      match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
      if (match) {
        return `+84 ${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (cleaned.length === 10) {
      // e.g., 9012345678
      match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+84 ${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (cleaned.length === 11 && cleaned.startsWith("84")) {
      // e.g., 84901234567
      match = cleaned.match(/^84(\d{2})(\d{3})(\d{4})$/);
      if (match) {
        return `+84 ${match[1]} ${match[2]} ${match[3]}`;
      }
    } else if (cleaned.length === 12 && cleaned.startsWith("84")) {
      // e.g., 842812345678
      match = cleaned.match(/^84(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+84 ${match[1]} ${match[2]} ${match[3]}`;
      }
    }
  }

  return "";
};
const _isTrue = (value = "") => {
  if (!value) return false;
  else if (typeof value === "boolean") return value;
  else if (typeof value === "string") return value === "true";
  return value;
};

const _generateRandomID = () =>
  String(Math.floor(100000 + Math.random() * 900000)) +
  String.fromCharCode(97 + Math.floor(Math.random() * 26));

const _getDeviceDimension = () => ({
  height: window.screen.height,
  width: window.screen.width,
});

// ------------------------------------------------------
// Localize the time to the provided local timezone

const _localizeTime = (params = {}) => {
  const { DEFAULT_TIMEZONE, TIME_FORMAT: DEFAULT_TIME_FORMAT } = Constants;
  const {
    time,
    time_format = DEFAULT_TIME_FORMAT,
    time_zone = DEFAULT_TIMEZONE,
  } = params;
  return formatToTimeZone(time, time_format, { timeZone: time_zone });
};

// ------------------------------------------------------
// Return the value as a String without the accents or diacritics
// "Crème Brulée" -> "Creme Brulee"
const _removeAccents = ({ text = "" }) =>
  _isEmpty(text)
    ? ""
    : String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

// ------------------------------------------------------
// Return the value as a String, rounded by the number of decimals
// 11 -> 11.00
// 10.5 -> 10.50
const _roundNumber = (value, decimals = 0) =>
  _round(isNaN(value) ? 0 : value, decimals);

const _scrollTo = ({
  behavior = "instant",
  block = "start",
  position = "relative",
  ref = {},
  top = "-120px",
}) => {
  if (!_isEmpty(ref)) {
    let i_pos = ref.style.position;
    let i_top = ref.style.top;
    ref.style.position = position;
    ref.style.top = top;
    ref.scrollIntoView({ behavior, block });
    ref.style.top = i_top;
    ref.style.position = i_pos;
  }
};

export {
  _convertDateToLocalDate,
  _formatPhoneNumber,
  _isTrue,
  _formatVietnamPhoneNumber,
  _generateRandomID,
  _getDeviceDimension,
  _localizeTime,
  _removeAccents,
  _roundNumber,
  _scrollTo,
};
