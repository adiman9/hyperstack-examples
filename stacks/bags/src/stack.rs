use hyperstack::prelude::*;

#[hyperstack(idl = "idl/bags-fees-v2.json")]
pub mod bags_fees {
    use hyperstack::macros::Stream;
    use hyperstack::resolvers::TokenMetadata;

    use serde::{Deserialize, Serialize};

    #[entity(name = "BagsFees")]
    #[view(
        name = "latest",
        sort_by = "stats.last_claim_timestamp",
        order = "desc"
    )]
    pub struct BagsUserClaimsByMint {
        pub id: ClaimMintId,
        pub stats: ClaimStats,
        #[resolve(from = "id.base_mint")]
        pub base_token_metadata: Option<TokenMetadata>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Stream)]
    pub struct ClaimMintId {
        #[from_instruction(
            [
                generated_sdk::instructions::ClaimUser::base_mint,
            ],
            primary_key,
            strategy = SetOnce
        )]
        pub base_mint: String,

        #[from_instruction(
            [
                generated_sdk::instructions::ClaimUser::quote_mint,
            ],
            strategy = SetOnce
        )]
        pub quote_mint: Option<String>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Stream)]
    pub struct ClaimStats {
        #[aggregate(
            from = [
                generated_sdk::instructions::ClaimUser,
            ],
            strategy = Count,
            lookup_by = accounts::base_mint
        )]
        pub claim_count: Option<u64>,

        #[derive_from(
            from = [
                generated_sdk::instructions::ClaimUser,
            ],
            field = __timestamp,
            lookup_by = accounts::base_mint
        )]
        pub last_claim_timestamp: Option<i64>,

        #[derive_from(
            from = [
                generated_sdk::instructions::ClaimUser,
            ],
            field = accounts::user,
            lookup_by = accounts::base_mint
        )]
        pub last_claimer: Option<String>,
    }
}
