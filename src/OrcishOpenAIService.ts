import {
  OpenAIHeaders,
  OrcishOpenAIServiceOptions,
  GPTTemperature,
  GPTModel,
  ImageModel,
  ImageResolution,
} from ".";

export class OrcishOpenAIService {
  private headers: OpenAIHeaders;

  constructor(options: OrcishOpenAIServiceOptions) {
    if (!options.apiKey) {
      throw new Error("API key is required");
    }

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.apiKey}`,
      "Access-Control-Allow-Origin": "*",
    };
  }

  private getDefaultOptions(): OrcishOpenAIServiceOptions {
    return {
      apiKey: "",
      gptModel: GPTModel.GPT_3_5_TURBO,
      gptTemperature: GPTTemperature.CREATIVE_WRITING,
      gptMaxTokens: "1048",
      imageModel: ImageModel.DALLE_3,
      imageResolution: ImageResolution.RESOLUTION_1024x1024,
    };
  }

  async getChatGPTCompletion(
    input: string,
    options: OrcishOpenAIServiceOptions
  ): Promise<string> {
    const mergedOptions = { ...this.getDefaultOptions(), ...options };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        model: mergedOptions.gptModel,
        messages: [{ role: "user", content: input }],
        temperature: mergedOptions.gptTemperature,
        max_tokens: mergedOptions.gptMaxTokens,
      }),
    });

    const data = await response.json();

    if (data.choices[0].finish_reason === "length") {
      throw new Error("Too long prompt");
    }

    return data.choices[0].message.content;
  }

  async getDalle3Image(
    prompt: string,
    options: OrcishOpenAIServiceOptions
  ): Promise<string> {
    const mergedOptions = { ...this.getDefaultOptions(), ...options };

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          model: mergedOptions.imageModel,
          prompt,
          n: 1,
          size: mergedOptions.imageResolution,
        }),
      }
    );

    const data = await response.json();

    return data.data[0].url;
  }
}
