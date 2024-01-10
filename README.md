# Orcish OpenAI Connector

Orcish OpenAI Connector is a simple completion and image creator application powered by OpenAI's language and image models.

## Getting Started

Follow these steps to set up and run the Orcish OpenAI Connector on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/theorcdev/orcish-openai-connector.git
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
