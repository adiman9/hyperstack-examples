import { z } from 'zod';
import { HyperStack } from 'hyperstack-typescript';
import { BAGS_FEES_STACK, type BagsFees, BagsFeesCompletedSchema, BagsFeesStatsSchema } from 'hyperstack-bags/bags';

const ValidatedBagsFeesStatsSchema = BagsFeesStatsSchema.extend({
  claim_count: z.number().refine((val) => val === 1, {
    message: "claim_count must be 1",
  }),
});

const ValidatedBagsFeesCompletedSchema = BagsFeesCompletedSchema.extend({
  stats: ValidatedBagsFeesStatsSchema,
});

async function main() {
  console.log('Connecting to Bags Fee Share stack...');
  const hs = await HyperStack.connect(BAGS_FEES_STACK);
  console.log('Connected. Streaming validated fee share claims...\n');

  for await (const claim of hs.views.BagsFees.latest.use({
    take: 1,
    schema: ValidatedBagsFeesCompletedSchema,
  })) {
    const now = Date.now();
    const lastClaimTs = claim.stats?.last_claim_timestamp;
    const diffMs = lastClaimTs ? now - lastClaimTs * 1000 : null;

    console.log('Claim:', claim);
    console.log('Current Timestamp:', new Date(now).toISOString());
    console.log('Last Claim Timestamp:', lastClaimTs ? new Date(lastClaimTs * 1000).toISOString() : 'N/A');
    console.log('Time Since Last Claim:', diffMs !== null ? `${diffMs}ms` : 'N/A');
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
