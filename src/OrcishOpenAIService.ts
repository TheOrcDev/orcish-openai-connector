type OpenAIHeaders = {
  "Content-Type": string;
  Authorization: string;
  "Access-Control-Allow-Origin": string;
};

type OrcishOpenAIServiceOptions = {
  apiKey?: string;
  gptModel?: string;
  gptTemperature?: string;
  gptMaxTokens?: string;
  imageModel?: string;
  imageResolution?: string;
};

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

  async getChatGPTCompletion(
    input: string,
    options: OrcishOpenAIServiceOptions
  ): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        model: options.gptModel || "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        temperature: options.gptTemperature || 0.8,
        max_tokens: options.gptMaxTokens || 1048,
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
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          model: options.imageModel || "dall-e-3",
          prompt,
          n: 1,
          size: options.imageResolution || "1792x1024",
        }),
      }
    );

    const data = await response.json();

    return data.data[0].url;
  }
}
