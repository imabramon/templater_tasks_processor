/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { TaskList } from "../../TaskList";
import {
  MockTempleter,
  prepareTest,
  readFileSyncNormilized,
  Test,
  testGenerator,
} from "../../testUtils";
import { TaskStatus } from "../../Task";

const MAKE_FILE = false;

const testFn = (testCase: Test<[string, string]>) => {
  const [startFile, endFile] = testCase.args;

  test(testCase.name, () => {
    const tp = new MockTempleter(startFile);
    const taskList = new TaskList(tp);

    taskList.filter((task) => task.status !== TaskStatus.Todo);

    const result = taskList.toString();
    const expected = readFileSyncNormilized(endFile, "utf8");

    if (MAKE_FILE) {
      writeFileSync(
        resolve(__dirname, "files", `${testCase.name}_result.md`),
        result,
        { encoding: "utf-8" }
      );
    }

    expect(result).toEqual(expected);
  });
};

const testCases: Test<[string, string]>[] = [
  {
    name: "simple",
    args: ["filter_start.md", "filter_end.md"],
  },
];

testGenerator(
  testCases,
  testFn,
  resolve(__dirname, "files"),
  "TaskList.filter: ",
  prepareTest
);
