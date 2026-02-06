# Hyperstack Examples

Example stacks and applications built with [Hyperstack](https://github.com/HyperTekOrg/hyperstack).

## Quick Start

### Prerequisites

- Node.js 20+

### Setup and Run

```bash
git clone https://github.com/adiman9/hyperstack-examples.git
cd hyperstack-examples
npm install
npm run example:bags-typescript
```

You should see output like:

```
Connecting...
Connected. Waiting for data...

=== Bags Claim (Base Mint) ===
Base Mint: AnarbvjzbRxv391juRyWZiWmrAiqyLxb1LBz5FjWBAGS
Quote Mint: So11111111111111111111111111111111111111112
Fee Share Authority: ACAkQ6H2U6gnyH1YTCM5fhGuWCMCrp1t1wi73mWfk9Xo
Claim Count: 1
Total User Claimed Fees: N/A
Last Claimer: vzKiUT2mjZqCce8iLgm9SJUUGd7bY9fXd3De56LRdTq
Last Claim At: 2026-01-31T17:49:58.000Z
```

The example connects to the Bags fees stack and displays real-time claim data from Solana.

## Project Structure

```
hyperstack-examples/
├── sdk/typescript/           # TypeScript SDK for bags stack
├── examples/
│   ├── bags-typescript/      # TypeScript CLI client example
│   └── bags-server/          # Rust server example (optional)
└── package.json              # Workspace root
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies (SDK + examples) |
| `npm run build` | Build all packages |
| `npm run example:bags-typescript` | Run the bags TypeScript example |
| `npm run example:bags-typescript:dev` | Run with watch mode (auto-restarts on changes) |

## Running Your Own Server (Optional)

The TypeScript example connects to a hosted stack by default. If you want to run your own server:

### Server Prerequisites

- Rust 1.70+
- A Yellowstone gRPC endpoint

### Server Setup

1. Configure your Yellowstone endpoint:
   ```bash
   cd examples/bags-server
   cp .env.example .env
   # Edit .env with your credentials
   ```

2. Run the server:
   ```bash
   cargo run
   ```

3. Update the example to connect to your local server by modifying `examples/bags-typescript/src/main.ts`:
   ```typescript
   const hs = await HyperStack.connect(BAGS_FEES_STACK, {
     url: 'ws://localhost:8879'
   });
   ```

## Dependencies

This project uses published Hyperstack packages:
- **Rust**: hyperstack crates (v0.3)
- **TypeScript**: hyperstack-typescript npm package (v0.3)
