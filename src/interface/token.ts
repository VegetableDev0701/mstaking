export interface Token {
  token_id: string,
  token_lock_time: number,
  token_stake_time: number,
  token_end_time: number,
  token_reward: {
    amount: string,
    denom: string
  }
}

export interface CollectionToken {
  staked: Token[],
  unstaked: Token[]
}