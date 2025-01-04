import { Parser } from "./Parser";
import { SelectionManager, TemplaterSelector, Templeter } from "./Selector";
import { Task } from "./Task";
import { TaskParser } from "./TaskParser";
import { parseHashTags } from "./utils";

export class TaskList {
  private _selector: SelectionManager;
  private _parser: Parser<Task>;
  private _rootTasks: Task[] = [];

  constructor(tp: Templeter) {
    this._selector = new TemplaterSelector(tp);
    this._parser = new Parser(TaskParser);
    this._parseMarkdown();
  }

  private _parseMarkdown() {
    const selection = this._selector.getSelection() ?? "";

    if (!selection) throw new Error("Empty selection");

    const [tasks, errors] = this._parser.parseTaskFile(selection);

    if (errors.length) {
      errors.forEach((error) => {
        console.error(
          `Parsing error in selection row ${error.row}:`,
          error.message
        );
      });
    }

    this._rootTasks = tasks;
  }

  public toString() {
    return this._parser.generateTaskFile(this._rootTasks);
  }

  // sortBy(fn){

  // }

  deleteTags(tagsStr: string): void {
    const tags = parseHashTags(tagsStr);
    this._rootTasks.forEach((root) => {
      root.forEach((task: Task) => task.removeTags(tags));
    });
  }

  addTags(tagsStr: string): void {
    const tags = parseHashTags(tagsStr);
    this._rootTasks.forEach((root) => {
      root.forEach((task: Task) => task.addTags(tags));
    });
  }

  // replaceTags(oldTags, newTags){

  // }
}
