import fetchConfigById from "./utils/fetchConfigById";
import { Tokenizer } from "../src";

describe("Memory leak tests", () => {
  it("should not leak memory", async () => {
    expect(global.gc).toBeDefined();
    const modelId = "TinyLlama/TinyLlama-1.1B-Chat-v1.0";
    const { tokenizerJson, tokenizerConfig } = await fetchConfigById(modelId);
    const tokenizer = new Tokenizer(tokenizerJson, tokenizerConfig);

    // NB: Force garbage collection before measuring memory usage
    global.gc!();
    const startMemory = process.memoryUsage().heapUsed;
    for (let i = 0; i < 2500; ++i) {
      const s = `${i} ${i} `.repeat(i);
      tokenizer.encode(s);
    }
    global.gc!();
    const endMemory = process.memoryUsage().heapUsed;
    const memoryUsed = endMemory - startMemory;
    const memoryLimit = 1024 * 1024; // 1 MB
    expect(memoryUsed).toBeLessThan(memoryLimit);
  }, 30000); // Increase timeout to accommodate the memory leak test
});
