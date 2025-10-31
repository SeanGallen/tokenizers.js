import UnicodeNormalizer from "./UnicodeNormalizer";

/**
 * A normalizer that applies Unicode normalization form C (NFC) to the input text.
 * Canonical Decomposition, followed by Canonical Composition.
 * @extends UnicodeNormalizer
 */
class NFC extends UnicodeNormalizer {
  form: "NFC" = "NFC";
}

export default NFC;
