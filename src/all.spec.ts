// import { expect } from "chai";
// import logical from "./main";

// const { create, sheets } = require("jss");

// describe("jss-logical-all-property", () => {
//   let jss: any;

//   beforeEach(() => {
//     jss = create().use(logical());
//   });

//   afterEach(() => {
//     sheets.registry.forEach((sheet: any) => sheet.detach());
//     sheets.reset();
//   });

//   describe("simple usage", () => {
//     let sheet: any;

//     beforeEach(() => {
//       sheet = jss.createStyleSheet({
//         a: {
//           "padding-right": "1px",
//           "padding-left": "1px",
//           "margin-right": "1px",
//           "margin-left": "1px",
//           "border-left": "1px",
//           "border-right": "1px",
//           "border-top": "1px",
//           "border-bottom": "1px",
//           "border-left-width": "1px",
//           "border-right-width": "1px",
//           "border-top-width": "1px",
//           "border-bottom-width": "1px",
//           "scroll-margin-right": "1px",
//           "scroll-margin-left": "1px",
//           "scroll-margin-top": "1px",
//           "scroll-margin-bottom": "1px",
//           "scroll-padding-right": "1px",
//           "scroll-padding-left": "1px",
//           "scroll-padding-top": "1px",
//           "scroll-padding-bottom": "1px",
//         },
//       });
//     });

//     it("should add rules", () => {
//       expect(sheet.getRule("a")).to.be.ok;
//     });

//     it("should generate correct CSS", () => {
//       expect(sheet.toString()).to.be.equals(
//         [
//           ".a-0-2-1 {",
//           "  padding-inline-start: 1px;",
//           "  padding-inline-end: 1px;",
//           "  margin-inline-end: 1px;",
//           "  margin-inline-start: 1px;",
//           "  border-inline-start: 1px;",
//           "  border-inline-end: 1px;",
//           "  border-block-start: 1px;",
//           "  border-block-end: 1px;",
//           "  border-inline-start-width:1px;",
//           "  border-inline-end-width: 1px;",
//           "  border-block-start-width: 1px;",
//           "  border-block-end-width: 1px;",
//           "  scroll-margin-inline-end: 1px;",
//           "  scroll-margin-inline-start: 1px;",
//           "  scroll-margin-block-start: 1px;",
//           "  scroll-margin-block-end: 1px;",
//           "  scroll-padding-inline-end: 1px;",
//           "  scroll-padding-inline-start: 1px;",
//           "  scroll-padding-block-start: 1px;",
//           "  scroll-padding-block-end: 1px; ",
//           "}",
//         ].join("\n")
//       );
//     });
//   });
// });
