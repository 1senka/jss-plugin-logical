import { expect } from "chai";
import logical from "./main";

const { create, sheets } = require("jss");
const jssPresetDefault = require("jss-preset-default").default;

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
          "  justify-content: flex-end;",
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

  describe("global properties", () => {
    let sheet: any;

    beforeEach(() => {
      jss = create().use(...jssPresetDefault().plugins, logical());
      sheet = jss.createStyleSheet({
        "@global": {
          body: {
            "padding-left": "1px",
          },
        },
      });
    });

    it("should be logical properties", () => {
      expect(sheet.toString()).to.be.equals(
        ["body {", "  padding-inline-start: 1px;", "}"].join("\n")
      );
    });
  });

  describe("jss-logical-all-property", () => {
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
        sheet = jss.createStyleSheet({
          a: {
            "padding-right": "1px",
            "padding-left": "1px",
            "margin-right": "1px",
            "margin-left": "1px",
            "border-left": "1px",
            "border-right": "1px",
            "border-top": "1px",
            "border-bottom": "1px",
            "border-left-width": "1px",
            "border-right-width": "1px",
            "border-top-width": "1px",
            "border-bottom-width": "1px",
            "scroll-margin-right": "1px",
            "scroll-margin-left": "1px",
            "scroll-margin-top": "1px",
            "scroll-margin-bottom": "1px",
            "scroll-padding-right": "1px",
            "scroll-padding-left": "1px",
            "scroll-padding-top": "1px",
            "scroll-padding-bottom": "1px",
          },
        });
      });

      it("should add rules", () => {
        expect(sheet.getRule("a")).to.be.ok;
      });

      it("should generate correct CSS", () => {
        expect(sheet.toString()).to.be.equals(
          [
            ".a-0-14-1 {",
            "  padding-inline-end: 1px;",
            "  padding-inline-start: 1px;",
            "  margin-inline-end: 1px;",
            "  margin-inline-start: 1px;",
            "  border-inline-start: 1px;",
            "  border-inline-end: 1px;",
            "  border-block-start: 1px;",
            "  border-block-end: 1px;",
            "  border-inline-start-width: 1px;",
            "  border-inline-end-width: 1px;",
            "  border-block-start-width: 1px;",
            "  border-block-end-width: 1px;",
            "  scroll-margin-inline-end: 1px;",
            "  scroll-margin-inline-start: 1px;",
            "  scroll-margin-block-start: 1px;",
            "  scroll-margin-block-end: 1px;",
            "  scroll-padding-inline-end: 1px;",
            "  scroll-padding-inline-start: 1px;",
            "  scroll-padding-block-start: 1px;",
            "  scroll-padding-block-end: 1px;",
            "}",
          ].join("\n")
        );
      });
    });
  });
});
