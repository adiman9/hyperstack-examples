use hyperstack::prelude::*;

#[hyperstack(idl = "idl/bags-fees-v2.json")]
pub mod bags_fees_v2_stream {
    use hyperstack::macros::Stream;

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
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Stream)]
    pub struct ClaimMintId {
        #[from_instruction(
            [
                generated_sdk::instructions::ClaimUser::base_mint,
                generated_sdk::instructions::ForceClaimUser::base_mint
            ],
            primary_key,
            strategy = SetOnce
        )]
        pub base_mint: String,

        #[from_instruction(
            [
                generated_sdk::instructions::ClaimUser::quote_mint,
                generated_sdk::instructions::ForceClaimUser::quote_mint
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
                generated_sdk::instructions::ForceClaimUser
            ],
            strategy = Count,
            lookup_by = accounts::base_mint
        )]
        pub claim_count: Option<u64>,

        #[derive_from(
            from = [
                generated_sdk::instructions::ClaimUser,
                generated_sdk::instructions::ForceClaimUser
            ],
            field = __timestamp,
            lookup_by = accounts::base_mint
        )]
        pub last_claim_timestamp: Option<i64>,

        #[derive_from(
            from = [
                generated_sdk::instructions::ClaimUser,
                generated_sdk::instructions::ForceClaimUser
            ],
            field = accounts::user,
            lookup_by = accounts::base_mint
        )]
        pub last_claimer: Option<String>,
    }
}
