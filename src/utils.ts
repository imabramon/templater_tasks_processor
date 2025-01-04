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
