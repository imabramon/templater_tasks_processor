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

const MAKE_FILE = true;

const testFn = (testCase: Test<[string, string]>) => {
  const [startFile, endFile] = testCase.args;

  test(testCase.name, () => {
    const tp = new MockTempleter(startFile);
    const taskList = new TaskList(tp);

    taskList.makeCounter(10);

    const result = taskList.toString();
    const expected = readFileSyncNormilized(endFile, "utf8");

    if (MAKE_FILE) {
      writeFileSync(
        resolve(
          __dirname,
          "files",
          `${testCase.debugFileName ?? testCase.name}_result.md`
        ),
        result,
        { encoding: "utf-8" }
      );
    }

    expect(result).toEqual(expected);
  });
};

const testCases: Test<[string, string]>[] = [
  {
    name: "without begin",
    debugFileName: "without_begin",
    args: ["without_begin_start.md", "without_begin_end.md"],
  },
  {
    name: "with begin",
    debugFileName: "with_begin",
    args: ["with_begin_start.md", "with_begin_end.md"],
  },
  {
    name: "with begin",
    debugFileName: "with_begin_2",
    args: ["with_begin_2_start.md", "with_begin_2_end.md"],
  },
  {
    name: "with tabs",
    debugFileName: "with_tabs",
    args: ["with_tabs_start.md", "with_tabs_end.md"],
  },
  {
    name: "first completed",
    debugFileName: "completed",
    args: ["completed_start.md", "completed_end.md"],
  },
];

testGenerator(
  testCases,
  testFn,
  resolve(__dirname, "files"),
  "make counter: ",
  prepareTest
);
