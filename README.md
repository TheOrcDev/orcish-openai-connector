# Orcish OpenAI Connector

![orcish-openai-connector](https://github.com/TheOrcDev/orcish-openai-connector/assets/7549148/d505215b-7e22-44b2-84b1-4bdb12709212)

Orcish OpenAI Connector is a simple completion and image creator application powered by OpenAI's language and image models.

## Getting Started

Follow these steps to set up and run the Orcish OpenAI Connector.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Install the package in your project:

    ```bash
    npm i orcish-openai-connector
    ```

    or

    ```bash
    yarn add orcish-openai-connector
    ```

    or

    ```bash
    pnpm add orcish-openai-connector
    ```

2. After installation, you can import and use the `OpenAIService` class in your project.

    ```typescript
    import { OpenAIService, OpenAIServiceOptions } from 'orcish-openai-connector';

    // Create an instance of OpenAIService
    const openaiService = new OpenAIService({
      apiKey: 'your_openai_api_key',
      // Add other options as needed
    });

    // Use OpenAIService methods
    const chatGPTResult = await openaiService.getChatGPTCompletion('Cool orcish name', {
      gptTemperature: 0.7,
      // Add other options as needed
    });

    const dalle3Image = await openaiService.getDalle3Image('Orc working on a computer', {
      imageResolution: '1792x1024',
      // Add other options as needed
    });
    ```

    ### Configuration Options

When creating an instance of `OpenAIService`, you can provide the following options:

- `apiKey` (string, required): Your OpenAI API key.
- `gptModel` (string, optional, default: 'gpt-3.5-turbo'): The GPT model to use.
- `gptTemperature` (string, optional, default: '0.8'): The temperature parameter for GPT completion.
- `gptMaxTokens` (string, optional, default: '1048'): The maximum number of tokens for GPT completion.
- `imageModel` (string, optional, default: 'dall-e-3'): The image model to use.
- `imageResolution` (string, optional, default: '1792x1024'): The resolution for generated images.

Example:

```typescript
import { OpenAIService, OpenAIServiceOptions } from 'orcish-openai-connector';

// Create an instance of OpenAIService with custom options
const openaiService = new OpenAIService({
  apiKey: 'your_openai_api_key',
  gptModel: 'gpt-3.5-turbo',
  gptTemperature: '0.7',
  gptMaxTokens: '512',
  imageModel: 'dall-e-3',
  imageResolution: '1920x1080',
});

// Use OpenAIService methods with custom options
const chatGPTResult = await openaiService.getChatGPTCompletion('Cool orcish name', {
  gptTemperature: '0.7',
  // Add other options as needed
});

const dalle3Image = await openaiService.getDalle3Image('Orc working on a computer', {
  imageResolution: '1792x1024',
  // Add other options as needed
});
```
