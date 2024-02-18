import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from '@/lib/features/collectionSlice'
import tokenReducer from '@/lib/features/tokenSlice'
import rewardReducer from '@/lib/features/rewardSlice'
import routeReducer from '@/lib/features/routerSlice'
import addressReducer from '@/lib/features/addressSlice'

export const makeStore = configureStore({
  reducer: {
    collection: collectionReducer,
    token: tokenReducer,
    rewards: rewardReducer,
    routes: routeReducer,
    address: addressReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
