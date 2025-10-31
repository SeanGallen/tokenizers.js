import { min } from "../src/utils/maths";

describe("min", () => {
  describe("number arrays", () => {
    it("should find minimum in positive numbers", () => {
      expect(min([5, 2, 8, 1, 9])).toEqual([1, 3]);
    });

    it("should find minimum in negative numbers", () => {
      expect(min([-5, -2, -8, -1, -9])).toEqual([-9, 4]);
    });

    it("should find minimum in mixed numbers", () => {
      expect(min([5, -2, 8, -10, 9])).toEqual([-10, 3]);
    });

    it("should return first element if array has one element", () => {
      expect(min([42])).toEqual([42, 0]);
    });

    it("should return first occurrence when multiple minimums exist", () => {
      expect(min([3, 1, 5, 1, 2])).toEqual([1, 1]);
    });

    it("should throw error for empty array", () => {
      expect(() => min([])).toThrow("Array must not be empty");
    });
  });

  describe("bigint arrays", () => {
    it("should find minimum in bigint array", () => {
      expect(min([5n, 2n, 8n, 1n, 9n])).toEqual([1n, 3]);
    });

    it("should find minimum in negative bigint array", () => {
      expect(min([-5n, -2n, -8n, -1n, -9n])).toEqual([-9n, 4]);
    });

    it("should return first element if bigint array has one element", () => {
      expect(min([42n])).toEqual([42n, 0]);
    });
  });

  describe("typed arrays", () => {
    it("should find minimum in Int32Array", () => {
      const arr = new Int32Array([5, 2, 8, 1, 9]);
      expect(min(arr)).toEqual([1, 3]);
    });

    it("should find minimum in Float64Array", () => {
      const arr = new Float64Array([5.5, 2.2, 8.8, 1.1, 9.9]);
      expect(min(arr)).toEqual([1.1, 3]);
    });

    it("should find minimum in Uint8Array", () => {
      const arr = new Uint8Array([5, 2, 8, 1, 9]);
      expect(min(arr)).toEqual([1, 3]);
    });

    it("should find minimum in BigInt64Array", () => {
      const arr = new BigInt64Array([5n, 2n, 8n, 1n, 9n]);
      expect(min(arr)).toEqual([1n, 3]);
    });
  });
});
