import { TaskList } from "./TaskList";
import { makeTaskList, simpleTask } from "./testUtils";

const makeTaskListWithNamesLength = () => {
  const parent1 = simpleTask("7");

  const task11 = simpleTask("6");

  const subparent12 = simpleTask("11");
  const task121 = simpleTask("7");
  const task122 = simpleTask("7");
  subparent12.append([task121, task122]);

  const subparent13 = simpleTask("11");
  const task131 = simpleTask("7");
  subparent13.append(task131);

  parent1.append([task11, subparent12, subparent13]);
  const task2 = simpleTask("5");
  const task3 = simpleTask("5");

  return [parent1, task2, task3];
};

test("task list foreach", () => {
  const origin = makeTaskList();
  const originList = new TaskList(undefined, origin);

  const result = makeTaskListWithNamesLength();
  const resultList = new TaskList(undefined, result);

  originList.forEach((task) => (task.title = task.title.length.toString()));

  expect(originList.rootTasks).toStrictEqual(resultList.rootTasks);
});

const makeTaskListWithRootTags = () => {
  const parent1 = simpleTask("parent1", null, { tags: ["parent/parent1"] });

  const task11 = simpleTask("task11");

  const subparent12 = simpleTask("subparent12");
  const task121 = simpleTask("task121");
  const task122 = simpleTask("task122");
  subparent12.append([task121, task122]);

  const subparent13 = simpleTask("subparent13");
  const task131 = simpleTask("task131");
  subparent13.append(task131);

  parent1.append([task11, subparent12, subparent13]);

  return [parent1];
};

const makeTaskListWithAllTags = () => {
  const parent1 = simpleTask("parent1", null, { tags: ["parent/parent1"] });

  const task11 = simpleTask("task11", null, {
    tags: ["parent/parent1"],
  });

  const subparent12 = simpleTask("subparent12", null, {
    tags: ["parent/parent1"],
  });
  const task121 = simpleTask("task121", null, {
    tags: ["parent/parent1"],
  });
  const task122 = simpleTask("task122", null, {
    tags: ["parent/parent1"],
  });
  subparent12.append([task121, task122]);

  const subparent13 = simpleTask("subparent13", null, {
    tags: ["parent/parent1"],
  });
  const task131 = simpleTask("task131", null, {
    tags: ["parent/parent1"],
  });
  subparent13.append(task131);

  parent1.append([task11, subparent12, subparent13]);

  return [parent1];
};

test("task list tags like parent", () => {
  const origin = makeTaskListWithRootTags();
  const originList = new TaskList(undefined, origin);

  const result = makeTaskListWithAllTags();
  const resultList = new TaskList(undefined, result);

  originList.tagLikeParent("parent/");

  expect(originList.rootTasks).toStrictEqual(resultList.rootTasks);
});
