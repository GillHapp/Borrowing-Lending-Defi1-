Here’s a revised version of your **Borrowing and Lending DeFi** README:

---

# Borrowing and Lending DeFi

## Introduction
This Asset Borrowing and Lending DeFi DApp operates on **Ethereum's Sepolia Testnet**, providing users with a secure and efficient way to lend and borrow digital assets.

## Technology Stack
- **Blockchain**: equito
- **Smart Contracts**: Solidity
- **Frontend**: JavaScript, TypeScript, Next.js, Tailwind CSS, HTML
- **Price Oracles**: Chainlink
- **Security**: OpenZeppelin (ERC20 Tokens, Ownable, Reentrancy Guards)
- **Development Tools**: Hardhat, Ethers.js
- **Wallet Integration**: MetaMask
- **API**: Infura Web3API

## Project Layout

### Top-Level Folders
1. **/components**: Contains the front-end application components.
2. **/context**: Holds the front-end application context wrapper.
3. **/contracts**: Contains the Solidity smart contracts.
4. **/pages**: Main rendering pages and components for Next.js.

### Important Files
1. **package.json**: Lists dependencies and scripts.
2. **.env**: Stores Infura/Alchemy API keys and your wallet's private key.

## Using & Testing the DApp on Sepolia
1. **MetaMask**: Install the MetaMask wallet extension.
2. **Add Sepolia Testnet**: Configure the Sepolia Testnet in MetaMask.

## Cloning and Deploying the DApp on Sepolia Testnet

1. Clone this repository:
   ```bash
   git clone <repo-url>
   ```
2. Navigate to the root directory and install all node packages:
   ```bash
   npm install
   ```
3. Create a new Infura API key.
4. Copy your MetaMask wallet's private key.
5. Create a `.env` file in the root directory and add the following:
   ```
   INFURA_SEPOLIA_API_URL=""
   MAIN_ACCOUNT=""
   ```
6. Start the Next.js server:
   ```bash
   npm run dev
   ```

## License
This project is licensed under the MIT License.

---

Let me know if you need any further modifications!
