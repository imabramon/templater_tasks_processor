import { readFile } from "fs/promises";
import { resolve } from "node:path";
import { Parser } from "../../Parser";
import { TaskParser } from "../../TaskParser";
import { makeTaskList, simpleTask } from "../../testUtils";

test("file to task list", async () => {
  const file = await readFile(
    resolve(__dirname, `./files/task_list.md`),
    "utf-8"
  );

  const list = makeTaskList();
  const parser = new Parser(TaskParser);

  expect(parser.parseTaskFile(file)).toStrictEqual([list, []]);
});

test("task list to file", async () => {
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

const makeTaskListCurved = () => {
  const task121 = simpleTask("task121", null, { deep: 2 });
  const task122 = simpleTask("task122", null, { deep: 2 });

  const subparent13 = simpleTask("subparent13", null, { deep: 1 });
  const task131 = simpleTask("task131");
  subparent13.append(task131);

  const task2 = simpleTask("task2");

  return [task121, task122, subparent13, task2];
};

test("file to task list curved", async () => {
  const file = await readFile(
    resolve(__dirname, `./files/task_list_curved.md`),
    "utf-8"
  );

  const list = makeTaskListCurved();
  const parser = new Parser(TaskParser);
  const result = parser.parseTaskFile(file);
  const errors = result[1];

  if (errors) {
    errors.forEach((error) =>
      console.error(error.message, `in line ${error.row}`)
    );
  }

  expect(result).toStrictEqual([list, []]);
});

test("task list to file curved", async () => {
  const file = `		- [ ] task121
		- [ ] task122
	- [ ] subparent13
		- [ ] task131
- [ ] task2`;

  const list = makeTaskListCurved();
  const parser = new Parser(TaskParser);

  const result = parser.generateTaskFile(list);

  expect(result).toBe(file);
});

const makeTaskListPartical = () => {
  const parent1 = simpleTask("parent1", null, { deep: 1 });

  const task11 = simpleTask("task11");

  const subparent12 = simpleTask("subparent12");
  const task121 = simpleTask("task121");
  const task122 = simpleTask("task122");
  subparent12.append([task121, task122]);

  const subparent13 = simpleTask("subparent13");
  const task131 = simpleTask("task131");
  subparent13.append(task131);

  parent1.append([task11, subparent12, subparent13]);
  const task2 = simpleTask("task2", null, { deep: 1 });
  const task3 = simpleTask("task3", null, { deep: 1 });

  return [parent1, task2, task3];
};

test("file to task list partical", async () => {
  const file = await readFile(
    resolve(__dirname, `./files/task_list_partical.md`),
    "utf-8"
  );

  const list = makeTaskListPartical();
  const parser = new Parser(TaskParser);
  const result = parser.parseTaskFile(file);
  const errors = result[1];

  if (errors) {
    errors.forEach((error) =>
      console.error(error.message, `in line ${error.row}`)
    );
  }

  expect(result).toStrictEqual([list, []]);
});

test("task list to file partical", async () => {
  const file = `	- [ ] parent1
		- [ ] task11
		- [ ] subparent12
			- [ ] task121
			- [ ] task122
		- [ ] subparent13
			- [ ] task131
	- [ ] task2
	- [ ] task3`;

  const list = makeTaskListPartical();
  const parser = new Parser(TaskParser);

  const result = parser.generateTaskFile(list);

  expect(result).toEqual(file);
});
