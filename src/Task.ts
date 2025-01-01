import { TreeNode } from "./Parser";

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

export class Task implements TreeNode {
  private _children: Task[] = [];
  private _parent: Task | null;
  private _title: string;
  private _tags: Tag[];
  private _status: TaskStatus;
  private _date: Date | null;

  public get title() {
    return this._title;
  }
  public get tags() {
    return this._tags;
  }
  public get status() {
    return this._status;
  }
  public get date() {
    return this._date;
  }

  constructor(p: TaskCreateParams, parent: Task | null = null) {
    this._title = p.title;
    this._tags = p.tags;
    this._date = p.date;
    this._status = p.status;
    this._parent = parent;
  }

  public append(children: Task | Task[]) {
    if (Array.isArray(children)) {
      children.forEach((child) => this.appendChild(child));
      return;
    }

    this.appendChild(children);
  }

  // @ts-ignore
  public appendChild(task: Task) {
    task._parent = this;
    this._children.push(task);
  }

  public forEach(fn: (node: TreeNode, deep?: number) => void, deep = 0) {
    fn(this, deep);
    if (!this._children.length) return;

    this._children.forEach((child) => {
      child.forEach(fn, deep + 1);
    });
  }
}
