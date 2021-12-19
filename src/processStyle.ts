const checkArray = (value: any) => {
  return Array.isArray(value) || typeof value === "string";
};

const addImportantToProperties = (key: string, res: Record<string, string>) => {
  let value = res[key];
  let array;

  if (Array.isArray(value)) {
    array = value.map((i) => (typeof i === "number" ? String(i) + "px" : i));
  } else {
    let important = false;

    if (value.includes("!important")) {
      important = true;
      value = value.replace("!important", "");
    }

    array = value.split(" ").filter((i: string) => i !== "");
    if (important) {
      array = array.map((i: string) => i + " !important");
    }
  }
  array = array.filter((i: string) => i !== "");

  const block = `${key}-block`;
  const blockStart = `${key}-block-start`;
  const blockEnd = `${key}-block-end`;

  const inline = `${key}-inline`;
  const inlineStart = `${key}-inline-start`;
  const inlineEnd = `${key}-inline-end`;

  switch (array.length) {
    case 1:
      res[key] = array[0];
      break;

    case 2:
      res[block] = array[0];
      res[inline] = array[1];
      delete res[key];

      break;
    case 3:
      res[blockStart] = array[0];
      res[inline] = array[1];
      res[blockEnd] = array[2];
      delete res[key];

      break;

    case 4:
      res[blockStart] = array[0];
      res[inlineEnd] = array[1];
      res[inlineStart] = array[2];
      res[blockEnd] = array[3];
      delete res[key];

      break;
  }
  return res;
};
const alias: Record<string, string> = {
  ["padding-right"]: "padding-inline-end",
  ["padding-left"]: "padding-inline-start",
  ["margin-right"]: "margin-inline-end",
  ["margin-left"]: "margin-inline-start",
  ["border-left"]: "border-inline-start",
  ["border-right"]: "border-inline-end",
  ["border-top"]: "border-block-start",
  ["border-bottom"]: "border-block-end",
  ["border-left-color"]: "border-inline-start-color",
  ["border-right-color"]: "border-inline-end-color",
  ["border-top-color"]: "border-block-start-color",
  ["border-bottom-color"]: "border-block-end-color",
  ["border-left-width"]: "border-inline-start-width",
  ["border-right-width"]: "border-inline-end-width",
  ["border-top-width"]: "border-block-start-width",
  ["border-bottom-width"]: "border-block-end-width",
  ["border-left-style"]: "border-inline-start-style",
  ["border-right-style"]: "border-inline-end-style",
  ["border-top-style"]: "border-block-start-style",
  ["border-bottom-style"]: "border-block-end-style",
  ["scroll-margin-right"]: "scroll-margin-inline-end",
  ["scroll-margin-left"]: "scroll-margin-inline-start",
  ["scroll-margin-top"]: "scroll-margin-block-start",
  ["scroll-margin-bottom"]: "scroll-margin-block-end",
  ["scroll-padding-right"]: "scroll-padding-inline-end",
  ["scroll-padding-left"]: "scroll-padding-inline-start",
  ["scroll-padding-top"]: "scroll-padding-block-start",
  ["scroll-padding-bottom"]: "scroll-padding-block-end",
  ["right"]: "inset-inline-end",
  ["left"]: "inset-inline-start",
  ["top"]: "inset-block-start",
  ["bottom"]: "inset-block-end",
};

const aliasValues: Record<string, Record<string, string>> = {
  ["justify-content"]: {
    right: "flex-end",
    left: "flex-start",
  },
};

export default function onProcessStyle(_style: any): any {
  if (Array.isArray(_style)) {
    return _style.map((i) => onProcessStyle(i));
  }

  let style = { ..._style };

  if (style["flip"] === undefined || style["flip"] === true) {
    for (let i in style) {
      if (alias[i]) {
        style[alias[i]] = style[i];
        delete style[i];
      }
      if ((i === "padding" || i === "margin") && checkArray(style[i])) {
        style = addImportantToProperties(i, style);
      }
      if (aliasValues[i]) {
        if (aliasValues[i][style[i]]) {
          style[i] = aliasValues[i][style[i]];
        }
      }
    }
  }
  delete style["flip"];

  return style;
}
