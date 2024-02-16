import { Coin } from "./coin"
export interface Collection {
  _id: string,
  Caddress: string, //represent collection address
  Saddress: string, //represent smart contract address of staking
  Ctitle: string,
  Cdescription: string,
  airdrop: Coin,
  nairdrop: Coin,
  auto_renewal: boolean,
  cycle: number,
  enabled: boolean,
  fee_receiver: string,
  admin: string
  reward: Coin,
  reward_pool: Array<Coin>,
  spots: number,
  unstake_fee: Coin,
  unstake_fee_share: number,
  unstake_lock_period: number,
  CBackground: string,
  staking_model: number,
  reward_by_rank: boolean,
  tx_fee: Coin,
}

export const InitCollection: Collection  ={
  _id: '',
  Caddress: '', //represent collection address
  Saddress: '', //represent smart contract address of staking
  Ctitle: '',
  Cdescription: '',
  airdrop: {
    denom: 'inj', 
    amount: '0'
  },
  nairdrop: {
    denom: 'inj',
    amount: '0'
  },
  auto_renewal: false,
  cycle: 0,
  enabled: true,
  fee_receiver: '',
  admin: '',
  reward: {
    amount: '0',
    denom: 'inj'
  },
  reward_pool: [],
  spots: 0,
  unstake_fee: {
    denom: 'inj',
    amount: '0'
  },
  unstake_fee_share: 0,
  unstake_lock_period: 0,
  CBackground: '',
  staking_model: 0,
  reward_by_rank: false,
  tx_fee: {
    denom: 'inj',
    amount: '0'
  }
}