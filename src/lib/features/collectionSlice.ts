import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { Collection, InitCollection } from '@/interface/collection'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface colllectionState {
  cols: Collection[],
  selCollection: any
}
const initialCollectionState: colllectionState = {
  cols: [],
  selCollection: {}
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
    },
    setSelectedCollection: (state, action: PayloadAction<{Caddress: string}>) => {
      const Caddress = action.payload.Caddress
      const cols = current(state).cols
      if (!cols || cols.length == 0) return
      const idx = cols.findIndex((el: Collection) => el.Caddress == Caddress)
      state.selCollection = {
        ...cols[idx]
      }
    },
    setCollectionData: (state, action: PayloadAction<{data: Collection}>) => {
      const data: Collection = action.payload.data
      const idx = state.cols.findIndex((el: Collection) => el.Caddress == data.Caddress)
      state.cols[idx] = {
        ...state.cols[idx],
        ...data
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCollections, addCollection, setSelectedCollection, setCollectionData } = collectionSlice.actions
export const getCollections = (state: any) => state.collection.cols;
export const getSelectedCollection = (state: any) => state.collection.selCollection ? state.collection.selCollection : {}
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
      return collections[i].cUnstakingFee
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

const collectionPersistConfig = {
  key: "collection",
  storage: storage,
  whitelist: ["cols", "selCollection"],
};

export default persistReducer(collectionPersistConfig, collectionSlice.reducer)