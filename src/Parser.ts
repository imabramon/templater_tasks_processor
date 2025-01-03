import { EntityParser } from "./EntityParser";
import {
  ParsingError,
  StringParsingResult,
  StringParsingTypes,
  ErrorMessages,
} from "./ParsingResult";
import { Task } from "./Task";
import { makeLogger } from "./utils";

export type ParsingResult<T> = [T[], ParsingError[]];

export type ParsingFn<T> = (file: string) => ParsingResult<T>;

const TabRegEx = /^(\t*)/g;

const tail = <T>(arr: T[]) => arr[arr.length - 1];

export type EntityParserFn<T extends TreeNode> = (
  str: string
) => [T | null, number];

export interface TreeNode {
  appendChild: (child: TreeNode) => void;
  forEach: (fn: (node: TreeNode, deep?: number) => void, deep?: number) => void;
}

const ParserLog = makeLogger();

export class Parser<T extends TreeNode> {
  private get tabs() {
    return this.stack.length + this._additionalTabs;
  }
  private stack: T[] = [];
  private prev: T | null = null;
  private _parser: EntityParser<T>;
  private _firstParse = false;
  private _additionalTabs = 0;

  constructor(Parser: new () => EntityParser<T>) {
    this._parser = new Parser();
  }

  getParentID() {
    if (this.stack.length) {
      return tail(this.stack);
    }

    return null;
  }

  parse(row: string, index: number): StringParsingResult<T> {
    ParserLog("parsing trace", index, row);
    if (row.trim().length === 0) {
      return {
        type: StringParsingTypes.Skip,
      };
    }

    const parsingResult = this._parser.stringToEntity(row);

    if (!parsingResult)
      return {
        type: StringParsingTypes.Error,
        error: {
          row: index,
          message: ErrorMessages.UndefinedString,
        },
      };

    const entity = parsingResult;

    if (entity) {
      const tabs = TabRegEx.exec(row)?.[0].length ?? 0;
      if (tabs) row.replace(TabRegEx, "");
      let parentID: T | null = null;

      switch (true) {
        case tabs === this.tabs: {
          parentID = this.getParentID();
          break;
        }
        case tabs === this.tabs + 1 && this.prev !== null: {
          this.stack.push(this.prev);
          parentID = this.prev;
          break;
        }
        case tabs < this.tabs: {
          const dif = this.tabs - tabs;
          const realTabs = this.stack.length;

          if (dif > this.tabs) {
            return {
              type: StringParsingTypes.Error,
              error: {
                row: index,
                message: `Diff cant be is greater than current tabs. Error in line${index}`,
              },
            };
          }

          if (dif > realTabs) {
            this._additionalTabs -= dif - realTabs;
          }

          this.stack.splice(tabs - this._additionalTabs, dif);
          parentID = this.getParentID();
          break;
        }
        case tabs > this.tabs && !this._firstParse: {
          this._additionalTabs = tabs;
          parentID = this.getParentID();
          break;
        }
        default: {
          return {
            type: StringParsingTypes.Error,
            error: {
              row: index,
              message: ErrorMessages.ExtraTabs,
            },
          };
        }
      }
      this._firstParse = true;
      // Absolute Cinema
      if (this._firstParse && this._additionalTabs && !this.stack.length) {
        (entity as unknown as Task).deep = this._additionalTabs;
      }

      this.prev = entity;

      if (parentID) {
        parentID?.appendChild(entity);
        return {
          type: StringParsingTypes.Skip,
        };
      }

      return {
        type: StringParsingTypes.Task,
        data: entity,
      };
    }

    return {
      type: StringParsingTypes.Error,
      error: {
        row: index,
        message: ErrorMessages.UndefinedString,
      },
    };
  }

  public parseTaskFile(lines: string): ParsingResult<T> {
    const rootEntities: T[] = [];
    const errors: ParsingError[] = [];

    const rawRows = lines.split("\n");

    rawRows.forEach((row, index) => {
      const result: StringParsingResult<T> = this.parse(row, index);

      switch (result.type) {
        case StringParsingTypes.Error: {
          errors.push(result.error);
          break;
        }
        case StringParsingTypes.Task: {
          rootEntities.push(result.data);
          break;
        }
        case StringParsingTypes.Skip: {
          break;
        }
      }
    });

    return [rootEntities, errors];
  }

  public generateTaskFile(entities: T[]) {
    const rows: string[] = [];
    entities.forEach((entity: T) => {
      entity.forEach((sub: T, deep: number) => {
        const tabs = Array.from({ length: deep })
          .map(() => "	")
          .join("");
        rows.push(`${tabs}${this._parser.entityToString(sub)}`);
      });
    });

    return rows.join("\n");
  }
}
