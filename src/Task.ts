import { TreeNode } from "./Parser";
import { pushUnion, removeBy } from "./utils";

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
  deep?: number;
}

export class Task implements TreeNode {
  private _children: Task[] = [];
  private _parent: Task | null;
  public title: string;
  private _tags: Tag[];
  private _status: TaskStatus;
  private _date: Date | null;
  public deep: number;

  public get tags() {
    return this._tags;
  }
  public get status() {
    return this._status;
  }
  public set status(s: TaskStatus) {
    this._status = s;
  }
  public get date() {
    return this._date;
  }

  public get parent() {
    return this._parent;
  }

  constructor(p: TaskCreateParams, parent: Task | null = null) {
    this.title = p.title;
    this._tags = p.tags;
    this._date = p.date;
    this._status = p.status;
    this._parent = parent;
    this.deep = p.deep ?? 0;
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
    fn(this, deep + this.deep);
    if (!this._children.length) return;

    this._children.forEach((child) => {
      child.forEach(fn, deep + this.deep + 1);
    });
  }

  public addTags(tags: string[]) {
    this._tags = pushUnion(this._tags, tags);
  }

  public removeTags(tags: string[]) {
    this._tags = removeBy(this._tags, tags);
  }

  public get hasChildren(): boolean {
    return !!this._children.length;
  }

  public removeChild(task: Task) {
    this._children = this._children.filter((t) => t !== task);
  }

  public remove() {
    const parent = this._parent;

    if (!parent) return;

    parent.removeChild(this);
  }

  public filter(fn: (node: Task) => boolean) {
    if (this._children.length) {
      this._children.forEach((child) => child.filter(fn));
    }

    if (!this._children.length && !fn(this)) {
      this.remove();
    }
  }
}
