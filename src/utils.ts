export const exist = <T>(value: T | null | undefined): boolean => {
  return value !== null && value !== undefined;
};
