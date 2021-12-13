import { expect } from "chai";
import logical from "./main";

const { create, sheets } = require("jss");
// const jssPresetDefault = require("jss-preset-default").default;

describe("jss-logical", () => {
  let jss: any;

  beforeEach(() => {
    jss = create().use(logical());
  });

  afterEach(() => {
    sheets.registry.forEach((sheet: any) => sheet.detach());
    sheets.reset();
  });

  describe("simple usage", () => {
    let sheet: any;

    beforeEach(() => {
      sheet = jss.createStyleSheet({ a: { "padding-left": "1px" } });
    });

    it("should add rules", () => {
      expect(sheet.getRule("a")).to.be.ok;
    });

    it("should generate correct CSS", () => {
      expect(sheet.toString()).to.be.equals(
        [".a-0-2-1 {", "  padding-inline-start: 1px;", "}"].join("\n")
      );
    });
  });
  describe("rule opt-out", () => {
    let sheet: any;

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: { "padding-left": "1px" },
        b: { flip: false, "padding-left": "1px" },
      });
    });

    it("should add rules", () => {
      expect(sheet.getRule("a")).to.be.ok;
      expect(sheet.getRule("b")).to.be.ok;
    });

    it("should generate unchanged CSS and remove the flip prop", () => {
      expect(sheet.toString()).to.be.equals(
        [
          ".a-0-4-1 {",
          "  padding-inline-start: 1px;",
          "}",
          ".b-0-4-2 {",
          "  padding-left: 1px;",
          "}",
        ].join("\n")
      );
    });
  });

  describe("array properties", () => {
    let sheet: any;

    beforeEach(() => {
      jss = create().use(logical());
      sheet = jss.createStyleSheet({
        button: {
          padding: [1, 2, 3, 4],
          margin: "1px 2px 3px 4px",
        },
        button2: {
          padding: [1, 2],
          margin: "1px 2px 4px !important",
        },
      });
    });

    it("should be logical properties", () => {
      expect(sheet.toString()).to.be.equals(
        [
          ".button-0-6-1 {",
          "  padding-block-start: 1px;",
          "  padding-inline-end: 2px;",
          "  padding-inline-start: 3px;",
          "  padding-block-end: 4px;",
          "  margin-block-start: 1px;",
          "  margin-inline-end: 2px;",
          "  margin-inline-start: 3px;",
          "  margin-block-end: 4px;",
          "}",
          ".button2-0-6-2 {",
          "  padding-block: 1px;",
          "  padding-inline: 2px;",
          "  margin-block-start: 1px !important;",
          "  margin-inline: 2px !important;",
          "  margin-block-end: 4px !important;",
          "}",
        ].join("\n")
      );
    });
  });

  describe("array properties", () => {
    let sheet: any;

    beforeEach(() => {
      jss = create().use(logical());
      sheet = jss.createStyleSheet({
        button: {
          padding: [1, 2, 3, 4],
          margin: "1px 2px 3px 4px",
          "justify-content": "right",
        },
        button2: {
          padding: [1, 2],
          margin: "1px 2px 4px !important",
        },
      });
    });

    it("should be logical properties", () => {
      expect(sheet.toString()).to.be.equals(
        [
          ".button-0-8-1 {",
          "  justify-content: end;",
          "  padding-block-start: 1px;",
          "  padding-inline-end: 2px;",
          "  padding-inline-start: 3px;",
          "  padding-block-end: 4px;",
          "  margin-block-start: 1px;",
          "  margin-inline-end: 2px;",
          "  margin-inline-start: 3px;",
          "  margin-block-end: 4px;",
          "}",
          ".button2-0-8-2 {",
          "  padding-block: 1px;",
          "  padding-inline: 2px;",
          "  margin-block-start: 1px !important;",
          "  margin-inline: 2px !important;",
          "  margin-block-end: 4px !important;",
          "}",
        ].join("\n")
      );
    });
  });
});
