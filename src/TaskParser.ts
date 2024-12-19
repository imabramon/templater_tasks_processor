import { EntityParser } from "./Parser";
import { Task } from "./Task";

const TabRegEx = /^(\t*)/g;
const StatusRegEx = /- \[([ x-])\]/;
const TagRegEx = /#(\w*)/g;
const DateRegEx = /[✅❌]\s(\d{4}-\d{2}-\d{2})/;

export const TaskParser: EntityParser<Task> = (str) => {
  const tabs = TabRegEx.exec(str)?.[1] ?? "";
  const status = Task.getStatusFromSymbol(StatusRegEx.exec(str)?.[1] ?? " ");
  const tags = [...str.matchAll(TagRegEx)].map((match) => match[1]);

  const date = DateRegEx.exec(str)?.[1];
  const title = str
    .replace(TagRegEx, "")
    .replace(StatusRegEx, "")
    .replaceAll(TagRegEx, "")
    .replace(DateRegEx, "")
    .trim();

  return [
    new Task({
      status,
      title,
      tags,
      date: date ? new Date(date) : null,
    }),
    tabs.length,
  ];
};
