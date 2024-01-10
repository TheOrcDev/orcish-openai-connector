import { OpenAIService } from "./services/OpenAIService";

async function run() {
  const openaiService = new OpenAIService();

  const chatGPTResult = await openaiService.getChatGPTCompletion("Your input");

  const dalle3Image = await openaiService.getDalle3Image("Your prompt");
}

run();
