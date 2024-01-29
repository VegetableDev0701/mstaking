export interface IACollectionR {
  Caddress: string,
  Cwaddress: string,
  Ctitle: string,
  Cdescription: string,
  CBackground: string,
  CstakingDuration: number,
  CdisableRestart: boolean,
  CenableAirdrop: boolean,
  CdailyAirdrops: number,
  CdisableNFT: boolean,
  CreceiverAddress: string,
  CstakingFee: number,
  CstakingStatus: string
}

export interface IACollection {
  _id: string,
  Caddress: string,
  CSaddress: string,
  Ctitle: string,
  Cdescription: string,
  CBackground: string
}