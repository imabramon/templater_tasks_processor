export const exist = <T>(value: T | null | undefined): boolean => {
  return value !== null && value !== undefined;
};

export const makeLogger =
  (log = false) =>
  (...args: unknown[]) => {
    if (log) console.log(...args);
  };
