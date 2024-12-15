import { exist } from "./utils";
import { format } from "date-fns";

export type Tag = string;
export enum TaskStatus {
  Done,
  Canceled,
  Todo,
}

export interface TaskCreateParams {
  title: string;
  tags: Tag[];
  status: TaskStatus;
  date: Date | null;
}

export class Task {
  private _children: Task[];
  private _parent: Task | null;
  private _title: string;
  private _tags: Tag[];
  private _status: TaskStatus;
  private _date: Date | null;

  constructor(p: TaskCreateParams, parent: Task | null = null) {
    this._title = p.title;
    this._tags = p.tags;
    this._date = p.date;
    this._status = p.status;
    this._parent = parent;
  }

  public appendChild(task: Task) {
    task._parent = this;
    this._children.push(task);
  }

  private _getSymbolByStatus(): string {
    switch (this._status) {
      case TaskStatus.Done:
        return "x";

      case TaskStatus.Todo:
        return " ";

      case TaskStatus.Canceled:
        return "-";
    }
  }

  private _getEmojiByStatus(): string {
    switch (this._status) {
      case TaskStatus.Done:
        return "✅";

      case TaskStatus.Todo:
        return "";

      case TaskStatus.Canceled:
        return "❌";
    }
  }

  private _statusToString(): string {
    const symbol = this._getSymbolByStatus();

    return `[${symbol}]`;
  }

  private _dateToString(): string | null {
    if (this._status === TaskStatus.Todo || !this._date) return null;

    const formatedDate = format(this._date, "y-MM-dd");

    return this._getEmojiByStatus() + formatedDate;
  }

  private _tagsToString(): string | null {
    const tagString = this._tags.map((tag) => `#${tag}`).join(" ");

    return tagString === "" ? null : tagString;
  }

  public toString() {
    const taskParts = [
      "-",
      this._statusToString(),
      this._title,
      this._tagsToString(),
      this._dateToString(),
    ].filter(exist) as string[];

    return taskParts.join(" ");
  }
}
