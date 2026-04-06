export interface UserData {
  email: string
  password: string
  consecutiveSpinDays: number
  lastSpinTime: string | null
  rewardClaimed: boolean
  availableBonuses: {
    share: boolean
    review: boolean
    invite: boolean
    likes: boolean
    googleReview: boolean
    yandexReview: boolean
    telegramSubscription: boolean
  }
}

export interface PrizeItem {
  title: string
  description: string
  image: string
  message?: string
}

export interface PrizesData {
  discount5: PrizeItem
  discount10: PrizeItem
  discount20: PrizeItem
  discount30: PrizeItem
  discount40: PrizeItem
  discount50: PrizeItem
  discount60: PrizeItem
  discount70: PrizeItem
  free6: PrizeItem
  tryagain: PrizeItem
}

export interface DatabaseData {
  user: UserData
  prizes: PrizesData
}

export type DataLoadingStatus = "idle" | "loading" | "succeeded" | "failed"