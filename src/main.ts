import { testSelector } from "./Selector";
import { TaskList } from "./TaskList";

const exportObsidian = () => {
  return {
    testSelector,
    TaskList,
  };
};

module.exports = exportObsidian;
