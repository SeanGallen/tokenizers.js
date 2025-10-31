import { Callable } from "@utils";
import { TokenizerConfigNormalizer } from "@static/tokenizer";

/**
 * A base class for text normalization.
 * @abstract
 */
class Normalizer extends Callable<[string], string> {
  config: TokenizerConfigNormalizer;

  /**
   * @param config The configuration object for the normalizer.
   */
  constructor(config: TokenizerConfigNormalizer) {
    super();
    this.config = config;
  }

  /**
   * Normalize the input text.
   * @abstract
   * @param text The text to normalize.
   * @returns The normalized text.
   * @throws {Error} If this method is not implemented in a subclass.
   */
  normalize(text: string): string {
    throw new Error("normalize should be implemented in subclass.");
  }

  /**
   * Alias for {@link Normalizer#normalize}.
   * @param text The text to normalize.
   * @returns The normalized text.
   */
  _call(text: string): string {
    return this.normalize(text);
  }
}

export default Normalizer;
