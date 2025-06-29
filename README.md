# 🎁 Cryptogifting - Onchain NFT Gift Cards

A decentralized application (dApp) for creating and managing digital gift cards using blockchain technology. Users can create, send, and redeem gift cards with native cryptocurrency (ETH) on various blockchain networks.

## 🌟 Features

### Core Functionality

- **Create Gift Cards**: Send digital gift cards with native ETH to any recipient
- **Batch Gift Cards**: Create multiple gift cards at once for different recipients
- **Random Gift Distribution**: Randomly distribute gifts among a list of recipients
- **Equal Distribution**: Distribute funds equally among multiple recipients
- **Gift Card Redemption**: Recipients can redeem their gift cards
- **Refund System**: Gift card creators can refund unused cards
- **Email Integration**: Send gift cards via email with custom messages

### Technical Features

- **Multi-Chain Support**: Deployed on multiple testnet networks
- **Native ETH Support**: Uses native cryptocurrency instead of ERC20 tokens
- **Gas Optimization**: Optimized smart contracts for efficient transactions
- **Modern UI**: Built with Next.js, Tailwind CSS, and Radix UI components
- **Wallet Integration**: Seamless wallet connection with Wagmi and Viem

## 🏗️ Architecture

### Smart Contracts

- **GiftCardContract**: Main contract handling gift card creation, redemption, and distribution
- **CryptFactory**: Factory contract for deploying gift card instances
- **Piggy**: Additional utility contract for advanced features

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Wagmi + Viem**: Ethereum wallet integration
- **Radix UI**: Accessible UI components

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- MetaMask or any Web3 wallet
- Testnet ETH for the networks you want to use

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd onchain-NFT-copy
   ```

2. **Install dependencies for both contracts and frontend**

   ```bash
   # Install contract dependencies
   cd Contract
   yarn install

   # Install frontend dependencies
   cd ../frontend
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   # In Contract directory
   cp .env.example .env
   ```

   Add your configuration to `.env`:

   ```env
   DEPLOYER_PRIVATE_KEY=your_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

4. **Deploy smart contracts**

   ```bash
   cd Contract

   # Compile contracts
   npx hardhat compile

   # Deploy to your preferred network (e.g., Sepolia)
   npx hardhat run scripts/deploy.js --network sepolia
   ```

5. **Update contract addresses**
   After deployment, update the contract addresses in `frontend/src/constant/index.ts`:

   ```typescript
   export const GiftContractAddress = "your_deployed_contract_address";
   ```

6. **Start the frontend**

   ```bash
   cd frontend
   yarn dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 User Manual

### Getting Started

1. **Connect Your Wallet**

   - Click "Connect Wallet" in the top navigation
   - Choose your preferred wallet (MetaMask recommended)
   - Ensure you're connected to a supported network

2. **Supported Networks**
   - Citrea Testnet

### Creating Gift Cards

1. **Single Gift Card**

   - Navigate to the "Create" page
   - Enter recipient's wallet address
   - Add a custom message
   - Specify the amount in ETH
   - Click "Create Gift Card"
   - Confirm the transaction in your wallet

2. **Batch Gift Cards**

   - Use the batch creation feature
   - Add multiple recipient addresses
   - Specify the total amount to be distributed equally
   - Add custom messages for each recipient
   - Confirm the transaction

3. **Random Gift Distribution**
   - Add a list of recipient addresses
   - Specify the amount to be sent
   - The system will randomly select one recipient
   - Confirm the transaction

### Managing Gift Cards

1. **View Your Gift Cards**

   - Go to the Dashboard
   - See all gift cards you've created or received
   - View status (Pending/Redeemed)

2. **Redeem Gift Cards**

   - If you're a recipient, click "Redeem" on your gift card
   - Pay a small fee (5% of the gift card value)
   - Receive the funds in your wallet

3. **Refund Gift Cards**
   - As a creator, you can refund unused gift cards
   - Click "Refund" on the gift card
   - Receive 10% of the original amount back

### Advanced Features

1. **Equal Distribution**

   - Distribute funds equally among multiple recipients
   - Useful for team rewards or community distributions

2. **Email Integration**
   - Send gift cards via email
   - Recipients receive a link to claim their gift

## 🔧 Development

### Contract Development

```bash
cd Contract

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

# Verify contracts on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### Frontend Development

```bash
cd frontend

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

### Project Structure

```
├── Contract/                 # Smart contracts
│   ├── contracts/           # Solidity contracts
│   ├── scripts/             # Deployment scripts
│   ├── test/                # Contract tests
│   └── hardhat.config.js    # Hardhat configuration
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Next.js pages
│   │   ├── contract/        # Contract ABIs
│   │   └── constant/        # Constants and addresses
│   └── public/              # Static assets
└── README.md               # This file
```

## 🌐 Supported Networks

| Network        | RPC URL                        | Chain ID | Status |
| -------------- | ------------------------------ | -------- | ------ |
| Citrea Testnet | https://rpc.testnet.citrea.xyz | 2023     | ✅     |

## 🔒 Security

- Smart contracts use OpenZeppelin's battle-tested libraries
- Reentrancy protection implemented
- Access control mechanisms in place
- Comprehensive error handling
- Gas optimization for cost efficiency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSE-2.0 License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Next.js team for the amazing React framework
- Wagmi and Viem for excellent Ethereum tooling
- The Web3 community for inspiration and support

---

**Happy Gifting! 🎁✨**
