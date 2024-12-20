import { Task, TaskCreateParams, TaskStatus } from "./Task";
import { TaskParser } from "./TaskParser";
import { generateTests, TestCase } from "./testUtils";

const taskToString: MapListItem[] = [
  {
    name: "todo task, without tags",
    task: {
      title: "todo task, without tags",
      tags: [],
      status: TaskStatus.Todo,
      date: null,
    },
    str: "- [ ] todo task, without tags",
  },
  {
    name: "done task, without tags",
    task: {
      title: "done task, without tags",
      tags: [],
      status: TaskStatus.Done,
      date: new Date("2000-09-11"),
    },
    str: "- [x] done task, without tags ✅ 2000-09-11",
  },
  {
    name: "canceled task, without tags",
    task: {
      title: "canceled task, without tags",
      tags: [],
      status: TaskStatus.Canceled,
      date: new Date("2000-09-11"),
    },
    str: "- [-] canceled task, without tags ❌ 2000-09-11",
  },
  {
    name: "todo task, with tags",
    task: {
      title: "todo task, with tags",
      tags: ["tag1", "tag2"],
      status: TaskStatus.Todo,
      date: null,
    },
    str: "- [ ] todo task, with tags #tag1 #tag2",
  },
  {
    name: "done task, with tags",
    task: {
      title: "done task, with tags",
      tags: ["tag1", "tag2"],
      status: TaskStatus.Done,
      date: new Date("2000-09-11"),
    },
    str: "- [x] done task, with tags #tag1 #tag2 ✅ 2000-09-11",
  },
  {
    name: "canceled task, with tags",
    task: {
      title: "canceled task, with tags",
      tags: ["tag1", "tag2"],
      status: TaskStatus.Canceled,
      date: new Date("2000-09-11"),
    },
    str: "- [-] canceled task, with tags #tag1 #tag2 ❌ 2000-09-11",
  },
];

const testStringToTask = async (result: TaskCreateParams, params: string) => {
  const task = new Task(result);
  const parser = new TaskParser();
  expect(parser.stringToEntity(params)[0]).toEqual(task);
};

const testTaskToString = async (result: string, params: TaskCreateParams) => {
  const task = new Task(params);
  const parser = new TaskParser();
  expect(parser.entityToString(task)).toEqual(result);
};

type MapListItem = {
  name: string;
  task: TaskCreateParams;
  str: string;
};

type MapListToTestCase<TestArgs extends unknown[], Result> = (
  name: string,
  map: MapListItem[]
) => TestCase<TestArgs, Result>[];

const mapToTaskTestCases: MapListToTestCase<[string], TaskCreateParams> = (
  name,
  map
) => {
  return map.map(({ name: caseName, task, str }) => ({
    name: `${name}: ${caseName}`,
    args: [str],
    result: task,
  }));
};
const mapToStringTestCases: MapListToTestCase<[TaskCreateParams], string> = (
  name,
  map
) => {
  return map.map(({ name: caseName, task, str }) => ({
    name: `${name}: ${caseName}`,
    args: [task],
    result: str,
  }));
};

generateTests(
  mapToTaskTestCases("parse string to task", taskToString),
  testStringToTask
);
generateTests(
  mapToStringTestCases("parse task to string", taskToString),
  testTaskToString
);
