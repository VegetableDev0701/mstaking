import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/lib/features/counter/counterSlice'
import collectionReducer from '@/lib/features/collectionSlice'
import tokenReducer from '@/lib/features/tokenSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      collection: collectionReducer,
      token: tokenReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']