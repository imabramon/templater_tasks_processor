import { Task, TaskCreateParams, TaskStatus } from "./Task";
import { TaskParser } from "./TaskParser";
import { generateTests, TestCase } from "./testUtils";

const testTaskToString = async (result: TaskCreateParams, params: string) => {
  const task = new Task(result);
  expect(TaskParser(params)[0]).toEqual(task);
};

const testCases: TestCase<[string], TaskCreateParams>[] = [
  {
    name: "todo task, without tags",
    result: {
      title: "todo task, without tags",
      tags: [],
      status: TaskStatus.Todo,
      date: null,
    },
    args: ["- [ ] todo task, without tags"],
  },
  {
    name: "done task, without tags",
    result: {
      title: "done task, without tags",
      tags: [],
      status: TaskStatus.Done,
      date: new Date("2000-09-11"),
    },
    args: ["- [x] done task, without tags ✅ 2000-09-11"],
  },
  {
    name: "canceled task, without tags",
    result: {
      title: "canceled task, without tags",
      tags: [],
      status: TaskStatus.Canceled,
      date: new Date("2000-09-11"),
    },
    args: ["- [-] canceled task, without tags ❌ 2000-09-11"],
  },
  {
    name: "todo task, with tags",
    result: {
      title: "todo task, with tags",
      tags: ["tag1", "tag2"],
      status: TaskStatus.Todo,
      date: null,
    },
    args: ["- [ ] todo task, with tags #tag1 #tag2"],
  },
  {
    name: "done task, with tags",
    result: {
      title: "done task, with tags",
      tags: ["tag1", "tag2"],
      status: TaskStatus.Done,
      date: new Date("2000-09-11"),
    },
    args: ["- [x] done task, with tags #tag1 #tag2 ✅ 2000-09-11"],
  },
  {
    name: "canceled task, with tags",
    result: {
      title: "canceled task, with tags",
      tags: ["tag1", "tag2"],
      status: TaskStatus.Canceled,
      date: new Date("2000-09-11"),
    },
    args: ["- [-] canceled task, with tags #tag1 #tag2 ❌ 2000-09-11"],
  },
];

generateTests(testCases, testTaskToString);
