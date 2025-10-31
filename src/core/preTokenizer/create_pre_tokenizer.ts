import PreTokenizer from "../PreTokenizer";
import ByteLevelPreTokenizer from "./ByteLevelPreTokenizer";
import WhitespacePreTokenizer from "./WhitespacePreTokenizer";
import MetaspacePreTokenizer from "./MetaspacePreTokenizer";
import SplitPreTokenizer from "./SplitPreTokenizer";
import PunctuationPreTokenizer from "./PunctuationPreTokenizer";
import DigitsPreTokenizer from "./DigitsPreTokenizer";
import BertPreTokenizer from "./BertPreTokenizer";
import ReplacePreTokenizer from "./ReplacePreTokenizer";
import PreTokenizerSequence from "./PreTokenizerSequence";
import WhitespaceSplit from "./WhitespaceSplit";
import { TokenizerConfigPreTokenizer } from "@static/tokenizer";

function create_pre_tokenizer(
  config: TokenizerConfigPreTokenizer,
): PreTokenizer | null {
  if (config === null) return null;

  switch (config.type) {
    case "BertPreTokenizer":
      return new BertPreTokenizer();
    case "Sequence":
      return new PreTokenizerSequence(config);
    case "Whitespace":
      return new WhitespacePreTokenizer();
    case "WhitespaceSplit":
      return new WhitespaceSplit();
    case "Metaspace":
      return new MetaspacePreTokenizer(config);
    case "ByteLevel":
      return new ByteLevelPreTokenizer(config);
    case "Split":
      return new SplitPreTokenizer(config);
    case "Punctuation":
      return new PunctuationPreTokenizer(config);
    case "Digits":
      return new DigitsPreTokenizer(config);
    case "Replace":
      return new ReplacePreTokenizer(config);
    default:
      throw new Error(`Unknown PreTokenizer type: ${config.type}`);
  }
}

export default create_pre_tokenizer;
