import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import prizesReducer from "./prizesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    prizes: prizesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch