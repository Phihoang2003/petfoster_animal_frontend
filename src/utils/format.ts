import { url } from "inspector";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { INotification } from "@/configs/interface";
export const stringToUrl = (string: string) => {
  if (!string || string.length <= 0) return "";
  return string.toLowerCase().replaceAll(" ", "-");
};
export function capitalize(value: string) {
  if (value.length < 1) return value;

  return value;
}
export const toGam = (value: number) => {
  return value < 1000 ? value + "g" : (value / 1000).toFixed(1) + "kg";
};
export const toCurrency = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(price)
    .replace("₫", "VND");
};
const floor = Math.floor,
  abs = Math.abs,
  log = Math.log,
  round = Math.round,
  min = Math.min;
const abbrev = ["K", "Mil", "Bil"];
function rnd(n: number, precision: number) {
  const prec = 10 ** precision;
  return round(n * prec) / prec;
}
export function toAbbrevNumber(n: number) {
  let base = floor(log(abs(n)) / log(1000));
  const suffix = abbrev[min(abbrev.length - 1, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? rnd(n / 1000 ** base, 2) + suffix : "" + n;
}
export const secondsToMinute = (inp: number) => {
  return moment.utc(inp * 1000).format("mm:ss") + "";
};
export const fileToUrl = (file: File, callback?: (url: string) => void) => {
  const urlObject = URL.createObjectURL(file);
  if (callback) callback(urlObject);
  return urlObject;
};
export const convertFirestoreTimestampToString = (timestamp: Timestamp) =>
  new Date(timestamp?.toDate().getTime());

export function paseDataNotification<T>(
  noti: INotification,
  data: T,
  isAdmin = false
) {
  let result = isAdmin ? noti.adminCotent || noti.content : noti.content;
  if (!noti || !noti.meta || !noti.meta.keys) return result;

  noti.meta.keys.forEach((key, index) => {
    if (result.includes(`@${key.name}`)) {
      result = result.replaceAll(
        `@${key.name}`,
        `<span style="color: ${key.color};">${data[key.name as keyof T]}</span>`
      );
    }
  });
  return result;
}
