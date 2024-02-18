import { Coin } from "./coin"
export interface Collection {
  _id: string,
  Caddress: string, //represent collection address
  Saddress: string, //represent smart contract address of staking
  cAdmin: string,
  cTitle: string,
  cDescription: string,
  cBkgimg: string,
  cRestart: boolean,
  cModel: boolean,
  cDuration: number,
  cLockDur: number,
  cDailyAirdrop: Coin,
  cDailyNAirdrop: Coin,
  cReward: Coin,
  cRewardbyRank: boolean,
  cUnstakingFeeReceiver: string,
  cUnstakingFee: Coin,
  cUnstakingFeeShare: number,
  cTxFee: Coin,
  cEnable: boolean
}

export const InitCollection: Collection  ={
  _id: '',
  Caddress: '', //represent collection address
  Saddress: '', //represent smart contract address of staking
  cAdmin: '',
  cTitle: '',
  cDescription: '',
  cBkgimg: 'default',
  cRestart: false,
  cModel: true,
  cDuration: 84600,
  cLockDur: 42300,
  cDailyAirdrop: {
    denom: 'inj', 
    amount: '0'
  },
  cDailyNAirdrop: {
    denom: 'inj',
    amount: '0'
  },
  cReward: {
    amount: '0',
    denom: 'inj'
  },
  cRewardbyRank: false,
  cUnstakingFeeReceiver: "",
  cUnstakingFee: {
    denom: 'inj',
    amount: '0'
  },
  cUnstakingFeeShare: 20,
  cTxFee: {
    denom: 'inj',
    amount: '0'
  },
  cEnable: false,  
}