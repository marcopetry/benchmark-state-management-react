export const convertToLocalTime = (date: Date) => {
  const localDateTime =
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString() +
    "." +
    date.getMilliseconds().toString().padStart(3, "0");

  return localDateTime;
};
