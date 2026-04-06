const LAST_SPIN_KEY = "hiro-vpn-wheel-last-spin-ms"

export function getLastSpinAtMs(): number | null {
  try {
    const v = localStorage.getItem(LAST_SPIN_KEY)
    if (v == null) return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

export function setLastSpinAtNow(): void {
  try {
    localStorage.setItem(LAST_SPIN_KEY, String(Date.now()))
  } catch {
    console.error("Ошибка при записи времени")
  }
}

function startOfLocalDay(d: Date): number {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

// Разрешён ли спин сегодня
export function canSpinWheel(): boolean {
  const last = getLastSpinAtMs()
  if (last == null) return true
  return startOfLocalDay(new Date(last)) < startOfLocalDay(new Date())
}

//  Мс до полуночи следующего дня, если уже крутили сегодня
export function getRemainingCooldownMs(): number {
  if (canSpinWheel()) return 0
  const last = getLastSpinAtMs()
  if (last == null) return 0
  const next = new Date(last)
  next.setDate(next.getDate() + 1)
  next.setHours(0, 0, 0, 0)
  return Math.max(0, next.getTime() - Date.now())
}
