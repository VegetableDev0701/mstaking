import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, CollectionToken } from '@/interface/token'
import { Collection } from '@/interface/collection'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
    setTokenStaked: (state, action: PayloadAction<{ collectionKey: string, tokenId: string[], cLock: number}>) => {
      debugger;
      const { tokenId, collectionKey, cLock } = action.payload
      // Remove element from unstaked array
      let unstaked: Token[] = state.tokens[action.payload.collectionKey].unstaked
      state.tokens[collectionKey].unstaked = unstaked.filter((el:Token) => tokenId.findIndex(iEle => iEle == el.token_id ) == -1 )
      // Add element to staked arry
      const token_address = collectionKey
      for (let i =0; i<tokenId.length; i++) {
        state.tokens[collectionKey].staked.push({
          token_id: tokenId[i],
          token_stake_time: new Date().getTime() * 1000000,
          token_end_time: 0,
          token_lock_time: cLock,
          token_reward: {
            amount: "",
            denom: "inj"
          }
        })
      }
    },
    setTokenLocked: (state, action: PayloadAction<{collectionKey: string, tokenId: string[], cLock: number}>) => {
      const { tokenId, collectionKey, cLock } = action.payload
      let staked: Token[] = state.tokens[collectionKey].staked
      state.tokens[collectionKey].staked = staked.map((el: Token) => {
        if (tokenId.findIndex(eI => eI == el.token_id) != -1) {
          return {
            ...el,
            token_lock_time: cLock
          }
        } else {
          return {
            ...el
          }
        }
      })
    },
    setTokenUnStaked: (state, action: PayloadAction<{ collectionKey: string, tokenId: string[]}>) => {
      const { tokenId, collectionKey } = action.payload
      const token_address = collectionKey
      // set element unstaked from staked array
      let staked: Token[] = state.tokens[collectionKey].staked
      state.tokens[collectionKey].staked = staked.filter((el: Token) => {
        if (tokenId.findIndex((eI) => eI == el.token_id) == -1) {
          return true
        } else {
          return false
        }
      })
      // Add element to unstaked array
      for (let i = 0;i<tokenId.length; i++) {
        state.tokens[collectionKey].unstaked.push({
          token_id: tokenId[i],
          token_lock_time: 0,
          token_stake_time: 0,
          token_end_time: 0,
          token_reward: {
            amount: "",
            denom: ""
          }
        })
      }      
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
  setTokenLocked,
  setTokenUnStaked,
  setCollectionStakedNFT } = tokenSlice.actions
export const getTokens = (state: any) => state.token.tokens;
export const getCollectionTokens = (keyName: string) => (state: any) => {
  try {
    if (state.token.tokens && state.token.tokens[keyName]) {
      return state.token.tokens[keyName];
    } else {
      return {
        staked: [],
        unstaked: []
      }
    }
  } catch(e) {
    console.log('Token slice error: ', e)
    return {
      staked: [],
      unstaked: []
    }
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
export const getStakedTotalCOunt = (state: any) => {
  let count = 0
  if (!state.token.tokens) return 0;
  Object.keys(state.token.tokens).map((key: string, index: number) => {
    count = count + state.token.tokens[key].staked.filter((el: Token) => el.token_stake_time >= el.token_end_time ).length
  })
  return count
}
export const getStakedCollections = (state: any) => {
  let tokens = state.token.tokens
  let collections = state.collection.cols
  let list: Collection[] = []
  for(let i =0;i<collections.length; i++) {
    let colToken = tokens[`${collections[i].Caddress}/${collections[i].Ctitle}`]
    if (!colToken || colToken.staked.length == 0) {
      continue
    } else {
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
    let colToken = tokens[`${collections[i].Caddress}/${collections[i].Ctitle}`]
    if (!colToken || colToken.staked.length != 0) {
      continue
    } else {
      list.push(collections[i])
    }
  }
  return list
}
const tokenPersistConfig = {
  key: "token",
  storage: storage,
  whitelist: ["tokens"],
};
export default persistReducer(tokenPersistConfig, tokenSlice.reducer)