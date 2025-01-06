import { format } from "date-fns";
import { EntityParser } from "./EntityParser";
import { Task, TaskStatus } from "./Task";
import { exist } from "./utils";

const StatusRegEx = /- \[([ x-])\]/;
const TagRegEx = /#([\wа-яА-Я/]*)/g;
const DateRegEx = /[✅❌]\s(\d{4}-\d{2}-\d{2})/;

export class TaskParser implements EntityParser<Task> {
  public stringToEntity = (str: string) => {
    const status = this._getStatusFromSymbol(StatusRegEx.exec(str)?.[1] ?? " ");
    const tags = [...str.matchAll(TagRegEx)].map((match) => match[1]);

    const date = DateRegEx.exec(str)?.[1];
    const title = str
      .replace(StatusRegEx, "")
      .replaceAll(TagRegEx, "")
      .replace(DateRegEx, "")
      .trim();

    return new Task({
      status,
      title,
      tags,
      date: date ? new Date(date) : null,
    });
  };

  private _getStatusFromSymbol(symbol: string): TaskStatus {
    switch (symbol) {
      case "x":
        return TaskStatus.Done;

      case " ":
        return TaskStatus.Todo;

      case "-":
        return TaskStatus.Canceled;

      default:
        throw new Error("Undefined symbol");
    }
  }

  private _getEmojiByStatus(task: Task): string {
    switch (task.status) {
      case TaskStatus.Done:
        return "✅";

      case TaskStatus.Todo:
        return "";

      case TaskStatus.Canceled:
        return "❌";
    }
  }

  private _getSymbolByStatus(task: Task): string {
    switch (task.status) {
      case TaskStatus.Done:
        return "x";

      case TaskStatus.Todo:
        return " ";

      case TaskStatus.Canceled:
        return "-";
    }
  }

  private _statusToString(task: Task): string {
    const symbol = this._getSymbolByStatus(task);

    return `[${symbol}]`;
  }

  private _dateToString(task: Task): string | null {
    if (task.status === TaskStatus.Todo) return null;
    if (!task.date) return null;

    const formatedDate = format(task.date, "y-MM-dd");

    return this._getEmojiByStatus(task) + " " + formatedDate;
  }

  private _tagsToString(task: Task): string | null {
    const tagString = task.tags.map((tag) => `#${tag}`).join(" ");

    return tagString === "" ? null : tagString;
  }

  public entityToString(task: Task) {
    const taskParts = [
      "-",
      this._statusToString(task),
      task.title,
      this._tagsToString(task),
      this._dateToString(task),
    ].filter(exist) as string[];

    return taskParts.join(" ");
  }
}
