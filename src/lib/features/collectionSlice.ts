import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IACollection } from '@/constants/collection'
import { Collection } from '@/interface/collection'
export interface colllectionState {
  cols: Collection[]
}
const initialCollectionState: colllectionState = {
  cols: [],
}

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: initialCollectionState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.cols = action.payload
    },
    addCollection: (state, action: PayloadAction<{data: Collection}>) => {
      state.cols.push(action.payload.data)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCollections, addCollection } = collectionSlice.actions
export const getCollections = (state: any) => state.collection.cols;
export const getSaddress = (Caddress: string) => (state: any) => {
  const collections: Collection[] = state.collection.cols
  for(let i =0; i<collections.length; i++) {
    if (collections[i].Caddress == Caddress) {
      return collections[i].Saddress
    }
  }
  return ''
}
export const getUnstakeFee = (Caddress: string) => (state: any) => {
  const collections: Collection[] = state.collection.cols
  for(let i =0; i<collections.length; i++) {
    if (collections[i].Caddress == Caddress) {
      return collections[i].unstake_fee
    }
  }
  return {}
}

export const getCollectionFromCA = (cAddresss: string) => (state: any) => {
  const collections: Collection[] = state.collection.cols
  for(let i =0; i<collections.length; i++) {
    if (collections[i].Caddress == cAddresss) {
      return collections[i]
    }
  }
}
export const getCollectionData = (Caddress: string) => (state: any) => {
  return state.collection.cols.find((col: any) => col.Caddress === Caddress);
}
export default collectionSlice.reducer