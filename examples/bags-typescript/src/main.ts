import { HyperStack } from 'hyperstack-typescript';
import { BAGSFEES_STACK, type BagsFees } from 'hyperstack-bags/bags';

function formatTimestamp(timestamp?: number | null): string {
  if (!timestamp) {
    return 'N/A';
  }

  return new Date(timestamp * 1000).toISOString();
}

function printClaim(claim: BagsFees) {
  console.log('\n=== Bags Claim (Base Mint) ===');
  console.log('Base Mint:', claim.id?.base_mint ?? 'N/A');
  console.log('Quote Mint:', claim.id?.quote_mint ?? 'N/A');
  console.log('Claim Count:', claim.stats?.claim_count ?? 0);
  console.log('Last Claimer:', claim.stats?.last_claimer ?? 'N/A');
  console.log('Last Claim At:', formatTimestamp(claim.stats?.last_claim_timestamp));
  console.log();
}

async function main() {
  console.log('Connecting...');
  const hs = await HyperStack.connect(BAGSFEES_STACK);
  console.log('Connected. Waiting for data...');

  for await (const claim of hs.views.BagsFees.latest.use({ take: 1 })) {
    printClaim(claim);
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
