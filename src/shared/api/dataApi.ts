import type { DatabaseData, UserData, PrizesData } from "./types"
import { mockAccountData } from "./account"

const STORAGE_KEY = "hiro-vpn-database-data"

// Загружает данные из localStorage, если они там есть

function getStoredDatabaseData(): DatabaseData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as DatabaseData
  } catch {
    return null
  }
}

// Сохраняет данные в localStorage

function setStoredDatabaseData(data: DatabaseData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save database data to localStorage:", error)
  }
}

// Загружает данные из data.json

export async function fetchDatabaseData(): Promise<DatabaseData> {
  const stored = getStoredDatabaseData()
  if (stored) {
    return stored
  }

  try {
    const dataModule = await import("./database/data.json")
    const data = dataModule.default as DatabaseData
    setStoredDatabaseData(data)
    return data
  } catch (error) {
    console.error("Error loading database data:", error)
    const defaultData = getDefaultData()
    setStoredDatabaseData(defaultData)
    return defaultData
  }
}

// Загружает только данные пользователя

export async function fetchUserData(): Promise<UserData> {
  const data = await fetchDatabaseData()
  return data.user
}

// Загружает только данные призов

export async function fetchPrizesData(): Promise<PrizesData> {
  const data = await fetchDatabaseData()
  return data.prizes
}

// Возвращает данные по умолчанию (резервные)

function getDefaultData(): DatabaseData {
  return {
    user: mockAccountData,
    prizes: {
      discount5: { title: "Скидка", description: "5%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount10: { title: "Скидка", description: "10%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount20: { title: "Скидка", description: "20%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount30: { title: "Скидка", description: "30%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount40: { title: "Скидка", description: "40%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount50: { title: "Скидка", description: "50%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount60: { title: "Скидка", description: "60%", image: "prize", message: "Активируйте в течение 24 часов" },
      discount70: { title: "Скидка", description: "70%", image: "prize", message: "Активируйте в течение 24 часов" },
      free6: { title: "Бесплатные", description: "6 часов", image: "free", message: "Они уже добавлены к вашей подписке" },
      tryagain: { title: "Попробуйте", description: "Завтра", image: "try" },
    },
  }
}

// Обновляет данные пользователя

export async function updateUserData(updates: Partial<UserData>): Promise<UserData> {
  await new Promise(resolve => setTimeout(resolve, 150))
  const database = await fetchDatabaseData()
  const updatedUser = { ...database.user, ...updates }
  const updatedDatabase: DatabaseData = {
    ...database,
    user: updatedUser,
  }
  setStoredDatabaseData(updatedDatabase)

  return updatedUser
}

// Обновляет данные призов

export async function updatePrizesData(updates: Partial<PrizesData>): Promise<PrizesData> {
  await new Promise(resolve => setTimeout(resolve, 150))
  const database = await fetchDatabaseData()
  const updatedPrizes = { ...database.prizes, ...updates }
  const updatedDatabase: DatabaseData = {
    ...database,
    prizes: updatedPrizes,
  }
  setStoredDatabaseData(updatedDatabase)
  return updatedPrizes
}