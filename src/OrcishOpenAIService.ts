import {
  GPTModel,
  GPTTemperature,
  ImageModel,
  ImageResolution,
  OpenAIHeaders,
  OrcishOpenAIServiceOptions,
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
      gptModel: "gpt-3.5-turbo",
      gptTemperature: 0.8,
      gptMaxTokens: 1048,
      imageModel: "dall-e-3",
      imageResolution: "1792x1024",
    };
  }

  async getChatGPTCompletion(
    input: string,
    options?: {
      gptModel?: GPTModel;
      gptTemperature?: GPTTemperature;
      gptMaxTokens?: number;
    }
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
    options?: {
      imageModel?: ImageModel;
      imageResolution?: ImageResolution;
    }
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
