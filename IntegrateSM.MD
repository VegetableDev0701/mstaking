# You can find two helper files ( each files contains on helper functions) & you can use these functions for getting informations & update informations.
## Will describe method, functions , params below.

## HINT: method are 2 types , query should be used queryHelper, action should be used actionHelper.


### # get contract information (owner, fee_receiver)
```
Type: query
queryName: getConfig
queryData: {}
```
### # Get Collections
```
Type: query
queryName: getCollections
queryData: {}
```
### # Get Stakings Owner
```
Type: query
queryName: GetStakingsByOwner
queryData: { owner: wallet Address }
```

### # Change Owner Ship
```
Type: action
actionName: transferOwnership,
actionParams: { new_owner: address }
```

### # Change Fee reciever
```
Type: action
actionName: changeFeeReceiver,
actionParams: { fee_receiver: address }
```

### # Add Collection to Contract ( don't implement this, will do in BE)
```
Type: action
actionName: addCollection,
actionParams: {
  address: admin address,
  owner: owner address,
  unstake_fee: fee,
  unstake_fee_share
}
```

### # Update Collection information
```
Type: action
actionName: updateCollection,
actionParams: { same as Addcollection }
```

### # Remove Collection
```
Type: action
actionName: removeCollection,
actionParams: { address : admin address }
```

### # Set Collection Data
```
Type: action
actionName: SetCollectionData,
actionParams: {
  address: string,
  staking: number,
  airdrop: number,
  auto_renewal: boolean,
  cycle: number,
  enabled: boolean,
  spots: number,
  fee_receiver: string
}
```
### # DepositCollectionStakingPool(action, {address})

### # Stack
```
Type: action
actionName: ReceiveNft,
actionParams: {
  msg: {
    sender: string,
    token_id: string,
    msg: binary
  }
}
```

### # unStack
```
Type: action
actionName: Unstake,
actionParams: {
  index: number
}
```
### # ClaimStakingReward(action, {index: number})
### # ClaimAirdropReward(action, {index: number})