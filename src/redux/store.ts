import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import attackSlice from "./slices/attackSlice"

const store = configureStore({
  reducer: {
    user: userSlice,
    attack: attackSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
