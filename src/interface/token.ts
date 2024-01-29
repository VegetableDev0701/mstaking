export interface Token {
  token_address: string,
  token_id: string,
  start_timestamp: Number,
  end_timestamp: Number,
  airdrop_claim_timestamp: Number,
  is_paid: boolean
}

export interface CollectionToken {
  staked: Token[],
  unstaked: Token[]
}