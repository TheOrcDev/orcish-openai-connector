export type OpenAIHeaders = {
  "Content-Type": string;
  Authorization: string;
  "Access-Control-Allow-Origin": string;
};

// types.ts
export type GPTModel =
  | "gpt-3.5-turbo-1106"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-16k"
  | "gpt-3.5-turbo-instruct"
  | "gpt-3.5-turbo-0613"
  | "gpt-3.5-turbo-16k-0613"
  | "gpt-3.5-turbo-0301"
  | "gpt-4-1106-preview"
  | "New GPT-4 Turbo"
  | "gpt-4-vision-preview"
  | "gpt-4"
  | "gpt-4-32k"
  | "gpt-4-0613"
  | "gpt-4-32k-0613";

export type GPTTemperature =
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9;

export type ImageModel = "dall-e-2" | "dall-e-3";

export type ImageResolution = "1792x1024" | "1024x1024" | "1024x1792";

export type OrcishOpenAIServiceOptions = {
  apiKey: string;
  gptModel?: GPTModel;
  gptTemperature?: GPTTemperature;
  gptMaxTokens?: number;
  imageModel?: ImageModel;
  imageResolution?: ImageResolution;
};
