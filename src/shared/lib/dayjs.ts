// src/shared/lib/dayjs.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/zh-tw";

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(relativeTime);
dayjs.extend(duration);

dayjs.locale("zh-tw");
dayjs.tz.setDefault("Asia/Taipei");

// 常用工具
export const format = (d?: dayjs.ConfigType, f = "YYYY/MM/DD HH:mm") =>
  d ? dayjs.tz(d).format(f) : "";
export const fromNow = (d?: dayjs.ConfigType) =>
  d ? dayjs.tz(d).fromNow() : "";
export default dayjs;
