import { readFile } from "fs/promises";
import { resolve } from "node:path";
import { Parser } from "./Parser";
import { TaskParser } from "./TaskParser";
import { Task, TaskStatus } from "./Task";
import { writeFileSync } from "fs";
import { format } from "prettier";

const simpleTask = (title: string, parent: Task | null = null) =>
  new Task(
    {
      title,
      status: TaskStatus.Todo,
      date: null,
      tags: [],
    },
    parent
  );

const makeTaskList = () => {
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

test("parser nested", async () => {
  const file = await readFile(
    resolve(__dirname, `./test_files/task_list.md`),
    "utf-8"
  );

  const list = makeTaskList();
  const parser = new Parser(TaskParser);

  expect(parser.parseTaskFile(file)).toStrictEqual([list, []]);
});

test("tasks to string nested", async () => {
  const file = `- [ ] parent1
	- [ ] task11
	- [ ] subparent12
		- [ ] task121
		- [ ] task122
	- [ ] subparent13
		- [ ] task131
- [ ] task2
- [ ] task3`;

  const list = makeTaskList();
  const parser = new Parser(TaskParser);

  const result = parser.generateTaskFile(list);

  expect(result).toBe(file);
});
