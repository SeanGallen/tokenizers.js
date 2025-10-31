import PreTokenizer from "@core/PreTokenizer";
import { TokenizerConfigPreTokenizerSequence } from "@static/tokenizer";
import create_pre_tokenizer from "./create_pre_tokenizer";

/**
 * A pre-tokenizer that applies a sequence of pre-tokenizers to the input text.
 * @extends PreTokenizer
 */
class PreTokenizerSequence extends PreTokenizer {
  tokenizers: (PreTokenizer | null)[];

  /**
   * Creates an instance of PreTokenizerSequence.
   * @param config The configuration object for the pre-tokenizer sequence.
   */
  constructor(config: TokenizerConfigPreTokenizerSequence) {
    super();
    this.tokenizers = (config.pretokenizers ?? []).map((x) =>
      create_pre_tokenizer(x),
    );
  }

  /**
   * Applies each pre-tokenizer in the sequence to the input text in turn.
   * @param text The text to pre-tokenize.
   * @param options Additional options for the pre-tokenization logic.
   * @returns The pre-tokenized text.
   */
  pre_tokenize_text(text: string, options?: any): string[] {
    // Use reduce to apply each tokenizer to the text
    return this.tokenizers.reduce(
      (pre_tokenized_text, tokenizer) => {
        return tokenizer
          ? tokenizer.pre_tokenize(pre_tokenized_text, options)
          : pre_tokenized_text;
      },
      [text] as string[],
    );
  }
}

export default PreTokenizerSequence;
