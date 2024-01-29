
export interface IToken {
  token_id: string,
  token_uri: string,
  type: false
}

export interface ISMToken {
  token_address: string,
  token_id: string,
  start_timestamp: string,
  end_timestamp: string,
  airdrop_claim_timestamp: string,
  is_paid: false
}

export interface ISMTokenWithStatus {
  token_address: string,
  token_id: string,
  start_timestamp: string,
  end_timestamp: string,
  airdrop_claim_timestamp: string,
  is_paid: false,
  type: boolean
}