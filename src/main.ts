import { OpenAIService } from "./services/OpenAIService";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  const openaiService = new OpenAIService();

  const [chatGPTResult, dalle3Image] = await Promise.all([
    openaiService.getChatGPTCompletion("Cool orcish name"),
    openaiService.getDalle3Image("Orc working on a computer"),
  ]);

  // Use chatGPTResult and dalle3Image as needed
}

run();
