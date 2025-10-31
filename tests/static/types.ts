export interface TestConfigDefault {
  default: TestConfig;
}

export type TestConfig = Record<
  string,
  Record<
    string,
    {
      text: string;
      text_pair?: string;
      tokens?: string[];
      ids?: number[];
      decoded?: string;
    }
  >
>;
