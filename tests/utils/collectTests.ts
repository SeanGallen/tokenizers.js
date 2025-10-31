import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TestConfigDefault } from "../static/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODELS_DIR = path.join(__dirname, "../models");

const collectTests = async (): Promise<Array<[string, TestConfigDefault]>> => {
  const modelTypes = fs.readdirSync(MODELS_DIR);
  const allTests: Array<[string, TestConfigDefault]> = [];
  for (const model_type of modelTypes) {
    const dir = path.join(MODELS_DIR, model_type);

    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
      continue;
    }

    const file = path.join(dir, `test_tokenization_${model_type}.ts`);
    if (!fs.existsSync(file)) {
      continue;
    }

    const items = await import(file);
    allTests.push([model_type, items]);
  }
  return allTests;
};

export default collectTests;
