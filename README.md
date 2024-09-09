# NFT Gallery

This project involves deploying smart contracts using Hardhat and running a local development server for the client application.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed. You will also need Hardhat installed globally or locally in your project.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/project-name.git
    cd project-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Project

#### 1. Start the Hardhat Node

Run the Hardhat local blockchain node:

```bash
npx hardhat node
```
#### 2. Deploy the Smart Contracts

```bash
npx hardhat run scripts/deploy.js --network localhost
```
#### 3. Navigate to the Client

```bash
cd client
```
#### 4. Run the Development Server

```bash
npm run dev
```
