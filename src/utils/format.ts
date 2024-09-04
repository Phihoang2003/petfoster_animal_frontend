export const stringToUrl = (string: string) => {
  if (!string || string.length <= 0) return "";
  return string.toLowerCase().replaceAll(" ", "-");
};
