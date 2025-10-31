import Decoder from "../Decoder";
import ByteLevelDecoder from "./ByteLevelDecoder";
import WordPieceDecoder from "./WordPieceDecoder";
import MetaspaceDecoder from "./MetaspaceDecoder";
import BPEDecoder from "./BPEDecoder";
import CTCDecoder from "./CTCDecoder";
import DecoderSequence from "./DecoderSequence";
import ReplaceDecoder from "./ReplaceDecoder";
import FuseDecoder from "./FuseDecoder";
import StripDecoder from "./StripDecoder";
import { TokenizerConfigDecoder } from "@static/tokenizer";
import ByteFallback from "./ByteFallback";

function create_decoder(config: TokenizerConfigDecoder): Decoder | null {
  if (config === null) return null;

  switch (config.type) {
    case "ByteLevel":
      return new ByteLevelDecoder(config);
    case "WordPiece":
      return new WordPieceDecoder(config);
    case "Metaspace":
      return new MetaspaceDecoder(config);
    case "BPEDecoder":
      return new BPEDecoder(config);
    case "CTC":
      return new CTCDecoder(config);
    case "Sequence":
      return new DecoderSequence(config);
    case "Replace":
      return new ReplaceDecoder(config);
    case "Fuse":
      return new FuseDecoder(config);
    case "Strip":
      return new StripDecoder(config);
    case "ByteFallback":
      return new ByteFallback(config);
    default:
      throw new Error(`Unknown Decoder type: ${(config as any).type}`);
  }
}

export default create_decoder;
