import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, CollectionToken } from '@/interface/token'
import { Collection } from '@/interface/collection'
export interface tokenState {
  tokens: {
    [keyName: string]: CollectionToken
  }
}
const initialTokenState: tokenState = {
  tokens: {},
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState: initialTokenState,
  reducers: {
    setAllTokens: (state, action) => {
      state.tokens = action.payload
    },
    setCollectionTokens: (state, action: PayloadAction<{ keyname: string, tokens: CollectionToken }>) => {
      const { keyname, tokens } = action.payload
      let stateToken = state.tokens[keyname]
      if (!stateToken) {
        state.tokens[keyname] = {
          staked: [],
          unstaked: []
        }
        state.tokens[keyname].staked.push(...tokens.staked)
        state.tokens[keyname].unstaked.push(...tokens.unstaked)
      } else {
        state.tokens[keyname].staked = tokens.staked
        state.tokens[keyname].unstaked = tokens.unstaked
      }
    },
    setTokenStaked: (state, action: PayloadAction<{ collectionKey: string, tokenId: string}>) => {
      const { tokenId, collectionKey } = action.payload
      // Remove element from unstaked array
      let unstaked: Token[] = state.tokens[action.payload.collectionKey].unstaked
      state.tokens[collectionKey].unstaked = unstaked.filter((el:Token) => el.token_id!=tokenId )
      // Add element to staked arry
      const token_address = collectionKey.split('/')[0]
      state.tokens[collectionKey].staked.push({
        token_address: token_address,
        token_id: tokenId,
        start_timestamp: new Date().getTime(),
        end_timestamp: 0,
        airdrop_claim_timestamp: 0,
        is_paid: false
      })
    },
    setTokenUnStaked: (state, action: PayloadAction<{ collectionKey: string, tokenId: string}>) => {
      const { tokenId, collectionKey } = action.payload
      const token_address = collectionKey.split('/')[0]
      // set element unstaked from staked array
      let staked: Token[] = state.tokens[collectionKey].staked
      state.tokens[collectionKey].staked = staked.map((el: Token) => {
        if (el.token_id == tokenId) {
          return {
            ...el,
            end_timestamp: new Date().getTime()
          }
        } else {
          return el
        }
      })
      // Add element to unstaked array
      state.tokens[collectionKey].unstaked.push({
        token_address: token_address,
        token_id: tokenId,
        start_timestamp: 0,
        end_timestamp: 0,
        airdrop_claim_timestamp: 0,
        is_paid: false
      })
    },
    setCollectionStakedNFT: (state, action: PayloadAction<{keyname: string, tokens: Token[] }>) => {
      const { keyname, tokens } = action.payload
      let cTokens = state.tokens[keyname]
      if (!cTokens) state.tokens[keyname] = {
        staked: [],
        unstaked: []
      }
      state.tokens[keyname].staked.push(...tokens)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAllTokens, 
  setCollectionTokens, 
  setTokenStaked, 
  setTokenUnStaked,
  setCollectionStakedNFT } = tokenSlice.actions
export const getTokens = (state: any) => state.token.tokens;
export const getCollectionTokens = (keyName: string) => (state: any) => {
  try {
    if (state.token.tokens && state.token.tokens[keyName]) {
      return state.token.tokens[keyName];
    } else {
      return []
    }
  } catch(e) {
    console.log('Token slice error: ', e)
    return []
  }
}
export const getTokenCount = (state: any) => {
  let count = 0
  if (!state.token.tokens) return 0;
  Object.keys(state.token.tokens).map((key: string, index: number) => {
    count = count + state.token.tokens[key].length
  })
  return count
}
export const getStakedCollections = (state: any) => {
  let tokens = state.token.tokens
  let collections = state.collection.cols
  let list: Collection[] = []
  for(let i =0;i<collections.length; i++) {
    if (!tokens[`${collections[i].Caddress}/${collections[i].Ctitle}`]) contiune;
    if (tokens[`${collections[i].Caddress}/${collections[i].Ctitle}`].staked.length) {
      list.push(collections[i])
    }
  }
  return list
}

export const getNoneStakedCollections = (state: any) => {
  let tokens = state.token.tokens
  let collections = state.collection.cols
  let list: Collection[] = []
  for(let i =0;i<collections.length; i++) {
    if (!tokens[`${collections[i].Caddress}/${collections[i].Ctitle}`]) contiune;
    if (tokens[`${collections[i].Caddress}/${collections[i].Ctitle}`].staked.length == 0) {
      list.push(collections[i])
    }
  }
  return list
}

export default tokenSlice.reducer
