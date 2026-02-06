import { z } from 'zod';
import { pda, literal, account, arg, bytes } from 'hyperstack-typescript';

export interface BagsFeesId {
  base_mint?: string | null;
  quote_mint?: string | null;
}

export interface BagsFeesStats {
  claim_count?: number | null;
  last_claim_timestamp?: number | null;
  last_claimer?: string | null;
}

export interface BagsFees {
  id?: BagsFeesId;
  stats?: BagsFeesStats;
  base_token_metadata?: TokenMetadata | null;
}

export type ClaimProtocol = "Dbc" | "DammV2";

export interface TokenMetadata {
  mint: string;
  name?: string | null;
  symbol?: string | null;
  decimals?: number | null;
  logo_uri?: string | null;
}

export const TokenMetadataSchema = z.object({
  mint: z.string(),
  name: z.string().nullable().optional(),
  symbol: z.string().nullable().optional(),
  decimals: z.number().nullable().optional(),
  logo_uri: z.string().nullable().optional(),
});

export const ClaimProtocolSchema = z.enum(["Dbc", "DammV2"]);

export const BagsFeesIdSchema = z.object({
  base_mint: z.string().nullable().optional(),
  quote_mint: z.string().nullable().optional(),
});

export const BagsFeesStatsSchema = z.object({
  claim_count: z.number().nullable().optional(),
  last_claim_timestamp: z.number().nullable().optional(),
  last_claimer: z.string().nullable().optional(),
});

export const BagsFeesSchema = z.object({
  id: BagsFeesIdSchema.optional(),
  stats: BagsFeesStatsSchema.optional(),
  base_token_metadata: TokenMetadataSchema.nullable().optional(),
});

export const BagsFeesCompletedSchema = z.object({
  id: BagsFeesIdSchema,
  stats: BagsFeesStatsSchema,
  base_token_metadata: TokenMetadataSchema,
});

// ============================================================================
// View Definition Types (framework-agnostic)
// ============================================================================

/** View definition with embedded entity type */
export interface ViewDef<T, TMode extends 'state' | 'list'> {
  readonly mode: TMode;
  readonly view: string;
  /** Phantom field for type inference - not present at runtime */
  readonly _entity?: T;
}

/** Helper to create typed state view definitions (keyed lookups) */
function stateView<T>(view: string): ViewDef<T, 'state'> {
  return { mode: 'state', view } as const;
}

/** Helper to create typed list view definitions (collections) */
function listView<T>(view: string): ViewDef<T, 'list'> {
  return { mode: 'list', view } as const;
}

// ============================================================================
// Stack Definition
// ============================================================================

/** Stack definition for BagsFees with 1 entities */
export const BAGS_FEES_STACK = {
  name: 'bags-fees',
  url: 'wss://bags-fees-h2pczx.stack.usehyperstack.com',
  views: {
    BagsFees: {
      state: stateView<BagsFees>('BagsFees/state'),
      list: listView<BagsFees>('BagsFees/list'),
      latest: listView<BagsFees>('BagsFees/latest'),
    },
  },
  schemas: {
    BagsFeesCompleted: BagsFeesCompletedSchema,
    BagsFeesId: BagsFeesIdSchema,
    BagsFees: BagsFeesSchema,
    BagsFeesStats: BagsFeesStatsSchema,
    ClaimProtocol: ClaimProtocolSchema,
    TokenMetadata: TokenMetadataSchema,
  },
  pdas: {
    bags_fee_share: {
      dbc_event_authority: pda('dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN', literal('__event_authority')),
      event_authority: pda('FEE2tBhCKAt7shrod19QttSVREUYPiyMzoku1mL1gqVK', literal('__event_authority')),
      fee_share_authority: pda('FEE2tBhCKAt7shrod19QttSVREUYPiyMzoku1mL1gqVK', literal('fee_share_authority'), account('base_mint'), account('quote_mint')),
      fee_share_authority_base_ata: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('fee_share_authority'), account('token_program'), account('base_mint')),
      fee_share_authority_quote_ata: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('fee_share_authority'), account('token_program'), account('quote_mint')),
      fee_share_config: pda('FEE2tBhCKAt7shrod19QttSVREUYPiyMzoku1mL1gqVK', literal('fee_share_config'), account('base_mint'), account('quote_mint')),
      partner_config: pda('FEE2tBhCKAt7shrod19QttSVREUYPiyMzoku1mL1gqVK', literal('partner_config'), account('partner')),
      partner_config_quote_ata: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('partner_config'), account('token_program'), account('quote_mint')),
      partner_quote_ata: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('partner'), account('token_program'), account('quote_mint')),
      platform_vault: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('program_config'), account('token_program'), account('quote_mint')),
      program_config: pda('FEE2tBhCKAt7shrod19QttSVREUYPiyMzoku1mL1gqVK', literal('program_config')),
      receiver_quote_ata: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('receiver'), account('token_program'), account('quote_mint')),
      user_quote_ata: pda('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', account('user'), account('token_program'), account('quote_mint')),
    },
  },
} as const;

/** Type alias for the stack */
export type BagsFeesStack = typeof BAGS_FEES_STACK;

/** Entity types in this stack */
export type BagsFeesEntity = BagsFees;

/** Default export for convenience */
export default BAGS_FEES_STACK;
