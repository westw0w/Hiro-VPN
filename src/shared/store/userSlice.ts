import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { UserData, DataLoadingStatus } from "../api/types"
import { fetchUserData, updateUserData } from "../api/dataApi"

// Состояние пользователя в хранилище
interface UserState {
  data: UserData | null
  status: DataLoadingStatus
  error: string | null
}

// Начальное состояние
const initialState: UserState = {
  data: null,
  status: "idle",
  error: null,
}

// Асинхронное действие для загрузки данных пользователя
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const response = await fetchUserData()
    return response
  }
)

// Асинхронное действие для обновления данных пользователя
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updates: Partial<UserData>) => {
    const response = await updateUserData(updates)
    return response
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null
      state.status = "idle"
      state.error = null
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload
      state.status = "succeeded"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to load user data"
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to update user data"
      })
  },
})

export const { clearUser, setUser } = userSlice.actions
export default userSlice.reducer