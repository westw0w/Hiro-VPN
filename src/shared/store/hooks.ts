import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./index"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Хук для получения данных пользователя
export const useUser = () => {
  return useAppSelector((state) => state.user)
}

// Хук для получения данных призов
export const usePrizes = () => {
  return useAppSelector((state) => state.prizes)
}

// Хук для проверки, загружены ли данные пользователя
export const useUserLoaded = () => {
  const { status, data } = useUser()
  return status === "succeeded" && data !== null
}

// Хук для проверки, загружены ли данные призов
export const usePrizesLoaded = () => {
  const { status, data } = usePrizes()
  return status === "succeeded" && data !== null
}

// Хук для получения конкретного приза по ключу
export const usePrize = (key: keyof ReturnType<typeof usePrizes>["data"]) => {
  const { data } = usePrizes()
  return data?.[key] || null
}