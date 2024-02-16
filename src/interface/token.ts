export interface Token {
  token_address: string,
  token_id: string,
  start_timestamp: number,
  end_timestamp: number,
  airdrop_claim_timestamp: number,
  is_paid: boolean
}

export interface CollectionToken {
  staked: Token[],
  unstaked: Token[]
}