export interface EntityParser<T> {
  entityToString: (entity: T) => string;
  stringToEntity: (str: string) => [T, number] | null;
}
