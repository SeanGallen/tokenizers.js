/**
 * A base class for creating callable objects.
 * See [here](https://stackoverflow.com/q/76073890) for more information.
 */
interface Callable<TArgs extends any[] = any[], TReturn = any> {
  (...args: TArgs): TReturn;
}

class Callable<TArgs extends any[] = any[], TReturn = any> {
  /**
   * Creates a new instance of the Callable class.
   */
  constructor() {
    /**
     * Creates a closure that delegates to a private method '_call' with the given arguments.
     */
    const closure = function (
      this: Callable<TArgs, TReturn>,
      ...args: TArgs
    ): TReturn {
      return closure._call(...args);
    } as any;
    return Object.setPrototypeOf(closure, new.target.prototype);
  }

  /**
   * This method should be implemented in subclasses to provide the
   * functionality of the callable object.
   *
   * @param args Arguments passed to the callable
   * @throws {Error} If the subclass does not implement the `_call` method.
   */
  _call(...args: TArgs): TReturn {
    throw new Error("Must implement _call method in subclass");
  }
}

export default Callable;
