import { AnyTypedArray, BigTypedArray, TypedArray } from "@static/types";

/**
 * Returns the value and index of the minimum element in an array.
 * @param arr array of numbers.
 * @returns the value and index of the minimum element, of the form: [valueOfMin, indexOfMin]
 * @throws {Error} If array is empty.
 */
export function min(arr: number[]): [number, number];
export function min(arr: bigint[]): [bigint, number];
export function min(arr: BigTypedArray): [bigint, number];
export function min(
  arr: Exclude<AnyTypedArray, BigTypedArray>,
): [number, number];
export function min(
  arr: number[] | bigint[] | AnyTypedArray,
): [number | bigint, number] {
  if (arr.length === 0) throw new Error("Array must not be empty");
  let min_value = arr[0];
  let index_of_min = 0;
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] < min_value) {
      min_value = arr[i];
      index_of_min = i;
    }
  }
  return [min_value, index_of_min];
}

/**
 * Returns the value and index of the maximum element in an array.
 * @param arr array of numbers.
 * @returns the value and index of the maximum element, of the form: [valueOfMax, indexOfMax]
 * @throws {Error} If array is empty.
 */
export function max(arr: number[]): [number, number];
export function max(arr: bigint[]): [bigint, number];
export function max(arr: TypedArray): [number, number];
export function max(arr: BigTypedArray): [bigint, number];
export function max(
  arr: number[] | bigint[] | TypedArray | BigTypedArray,
): [number | bigint, number] {
  if (arr.length === 0) throw Error("Array must not be empty");
  let max_value = arr[0];
  let index_of_max = 0;
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] > max_value) {
      max_value = arr[i];
      index_of_max = i;
    }
  }
  return [max_value, index_of_max];
}
