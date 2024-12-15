import { Task, TaskCreateParams, TaskStatus } from "./Task";
import { generateTests, TestCase } from "./testUtils";

const testTaskToString = async (result: string, params: TaskCreateParams) => {
  const task = new Task(params);
  expect(task.toString()).toEqual(result);
};

const testCases: TestCase<[TaskCreateParams], string>[] = [
  {
    name: "todo task, without tags",
    args: [
      {
        title: "todo task, without tags",
        tags: [],
        status: TaskStatus.Todo,
        date: null,
      },
    ],
    result: "- [ ] todo task, without tags",
  },
  {
    name: "done task, without tags",
    args: [
      {
        title: "done task, without tags",
        tags: [],
        status: TaskStatus.Done,
        date: new Date("2000-09-11"),
      },
    ],
    result: "- [x] done task, without tags ✅ 2000-09-11",
  },
  {
    name: "canceled task, without tags",
    args: [
      {
        title: "canceled task, without tags",
        tags: [],
        status: TaskStatus.Canceled,
        date: new Date("2000-09-11"),
      },
    ],
    result: "- [-] canceled task, without tags ❌ 2000-09-11",
  },
  {
    name: "todo task, with tags",
    args: [
      {
        title: "todo task, with tags",
        tags: ["tag1", "tag2"],
        status: TaskStatus.Todo,
        date: null,
      },
    ],
    result: "- [ ] todo task, with tags #tag1 #tag2",
  },
  {
    name: "done task, with tags",
    args: [
      {
        title: "done task, with tags",
        tags: ["tag1", "tag2"],
        status: TaskStatus.Done,
        date: new Date("2000-09-11"),
      },
    ],
    result: "- [x] done task, with tags #tag1 #tag2 ✅ 2000-09-11",
  },
  {
    name: "canceled task, with tags",
    args: [
      {
        title: "canceled task, with tags",
        tags: ["tag1", "tag2"],
        status: TaskStatus.Canceled,
        date: new Date("2000-09-11"),
      },
    ],
    result: "- [-] canceled task, with tags #tag1 #tag2 ❌ 2000-09-11",
  },
];

generateTests(testCases, testTaskToString);
