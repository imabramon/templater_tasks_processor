/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { TaskList } from "../../TaskList";
import {
  MockTempleter,
  normalize,
  prepareTest,
  Test,
  testGenerator,
} from "../../testUtils";

const MAKE_FILE = false;

const testFn = (testCase: Test<[string, string]>) => {
  const [startFile, endFile] = testCase.args;

  test(testCase.name, () => {
    const tp = new MockTempleter(startFile);
    const taskList = new TaskList(tp);

    taskList.addTags("tag");

    const result = taskList.toString();
    const expected = readFileSync(endFile, "utf8");

    if (MAKE_FILE) {
      writeFileSync(
        resolve(__dirname, "files", `${testCase.name}_result.md`),
        result,
        { encoding: "utf-8" }
      );
    }

    expect(result).toEqual(normalize(expected));
  });
};

const testCases: Test<[string, string]>[] = [
  {
    name: "simple",
    args: ["add_tags_simple_start.md", "add_tags_simple_end.md"],
  },
  {
    name: "partical",
    args: ["add_tags_partical_start.md", "add_tags_partical_end.md"],
  },
  {
    name: "curved",
    args: ["add_tags_curved_start.md", "add_tags_curved_end.md"],
  },
];

testGenerator(
  testCases,
  testFn,
  resolve(__dirname, "files"),
  "add tags: ",
  prepareTest
);
