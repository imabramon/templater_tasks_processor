import * as _ from "lodash";
import { Parser } from "./Parser";
import { SelectionManager, TemplaterSelector, Templeter } from "./Selector";
import { Task, TaskStatus } from "./Task";
import { TaskParser } from "./TaskParser";
import { parseHashTags } from "./utils";

export class TaskList {
  private _selector: SelectionManager;
  private _parser: Parser<Task>;
  private _rootTasks: Task[] = [];

  constructor(tp?: Templeter, list?: Task[]) {
    this._parser = new Parser(TaskParser);
    if (tp) {
      this._selector = new TemplaterSelector(tp);
      this._parseMarkdown();
    }

    if (list && !tp) {
      this._rootTasks = _.cloneDeep(list);
    }
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

  public get rootTasks() {
    return this._rootTasks;
  }

  public deleteTags(tagsStr: string): void {
    const tags = parseHashTags(tagsStr);
    this._rootTasks.forEach((root) => {
      root.forEach((task: Task) => task.removeTags(tags));
    });
  }

  public addTags(tagsStr: string): void {
    const tags = parseHashTags(tagsStr);
    this._rootTasks.forEach((root) => {
      root.forEach((task: Task) => task.addTags(tags));
    });
  }

  public tagLikeParent(subtag: string): void {
    this.forEach((task) => {
      if (task.parent === null) return;

      const parentTags = task.parent.tags;
      const parentTag = parentTags.find((tag) => tag.includes(subtag));

      if (!parentTag) return;

      task.addTags([parentTag]);
    });
  }

  public forEach(fn: (node: Task) => void) {
    this._rootTasks.forEach((root) => {
      root.forEach(fn);
    });
  }

  public filter(fn: (node: Task) => boolean) {
    this._rootTasks = this._rootTasks.filter((root) => {
      root.filter(fn);
      return root.hasChildren || fn(root);
    });
  }

  public devideByCompleted() {
    const temp = new TaskList(undefined, this._rootTasks);

    this.filter((task) => task.status === TaskStatus.Todo);
    this.forEach((task) => {
      task.status = TaskStatus.Todo;
    });

    temp.filter((task) => task.status !== TaskStatus.Todo);
    temp.forEach((task) => {
      if (task.status === TaskStatus.Todo) {
        task.status = TaskStatus.Done;
      }
    });

    this._rootTasks = [...this._rootTasks, ...temp._rootTasks];
  }

  public devideByHasCategory(subtag: string) {
    this.tagLikeParent(subtag);

    const taskIds: [boolean, number][] = this._rootTasks.map((task, index) => {
      const hasSubTag = task.tags.some((tag) => tag.includes(subtag));
      return [hasSubTag, index];
    });

    const taskWithoutSubTag = taskIds
      .filter(([hasSubTag]) => !hasSubTag)
      .map(([_, index]) => index);
    const taskWithSubTag = taskIds
      .filter(([hasSubTag]) => hasSubTag)
      .map(([_, index]) => index);
    const newOrder = [...taskWithoutSubTag, ...taskWithSubTag];

    this._rootTasks = newOrder.map((index) => this._rootTasks[index]);
  }

  public makeCounter(length: number) {
    if (this.rootTasks.length !== 1) {
      throw new Error("expected 1 task selected");
    }

    const begin = this.rootTasks[0];
    const isEmpty = !begin.title;

    if (isEmpty && _.isNaN(+begin.title)) {
      throw new Error("expected number or empty title");
    }

    const start = begin.title ? +begin.title : 1;
    const deep = begin.deep;

    if (isEmpty) {
      begin.title = `${start}`;
    }

    if (begin.status === TaskStatus.Todo) {
      length--;
    }

    Array.from({ length }).forEach((dummy, index) => {
      const title = `${index + start + 1}`;
      const task = new Task({
        title,
        status: TaskStatus.Todo,
        tags: [],
        date: null,
        deep,
      });

      this.rootTasks.push(task);
    });
  }
}
