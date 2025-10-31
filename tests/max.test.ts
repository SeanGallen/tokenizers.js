import { max } from "../src/utils/maths";

describe("max", () => {
  describe("number arrays", () => {
    it("should find maximum in positive numbers", () => {
      expect(max([5, 2, 8, 1, 9])).toEqual([9, 4]);
    });

    it("should find maximum in negative numbers", () => {
      expect(max([-5, -2, -8, -1, -9])).toEqual([-1, 3]);
    });

    it("should find maximum in mixed numbers", () => {
      expect(max([5, -2, 8, -10, 9])).toEqual([9, 4]);
    });

    it("should return first element if array has one element", () => {
      expect(max([42])).toEqual([42, 0]);
    });

    it("should return first occurrence when multiple maximums exist", () => {
      expect(max([3, 9, 5, 9, 2])).toEqual([9, 1]);
    });

    it("should throw error for empty array", () => {
      expect(() => max([])).toThrow("Array must not be empty");
    });
  });

  describe("bigint arrays", () => {
    it("should find maximum in bigint array", () => {
      expect(max([5n, 2n, 8n, 1n, 9n])).toEqual([9n, 4]);
    });

    it("should find maximum in negative bigint array", () => {
      expect(max([-5n, -2n, -8n, -1n, -9n])).toEqual([-1n, 3]);
    });

    it("should return first element if bigint array has one element", () => {
      expect(max([42n])).toEqual([42n, 0]);
    });
  });

  describe("typed arrays", () => {
    it("should find maximum in Int32Array", () => {
      const arr = new Int32Array([5, 2, 8, 1, 9]);
      expect(max(arr)).toEqual([9, 4]);
    });

    it("should find maximum in Float64Array", () => {
      const arr = new Float64Array([5.5, 2.2, 8.8, 1.1, 9.9]);
      expect(max(arr)).toEqual([9.9, 4]);
    });

    it("should find maximum in Uint8Array", () => {
      const arr = new Uint8Array([5, 2, 8, 1, 9]);
      expect(max(arr)).toEqual([9, 4]);
    });

    it("should find maximum in BigInt64Array", () => {
      const arr = new BigInt64Array([5n, 2n, 8n, 1n, 9n]);
      expect(max(arr)).toEqual([9n, 4]);
    });
  });
});
