'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { persistStore } from "redux-persist";
persistStore(makeStore);

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <Provider store={makeStore}>{children}</Provider>
}