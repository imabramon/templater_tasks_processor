export interface TestCase<TestArgs extends unknown[], Result> {
  name: string;
  args: TestArgs;
  result: Result;
}

export const generateTests = <TestArgs extends unknown[], Result>(
  testCases: TestCase<TestArgs, Result>[],
  check: (result: Result, ...args: TestArgs) => Promise<void> | void
) => {
  testCases.forEach((testCase) => {
    test(testCase.name, async () => {
      await check(testCase.result, ...testCase.args);
    });
  });
};
