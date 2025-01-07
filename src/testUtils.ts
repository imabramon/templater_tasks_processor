import { Task, TaskCreateParams, TaskStatus } from "./Task";

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
