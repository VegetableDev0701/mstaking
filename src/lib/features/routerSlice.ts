import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export type ROUTE = 'COLLECTION' | 'Other' | 'HOME'
export interface routeState {
  routeString: ROUTE
}
const initialRouteState: routeState = {
  routeString: 'Other',
}

export const routeSlice = createSlice({
  name: 'route',
  initialState: initialRouteState,
  reducers: {
    setRoute: (state, action: PayloadAction<{ routeStr: ROUTE }>) => {
      state.routeString = action.payload.routeStr
    }
  }
})

// Action creators are generated for each case reducer function
export const { setRoute } = routeSlice.actions
export const getRoute = (state: any) => state.routes.routeString;
const routerPersistConfig = {
  key: "route",
  storage: storage,
  whitelist: ["routeString"],
};

export default persistReducer(routerPersistConfig, routeSlice.reducer)