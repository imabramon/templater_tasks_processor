export const exist = <T>(value: T | null | undefined): boolean => {
  return value !== null && value !== undefined;
};

export const makeLogger =
  (log = false) =>
  (...args: unknown[]) => {
    if (log) console.log(...args);
  };

export const pushUnion = <T>(origin: T[], toPush: T[]) => {
  const withoutExisting = toPush.filter((el) => !origin.some((e) => e === el));
  return [...origin, ...withoutExisting];
};

export const parseHashTags = (str: string) => {
  return str
    .split(" ")
    .map((tag) => {
      const trimed = tag.trim();
      return trimed[0] === "#" ? trimed.substring(1, trimed.length) : trimed;
    })
    .filter((tag) => tag.length);
};

export const removeBy = <T>(origin: T[], items: T[]) => {
  return origin.filter((el) => !items.some((e) => e === el));
};
