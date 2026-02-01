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
}

export type ClaimProtocol = "Dbc" | "DammV2";

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

/** Stack definition for BagsFees */
export const BAGSFEES_STACK = {
  name: 'bags-fees',
  url: 'wss://bags-fees-h2pczx.stack.usehyperstack.com',
  views: {
    BagsFees: {
      state: stateView<BagsFees>('BagsFees/state'),
      list: listView<BagsFees>('BagsFees/list'),
      latest: listView<BagsFees>('BagsFees/latest'),
    },
  },
} as const;

/** Type alias for the stack */
export type BagsFeesStack = typeof BAGSFEES_STACK;

/** Default export for convenience */
export default BAGSFEES_STACK;
