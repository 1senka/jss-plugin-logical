import { expect } from "chai";
import jssLogical from "./main";

const { create, sheets } = require("jss");
const jssPresetDefault = require("jss-preset-default").default;
const top = 1,
  right = 2,
  bottom = 3,
  left = 4;

describe("jss-logical", () => {
  let jss: any;

  beforeEach(() => {
    jss = create().use(jssLogical());
  });

  afterEach(() => {
    sheets.registry.forEach((sheet: any) => sheet.detach());
    sheets.reset();
  });

  describe("simple usage", () => {
    let sheet: any;

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: { "padding-left": "1px" },
        b: { padding: 2 },
        c: { margin: "30px" },
        d: { margin: "30px !important" },
      });
    });

    it("should add rules", () => {
      expect(sheet.getRule("a")).to.be.ok;
    });

    it("should generate correct CSS", () => {
      expect(sheet.toString()).to.be.equals(
        [
          ".a-0-2-1 {",
          "  padding-inline-start: 1px;",
          "}",
          ".b-0-2-2 {",
          "  padding: 2;",
          "}",
          ".c-0-2-3 {",
          "  margin: 30px;",
          "}",
          ".d-0-2-4 {",
          "  margin: 30px !important;",
          "}",
        ].join("\n")
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
      jss = create().use(jssLogical());
      sheet = jss.createStyleSheet({
        button: {
          padding: [top, right, bottom, left],
          margin: "1px 2px 3px 4px",
        },
        button2: {
          padding: [1, 2],
          margin: "1px 2px 4px !important",
        },
        button3: {
          padding: [top, right, bottom, left + "px !important"],
          margin: "1px 2px 3px 4px",
        },
      });
    });

    it("should be logical properties", () => {
      expect(sheet.toString()).to.be.equals(
        [
          ".button-0-6-1 {",
          `  padding-block-start: ${top}px;`,
          `  padding-inline-end: ${right}px;`,
          `  padding-inline-start: ${left}px;`,
          `  padding-block-end: ${bottom}px;`,
          `  margin-block-start: ${top}px;`,
          `  margin-inline-end: ${right}px;`,
          `  margin-inline-start: ${left}px;`,
          `  margin-block-end: ${bottom}px;`,
          "}",
          ".button2-0-6-2 {",
          "  padding-block: 1px;",
          "  padding-inline: 2px;",
          "  margin-block-start: 1px !important;",
          "  margin-inline: 2px !important;",
          "  margin-block-end: 4px !important;",
          "}",
          ".button3-0-6-3 {",
          `  padding-block-start: ${top}px;`,
          `  padding-inline-end: ${right}px;`,
          `  padding-inline-start: ${left}px !important;`,
          `  padding-block-end: ${bottom}px;`,
          `  margin-block-start: ${top}px;`,
          `  margin-inline-end: ${right}px;`,
          `  margin-inline-start: ${left}px;`,
          `  margin-block-end: ${bottom}px;`,
          "}",
        ].join("\n")
      );
    });
  });

  describe("array properties", () => {
    let sheet: any;

    beforeEach(() => {
      jss = create().use(jssLogical());
      sheet = jss.createStyleSheet({
        button: {
          padding: [top, right, bottom, left],
          margin: `1px 2px 3px 4px`,
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
          `  padding-block-start: ${top}px;`,
          `  padding-inline-end: ${right}px;`,
          `  padding-inline-start: ${left}px;`,
          `  padding-block-end: ${bottom}px;`,
          `  margin-block-start: ${top}px;`,
          `  margin-inline-end: ${right}px;`,
          `  margin-inline-start: ${left}px;`,
          `  margin-block-end: ${bottom}px;`,
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
      jss = create().use(...jssPresetDefault().plugins, jssLogical());
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
      jss = create().use(jssLogical());
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

  describe("global and font-face rule", () => {
    let sheet: any;

    beforeEach(() => {
      jss = create().use(...jssPresetDefault().plugins, jssLogical());
      sheet = jss.createStyleSheet({
        "@global": {
          "@font-face": [
            {
              fontFamily: "Arial",
              src: 'url(/font/Arial.woff2) format("woff2")',
            },
            {
              fontFamily: "Roboot",
              src: 'url(/font/Roboot.woff2) format("woff2")',
            },
          ],
          "@media(min-width: 480px)": {
            body: {
              padding: [10, 20, 30, 40],
            },
          },
          body: {
            padding: [top, right, bottom, left],
          },
          "body-no-flip": {
            flip: false,
            padding: [top, right, bottom, left],
          },
        },
        button: {
          padding: [top, right, bottom, left],
          margin: [top, right, bottom, left],
          border: [1, "solid", "red"],
        },
        "button-no-flip": {
          flip: false,
          padding: [top, right, bottom, left],
          margin: [top, right, bottom, left],
        },
      });
    });

    it("should generate space or comma separated values", () => {
      expect(sheet.toString()).to.be.equals(
        [
          "@font-face {",
          "  font-family: Arial;",
          '  src: url(/font/Arial.woff2) format("woff2");',
          "}",
          "@font-face {",
          "  font-family: Roboot;",
          '  src: url(/font/Roboot.woff2) format("woff2");',
          "}",
          "@media(min-width: 480px) {",
          "  body {",
          "    padding-block-start: 10px;",
          "    padding-inline-end: 20px;",
          "    padding-inline-start: 40px;",
          "    padding-block-end: 30px;",
          "  }",
          "}",
          "body {",
          `  padding-block-start: ${top}px;`,
          `  padding-inline-end: ${right}px;`,
          `  padding-inline-start: ${left}px;`,
          `  padding-block-end: ${bottom}px;`,
          "}",
          "body-no-flip {",
          "  padding: 1px 2px 3px 4px;",
          "}",
          ".button-0-16-1 {",
          "  border: 1px solid red;",
          `  margin-block-start: ${top}px;`,
          `  margin-inline-end: ${right}px;`,
          `  margin-inline-start: ${left}px;`,
          `  margin-block-end: ${bottom}px;`,
          `  padding-block-start: ${top}px;`,
          `  padding-inline-end: ${right}px;`,
          `  padding-inline-start: ${left}px;`,
          `  padding-block-end: ${bottom}px;`,
          "}",
          ".button-no-flip-0-16-2 {",
          "  margin: 1px 2px 3px 4px;",
          "  padding: 1px 2px 3px 4px;",
          "}",
        ].join("\n")
      );
    });
  });
});
