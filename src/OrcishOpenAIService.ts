import {
  GPTModel,
  GPTTemperature,
  ImageModel,
  ImageResolution,
  OpenAIHeaders,
  OrcishOpenAIServiceOptions,
  ResponseFormat,
  Voice,
  VoiceModel,
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
      voice: "alloy",
    };
  }

  async getChatGPTCompletion(
    prompt: string,
    options?: {
      gptModel?: GPTModel;
      gptTemperature?: GPTTemperature;
      gptMaxTokens?: number;
      responseFormat?: ResponseFormat;
    }
  ): Promise<string> {
    try {
      const mergedOptions = { ...this.getDefaultOptions(), ...options };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({
            model: mergedOptions.gptModel,
            messages: [{ role: "user", content: prompt }],
            temperature: mergedOptions.gptTemperature,
            max_tokens: mergedOptions.gptMaxTokens,
            response_format: { type: mergedOptions.responseFormat || "text" },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw JSON.stringify(data.error);
      }

      if (data.choices[0].finish_reason === "length") {
        throw new Error("Too long prompt");
      }

      return data.choices[0].message.content;
    } catch (error) {
      throw "Encountered an issue while attempting to work with GPT by OpenAI";
    }
  }

  async getDalle3Image(
    prompt: string,
    options?: {
      imageModel?: ImageModel;
      imageResolution?: ImageResolution;
    }
  ): Promise<string> {
    try {
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
    } catch (error) {
      throw "Encountered an issue while attempting to retrieve images from OpenAI";
    }
  }

  async textToSpeech(
    prompt: string,
    options?: {
      voice?: Voice;
      voiceModel?: VoiceModel;
    }
  ): Promise<Blob> {
    try {
      const mergedOptions = { ...this.getDefaultOptions(), ...options };

      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          model: "tts-1",
          voice: mergedOptions.voice,
          input: prompt,
        }),
      });

      return await response.blob();
    } catch (error) {
      throw "Encountered an issue while attempting to retrieve speech to text from OpenAI";
    }
  }
}
