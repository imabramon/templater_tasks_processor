export enum StringParsingTypes {
  Error,
  Skip,
  Task,
}

interface IStringParsingResult {
  type: StringParsingTypes;
}

export type RowNumber = number;

export enum ErrorMessages {
  ExtraTabs = "Лишние пробелы",
  UndefinedString = "Неизвестная строка",
  WrongHeader = "Неправильный заголовок",
}

export type ParsingError = {
  row: RowNumber;
  message: ErrorMessages;
};

interface ErrorString extends IStringParsingResult {
  type: StringParsingTypes.Error;
  error: ParsingError;
}

interface Skip extends IStringParsingResult {
  type: StringParsingTypes.Skip;
}

interface TaskString<T> extends IStringParsingResult {
  type: StringParsingTypes.Task;
  data: T;
}

export type StringParsingResult<T> = ErrorString | Skip | TaskString<T>;
