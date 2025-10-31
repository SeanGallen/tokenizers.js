import { Callable } from "@utils";
import { TokenizerConfigPostProcessor } from "@static/tokenizer";

export interface PostProcessedOutput {
  tokens: string[];
  token_type_ids?: number[];
}

/**
 * Base class for post-processors.
 * @extends Callable
 */
class PostProcessor extends Callable<
  [string[], ...any[]],
  PostProcessedOutput
> {
  config: TokenizerConfigPostProcessor;

  /**
   * @param config The configuration for the post-processor.
   */
  constructor(config: TokenizerConfigPostProcessor) {
    super();
    this.config = config;
  }

  /**
   * Method to be implemented in subclass to apply post-processing on the given tokens.
   *
   * @param tokens The input tokens to be post-processed.
   * @param args Additional arguments required by the post-processing logic.
   * @returns The post-processed tokens.
   * @throws {Error} If the method is not implemented in subclass.
   */
  post_process(tokens: string[], ...args: any[]): PostProcessedOutput {
    throw new Error("post_process should be implemented in subclass.");
  }

  /**
   * Alias for {@link PostProcessor#post_process}.
   * @param tokens The text or array of texts to post-process.
   * @param args Additional arguments required by the post-processing logic.
   * @returns The post-processed tokens.
   */
  _call(tokens: string[], ...args: any[]): PostProcessedOutput {
    return this.post_process(tokens, ...args);
  }
}

export default PostProcessor;
