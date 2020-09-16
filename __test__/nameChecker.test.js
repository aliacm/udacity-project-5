import { checkType } from "../src/client/js/nameChecker"

describe("Testing the type check functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkType() function", () => {
           expect(checkType).toBeDefined();
})});