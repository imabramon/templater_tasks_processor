/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from "fs";
import { Templeter } from "./Selector";
import { Task, TaskCreateParams, TaskStatus } from "./Task";
import { resolve } from "path";

export const simpleTask = (
  title: string,
  parent: Task | null = null,
  options?: Partial<Omit<TaskCreateParams, "title">>
) =>
  new Task(
    {
      title,
      status: TaskStatus.Todo,
      date: null,
      tags: [],
      ...(options ?? {}),
    },
    parent
  );

export const makeTaskList = () => {
  const parent1 = simpleTask("parent1");

  const task11 = simpleTask("task11");

  const subparent12 = simpleTask("subparent12");
  const task121 = simpleTask("task121");
  const task122 = simpleTask("task122");
  subparent12.append([task121, task122]);

  const subparent13 = simpleTask("subparent13");
  const task131 = simpleTask("task131");
  subparent13.append(task131);

  parent1.append([task11, subparent12, subparent13]);
  const task2 = simpleTask("task2");
  const task3 = simpleTask("task3");

  return [parent1, task2, task3];
};

export class MockTempleter implements Templeter {
  private _mockData: string;
  constructor(path: string) {
    this._mockData = readFileSync(path, {
      encoding: "utf8",
    });
  }

  getSelection() {
    return this._mockData;
  }

  public get file() {
    return { selection: () => this._mockData };
  }
}

export const normalize = (str: string) => str.replace(/\r\n/g, "\n");

export interface Test<T extends any[]> {
  name: string;
  args: T;
}

export type TestPreparator<T extends any[], R extends any[]> = (
  original: Test<T>,
  testFilesPath: string,
  prefix?: string
) => Test<R>;

export const prepareTest: TestPreparator<[string, string], [string, string]> = (
  original,
  testFilesPath,
  prefix = ""
): Test<[string, string]> => {
  const name = original.name;

  return {
    name: `${prefix}${name}`,
    args: original.args.map((file) => resolve(testFilesPath, file)) as [
      string,
      string,
    ],
  };
};

export const testGenerator = <T extends any[], R extends any[]>(
  testCases: Test<T>[],
  fn: (testCase: Test<R>) => void,
  testFilesPath: string,
  prefix?: string,
  preparator?: TestPreparator<T, R>
) => {
  const preparetedTestCases = preparator
    ? testCases.map((test) => preparator(test, testFilesPath, prefix))
    : testCases;

  preparetedTestCases.forEach((testCase) => {
    //@ts-ignore
    fn(testCase);
  });
};

export const readFileSyncNormilized = (
  ...args: Parameters<typeof readFileSync>
) => {
  //@ts-ignore
  return normalize(readFileSync(...args));
};
