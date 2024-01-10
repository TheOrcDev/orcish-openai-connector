import { OpenAIService } from "./services/OpenAIService";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  const openaiService = new OpenAIService();

  const chatGPTResult = await openaiService.getChatGPTCompletion(
    "Cool orcish name"
  );
  const dalle3Image = await openaiService.getDalle3Image(
    "Orc working on a computer"
  );
}

run();
