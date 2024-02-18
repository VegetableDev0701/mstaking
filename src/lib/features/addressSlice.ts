import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface addressState {
  address: string
}
const initialAddressState: addressState = {
  address: '',
}

export const addressSlice = createSlice({
  name: 'route',
  initialState: initialAddressState,
  reducers: {
    setAddress: (state, action: PayloadAction<{address: string}>) => {
      state.address = action.payload.address
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAddress } = addressSlice.actions
export const getAddress = (state: any) => state.address.address
const routerPersistConfig = {
  key: "address",
  storage: storage,
  whitelist: ["address"],
};

export default persistReducer(routerPersistConfig, addressSlice.reducer)