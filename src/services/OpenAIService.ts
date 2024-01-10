type OpenAIHeaders = {
  "Content-Type": string;
  Authorization: string;
  "Access-Control-Allow-Origin": string;
};

export class OpenAIService {
  private headers: OpenAIHeaders;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required");
    }

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Access-Control-Allow-Origin": "*",
    };
  }

  async getChatGPTCompletion(input: string): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        model: process.env.OPENAI_GPT_MODEL ?? "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        temperature: parseInt(process.env.OPENAI_GPT_TEMPERATURE ?? "0.8"),
        max_tokens: parseInt(process.env.OPENAI_GPT_MAX_TOKENS ?? "1048"),
      }),
    });

    const data = await response.json();

    if (data.choices[0].finish_reason === "length") {
      throw new Error("Too long prompt");
    }

    return data.choices[0].message.content;
  }

  async getDalle3Image(prompt: string): Promise<string> {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          model: process.env.OPENAI_IMAGE_MODEL,
          prompt,
          n: 1,
          size: process.env.OPENAI_IMAGE_RESOLUTION ?? "1792x1024",
        }),
      }
    );

    const data = await response.json();

    return data.data[0].url;
  }
}
