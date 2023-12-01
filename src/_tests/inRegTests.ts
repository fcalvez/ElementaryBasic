import { assertMatch, assertNotMatch } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { ElbasInterpreter } from "../basicRunner.ts";

Deno.test("Test instructions regex", async (t) => {
  await t.step("comments", () => {
    assertMatch("a <- 0 // poaff", ElbasInterpreter.inCommentReg);
    assertMatch(" // poaff", ElbasInterpreter.inCommentReg);
    assertMatch("// poaff", ElbasInterpreter.inCommentReg);
  });
  await t.step("var declaration", () => {
    assertMatch("var a", ElbasInterpreter.inVarReg);
    assertMatch("var abc", ElbasInterpreter.inVarReg);
    assertMatch("var a,b,c", ElbasInterpreter.inVarReg);
    assertMatch("var    abc", ElbasInterpreter.inVarReg);
    assertMatch("var    abc  ", ElbasInterpreter.inVarReg);
    assertMatch("var a , b , c", ElbasInterpreter.inVarReg);
    assertNotMatch("i <- 0", ElbasInterpreter.inVarReg);
  });
  await t.step("affectation", () => {
    assertMatch("a <- 0", ElbasInterpreter.inAssignReg);
    assertMatch("v0 <- v1", ElbasInterpreter.inAssignReg);
    assertMatch("asd <- aff + 32", ElbasInterpreter.inAssignReg);
    assertNotMatch("i < 0", ElbasInterpreter.inAssignReg);
    assertNotMatch(" <- 0", ElbasInterpreter.inAssignReg);
  });
  await t.step("label", () => {
    assertMatch(":loop", ElbasInterpreter.inLabelReg);
    assertMatch(": loop", ElbasInterpreter.inLabelReg);
    assertMatch(": loop around the net", ElbasInterpreter.inLabelReg);
    assertMatch(":1", ElbasInterpreter.inLabelReg);
    assertNotMatch("jumpto :1", ElbasInterpreter.inLabelReg);
  });
  await t.step("print", () => {
    assertMatch("print xyz", ElbasInterpreter.inPrintReg);
    assertMatch("print the lazy fox", ElbasInterpreter.inPrintReg);
  });
  await t.step("jumpto", () => {
    assertMatch("jumpto:label", ElbasInterpreter.inJumptoReg);
    assertMatch("jumpto :label", ElbasInterpreter.inJumptoReg);
    assertMatch("jumpto : label is defined", ElbasInterpreter.inJumptoReg);
  });

});
