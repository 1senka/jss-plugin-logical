const checkArray = (value: any) => {
  return Array.isArray(value) || typeof value === "string";
};
const manipulateData = (key: string, value: any) => {
  let important = false;
  if (value.includes("!important")) {
    important = true;
    value = value.replace("!important", "");
  }
  if (Array.isArray(value)) {
    value = value.map((i) => String(i) + "px");
  } else {
    value = value.split(" ").filter((i: string) => i !== "");
  }
  value = value.filter((i: string) => i !== "");
  const block = `${key}-block`;
  const blockStart = `${key}-block-start`;
  const blockEnd = `${key}-block-end`;

  const inline = `${key}-inline`;
  const inlineStart = `${key}-inline-start`;
  const inlineEnd = `${key}-inline-end`;

  let res: any = {};
  switch (value.length) {
    case 2:
      res[block] = !important ? value[0] : value[0] + " !important";
      res[inline] = !important ? value[1] : value[1] + " !important";
      return res;
    case 3:
      res[blockStart] = !important ? value[0] : value[0] + " !important";
      res[inline] = !important ? value[1] : value[1] + " !important";
      res[blockEnd] = !important ? value[2] : value[2] + " !important";
      return res;

    case 4:
      res[blockStart] = !important ? value[0] : value[0] + " !important";
      res[inlineEnd] = !important ? value[1] : value[1] + " !important";
      res[inlineStart] = !important ? value[2] : value[2] + " !important";
      res[blockEnd] = !important ? value[3] : value[3] + " !important";
      return res;
  }
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
export default function jssLogical() {
  return {
    onProcessRule: (style: any) => {
      const keys = Object.keys(style.style);
      let hasFlip = keys.find((i) => i === "flip");
      if (!(hasFlip && style.style["flip"] === false)) {
        for (let i in style.style) {
          if (alias[i]) {
            delete Object.assign(style.style, {
              [alias[i]]: style.style[i],
            })[i];
          }
          if (
            (i === "padding" || i === "margin") &&
            checkArray(style.style[i])
          ) {
            Object.assign(style.style, manipulateData(i, style.style[i]));
            delete style.style[i];
          }
          if (i === "justify-content") {
            if (style.style[i] === "right") {
              style.style[i] = "flex-end";
            }
            if (style.style[i] === "left") {
              style.style[i] = "flex-start";
            }
          }
        }
      } else {
        delete style.style["flip"];
      }
    },
  };
}
