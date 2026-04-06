import type { UserData } from "./types"
export type AccountData = UserData

function startOfDay(d: Date): number {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

// Дни между двумя датами по локальному календарю

export function calendarDaysBetweenEarlierAndNow(lastSpinIso: string): number {
  const last = new Date(lastSpinIso)
  const now = new Date()
  return Math.round((startOfDay(now) - startOfDay(last)) / 86400000)
}

export const mockAccountData: AccountData = {
  email: "user@example.com",
  password: "password123",
  consecutiveSpinDays: 0,
  lastSpinTime: null,
  rewardClaimed: false,
  availableBonuses: {
    share: true,
    review: false,
    invite: true,
    likes: true,
    googleReview: false,
    yandexReview: true,
    telegramSubscription: false,
  },
}

// Эмулирует запрос к API для получения данных аккаунта.
export async function fetchAccountData(): Promise<AccountData> {
  const url = import.meta.env.VITE_ACCOUNT_API_URL as string | undefined
  if (url) {
    const res = await fetch(url, { credentials: "include" })
    if (!res.ok) throw new Error("Account data request failed")
    return res.json() as Promise<AccountData>
  }
  // Эмуляция задержки сети
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockAccountData
}

// Эмулирует обновление данных аккаунта 

export async function updateAccountData(updates: Partial<AccountData>): Promise<AccountData> {
  const url = import.meta.env.VITE_ACCOUNT_API_URL as string | undefined
  if (url) {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    })
    if (!res.ok) throw new Error("Account update failed")
    return res.json() as Promise<AccountData>
  }
  await new Promise((resolve) => setTimeout(resolve, 300))
  const updated = { ...mockAccountData, ...updates }
  Object.assign(mockAccountData, updated)
  return updated
}
