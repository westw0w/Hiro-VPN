import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { PrizesData, DataLoadingStatus } from "../api/types"
import { fetchPrizesData, updatePrizesData } from "../api/dataApi"

// Состояние призов в хранилище
interface PrizesState {
  data: PrizesData | null
  status: DataLoadingStatus
  error: string | null
}

// Начальное состояние
const initialState: PrizesState = {
  data: null,
  status: "idle",
  error: null,
}

// Асинхронное действие для загрузки данных призов
export const fetchPrizes = createAsyncThunk(
  "prizes/fetchPrizes",
  async () => {
    const response = await fetchPrizesData()
    return response
  }
)

// Асинхронное действие для обновления данных призов
export const updatePrizes = createAsyncThunk(
  "prizes/updatePrizes",
  async (updates: Partial<PrizesData>) => {
    const response = await updatePrizesData(updates)
    return response
  }
)

const prizesSlice = createSlice({
  name: "prizes",
  initialState,
  reducers: {
    clearPrizes: (state) => {
      state.data = null
      state.status = "idle"
      state.error = null
    },
    setPrizes: (state, action: PayloadAction<PrizesData>) => {
      state.data = action.payload
      state.status = "succeeded"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrizes.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchPrizes.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchPrizes.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to load prizes data"
      })
      .addCase(updatePrizes.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updatePrizes.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(updatePrizes.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to update prizes data"
      })
  },
})

export const { clearPrizes, setPrizes } = prizesSlice.actions
export default prizesSlice.reducer