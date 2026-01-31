# Hyperstack Bags SDK

TypeScript SDK for the Bags fees v2 Hyperstack.

## Installation

```bash
npm install hyperstack-bags hyperstack-typescript
```

## Usage

```typescript
import { HyperStack } from 'hyperstack-typescript';
import { BAGS_USER_CLAIMS_STACK, type BagsUserClaimsByMint } from 'hyperstack-bags/bags';

const hs = await HyperStack.connect(BAGS_USER_CLAIMS_STACK, { 
  url: 'ws://localhost:8879' 
});

for await (const claim of hs.views.BagsUserClaimsByMint.latest.use({ take: 1 })) {
  console.log(claim);
}
```
