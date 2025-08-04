// Poso Reserved

import dayjs from "dayjs";
import _isempty from "lodash.isempty";

import { DEFAULT_DATE_FORMAT } from "./constants";
import toObject from "dayjs/plugin/toObject";
import objectSupport from "dayjs/plugin/objectSupport";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(toObject);
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);

const _convertDateObjectToString = ({
  date_object = {},
  date_format = DEFAULT_DATE_FORMAT,
}) => {
  if (_isempty(date_object)) return "";
  const { day = "", month = "", year = "" } = date_object || {};
  return dayjs({ day, month: parseInt(month) - 1, year }).format(date_format);
};

const _convertDateStringToObject = ({
  date_format = DEFAULT_DATE_FORMAT,
  date_string = "",
}) => {
  if (!date_string) return null;
  const { date, months, years } = dayjs(date_string, date_format).toObject();
  return { day: date, month: parseInt(months) + 1, year: years };
};

export { _convertDateObjectToString, _convertDateStringToObject };
