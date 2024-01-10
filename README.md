# Orcish OpenAI Connector

![orcish-openai-connector](https://github.com/TheOrcDev/orcish-openai-connector/assets/7549148/d505215b-7e22-44b2-84b1-4bdb12709212)

Orcish OpenAI Connector is a simple completion and image creator application powered by OpenAI's language and image models.

## Getting Started

Follow these steps to set up and run the Orcish OpenAI Connector on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/TheOrcDev/orcish-openai-connector.git
    ```

2. Navigate to the project directory:

    ```bash
    cd orcish-openai-connector
    ```

3. Install dependencies using pnpm:

    ```bash
    pnpm install
    ```

### Configuration

1. Copy the provided `.env.example` file to create a new `.env` file:

    ```bash
    cp .env.example .env
    ```

2. Open the `.env` file in a text editor and fill in the required values:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    # Add other environment variables as needed
    ```

### Running the Application

To run the Orcish OpenAI Connector, use the following command:

```bash
pnpm start
