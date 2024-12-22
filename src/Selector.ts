interface Templeter {
  file: {
    selection: () => string | undefined;
  };
}

interface SelectionManager {
  getSelection: () => string | undefined;
}

export class TemplaterSelector implements SelectionManager {
  public getSelection: () => string | undefined;

  constructor(tp: Templeter) {
    this.getSelection = tp.file.selection;
  }
}

export const testSelector = (tp: Templeter) => {
  const selector = new TemplaterSelector(tp);
  const lines = selector
    .getSelection()
    ?.split("\n")
    ?.map((row) => `${row} Selector Works!`)
    ?.join("\n");

  return lines;
};
