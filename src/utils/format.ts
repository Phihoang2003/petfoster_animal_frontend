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
