import { modThree } from "../src/modThree";

describe("Modulo Three", () => {
  it("modThree should return the correct answer for positive integers upto 1000", () => {
    for (let i = 0; i < 1000; i++) {
      const binaryString: string = (i >>> 0).toString(2);
      const expectedResult: number = i % 3;
      const result: number = modThree(binaryString);
      expect(result).toEqual(expectedResult);
    }
  })

  it("empty input string should throw error", () => {
    const expectedErrorMessage = 'The input string is empty';
    expect(() => modThree("")).toThrow(expectedErrorMessage);
  });

  it("invalid input string should throw error", () => {
    const expectedErrorMessage = `The input 2 is not valid because it is not part of the input alphabet.`;
    expect(() => modThree("2")).toThrow(expectedErrorMessage);
  });
  
})