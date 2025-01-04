import { parseHashTags, pushUnion } from "./utils";

test("union push", () => {
  const origin = [1, 2, 3, 4];
  const toPush1 = [2, 5];
  const toPush2 = [2, 3];
  const toPush3 = [5, 6];

  expect(pushUnion(origin, toPush1)).toEqual([1, 2, 3, 4, 5]);
  expect(pushUnion(origin, toPush2)).toEqual([1, 2, 3, 4]);
  expect(pushUnion(origin, toPush3)).toEqual([1, 2, 3, 4, 5, 6]);
});

test("parse hashgtags", () => {
  const str = "#tag1 tag2  tag3 # ";

  expect(parseHashTags(str)).toEqual(["tag1", "tag2", "tag3"]);
});
