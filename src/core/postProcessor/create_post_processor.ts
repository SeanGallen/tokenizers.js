import PostProcessor from "../PostProcessor";
import TemplateProcessing from "./TemplateProcessing";
import ByteLevelPostProcessor from "./ByteLevelPostProcessor";
import BertProcessing from "./BertProcessing";
import RobertaProcessing from "./RobertaProcessing";
import PostProcessorSequence from "./PostProcessorSequence";
import { TokenizerConfigPostProcessor } from "@static/tokenizer";

function create_post_processor(
  config: TokenizerConfigPostProcessor,
): PostProcessor | null {
  if (config === null) return null;

  switch (config.type) {
    case "TemplateProcessing":
      return new TemplateProcessing(config);
    case "ByteLevel":
      return new ByteLevelPostProcessor(config);
    case "BertProcessing":
      return new BertProcessing(config);
    case "RobertaProcessing":
      return new RobertaProcessing(config);
    case "Sequence":
      return new PostProcessorSequence(config);
    default:
      throw new Error(`Unknown PostProcessor type: ${(config as any).type}`);
  }
}

export default create_post_processor;
