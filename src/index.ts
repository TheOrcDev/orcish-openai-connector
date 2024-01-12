export type OpenAIHeaders = {
  "Content-Type": string;
  Authorization: string;
  "Access-Control-Allow-Origin": string;
};

export enum GPTTemperature {
  CODE_GENERATION = 0.2,
  CREATIVE_WRITING = 0.7,
  CHATBOT_RESPONSES = 0.5,
  CODE_COMMENT_GENERATION = 0.3,
  EXPLORATORY_CODE_WRITING = 0.6,
}

export enum GPTModel {
  GPT_3_5_TURBO_1106 = "gpt-3.5-turbo-1106",
  GPT_3_5_TURBO = "gpt-3.5-turbo",
  GPT_3_5_TURBO_16K = "gpt-3.5-turbo-16k",
  GPT_3_5_TURBO_INSTRUCT = "gpt-3.5-turbo-instruct",
  GPT_3_5_TURBO_0613 = "gpt-3.5-turbo-0613",
  GPT_3_5_TURBO_16K_0613 = "gpt-3.5-turbo-16k-0613",
  GPT_3_5_TURBO_0301 = "gpt-3.5-turbo-0301",
  GPT_4_1106_PREVIEW = "gpt-4-1106-preview",
  NEW_GPT_4_TURBO = "New GPT-4 Turbo",
  GPT_4_VISION_PREVIEW = "gpt-4-vision-preview",
  GPT_4 = "gpt-4",
  GPT_4_32K = "gpt-4-32k",
  GPT_4_0613 = "gpt-4-0613",
  GPT_4_32K_0613 = "gpt-4-32k-0613",
}

export enum ImageResolution {
  RESOLUTION_1024x1024 = "1024x1024",
  RESOLUTION_1024x1792 = "1024x1792",
  RESOLUTION_1792x1024 = "1792x1024",
}

export enum ImageModel {
  DALLE_2 = "dall-e-2",
  DALLE_3 = "dall-e-3",
}

export type OrcishOpenAIServiceOptions = {
  apiKey: string;
  gptModel?: GPTModel;
  gptTemperature?: GPTTemperature;
  gptMaxTokens?: string;
  imageModel?: ImageModel;
  imageResolution?: ImageResolution;
};
