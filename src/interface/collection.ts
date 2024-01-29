export interface Collection {
  _id: string,
  Caddress: string, //represent collection address
  Saddress: string, //represent smart contract address of staking
  airdrop: {
    denom: string, 
    amount: string
  },
  auto_renewal: boolean,
  cycle: number,
  enabled: boolean,
  fee_receiver: string,
  owner: string
  reward: {
    amount: string,
    denom: string
  },
  reward_pool: Array<any>
  spots: number
  unstake_fee: {
    denom: string,
    amount: string
  },
  unstake_fee_share: number,
  Ctitle: string,
  Cdescription: string,
  CBackground: string
}