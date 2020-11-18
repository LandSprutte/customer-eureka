export const dateStringFormatter = (dateString: string): string => {
  const date = new Date(dateString);

  return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
};
