import { useCallback, useMemo } from "react"
import CustomIcon from "@/shared/ui/CustomIcon"
import style from "./Quests.module.scss"
import type { IQuestsProps } from "./types"
import Wheel from "../Wheel"
import { useUser, useAppDispatch } from "@/shared/store/hooks"
import { updateUser } from "@/shared/store/userSlice"

type BonusKey = "share" | "review" | "invite" | "likes" | "googleReview" | "yandexReview" | "telegramSubscription"

const Quests: React.FC<IQuestsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { data: userData } = useUser()

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const consecutiveDays = userData?.consecutiveSpinDays ?? 0
  const effectiveDays = Math.max(consecutiveDays, 1)
  const progressWidth = useMemo(() =>
    Math.min(effectiveDays, 7) / 7 * 100,
    [effectiveDays]
  )

  const handleRewardClick = useCallback(async () => {
    try {
      await dispatch(updateUser({ consecutiveSpinDays: 0 })).unwrap()
    } catch (error) {
      console.error("Не удалось получить приз:", error)
    }
  }, [dispatch])

  const handleBonusToggle = useCallback(async (bonusKey: BonusKey) => {
    if (!userData) return
    try {
      const updatedBonuses = {
        ...userData.availableBonuses,
        [bonusKey]: !userData.availableBonuses[bonusKey]
      }
      await dispatch(updateUser({ availableBonuses: updatedBonuses })).unwrap()
    } catch (error) {
      console.error(`Failed to toggle bonus ${bonusKey}:`, error)
    }
  }, [dispatch, userData])

  return (
    <section className={style.quests}>
      <div className={style.bar}>
        <h2 className={style.heading}>Квесты</h2>
        <button
          type="button"
          className={style.close}
          aria-label="Закрыть"
          onClick={handleClose}
        >
          <CustomIcon id="close" width={24} height={24} />
        </button>
      </div>

      <div className={style.featured}>
        <article className={style.wheelCard}>
          <div className={style.wheelCardHead}>
            <div className={style.wheelCardHeadContent}>
              <h3 className={style.wheelTitle}>Колесо фортуны</h3>
              <p className={style.subtitle}>
                Испытайте удачу раз в день и выигрывайте бонусы для VPN!
              </p>
            </div>
            <CustomIcon id="wheelIcon" width={72} height={72} />
          </div>

          <div className={style.wheelCardBody}>
            <Wheel />
          </div>

          <div className={style.streakWrap}>
            <p className={style.streakCaption}>
              Крути колесо 7 дней подряд без пропусков и получи на 7-й день гарантированный 1 день
              подписки!
            </p>
            <ul className={style.streakList}>
              <li className={style.streakValue}>1</li>
              <li className={style.streakValue}>2</li>
              <li className={style.streakValue}>3</li>
              <li className={style.streakValue}>4</li>
              <li className={style.streakValue}>5</li>
              <li className={style.streakValue}>6</li>
              <li className={style.streakValue}>
                7
                <CustomIcon id="free" width={44} height={44} className={style.streakIcon} />
              </li>
              <div
                className={style.progressBar}
                style={{ width: `${progressWidth}%` }}
              ></div>
            </ul>
            {userData?.consecutiveSpinDays === 7 &&
              <button type="button" className={style.rewardBtn} onClick={handleRewardClick}>
                <span>забрать награду</span>
                <CustomIcon id="gift-red" width={24} height={24} />
              </button>
            }
          </div>
        </article>

        <article className={`${style.card} ${style.cardPromo}`}>
          {userData?.availableBonuses.share ? (
            <span className={style.cardTag}>Доступен</span>
          ) : (
            <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
          )}
          <h3 className={style.cardTitle}>Расскажи о HIRO</h3>
          <p className={style.cardText}>
            Напишите пост или статью о сервисе в соцсетях и получите от 15 до 90 дней бесплатного VPN.
            Отправьте ссылки на публикации — мы проверим и начислим награду.
          </p>
          {userData?.availableBonuses.share &&
            <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("share")}>
              <span>Отправить ссылки</span>
            </button>
          }
        </article>
      </div>

      <ul className={style.cards}>
        <li>
          <article className={style.card}>
            {userData?.availableBonuses.review ? (
              <span className={style.cardTag}>Доступен</span>
            ) : (
              <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
            )}
            <h3 className={style.cardTitle}>оставь отзыв</h3>
            <p className={style.cardText}>
              Поделитесь своим мнением о HiroVPN и получите 3 дня VPN бесплатно!
            </p>
            {userData?.availableBonuses.review &&
              <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("review")}>
                Оставить отзыв
              </button>
            }
          </article>
        </li>
        <li>
          <article className={style.card}>
            {userData?.availableBonuses.invite ? (
              <span className={style.cardTag}>Доступен</span>
            ) : (
              <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
            )}
            <h3 className={style.cardTitle}>Поделиться с Друзьями</h3>
            <p className={style.cardText}>
              Пригласите друга в HiroVPN и получите 1 день VPN бесплатно!
            </p>
            {userData?.availableBonuses.invite &&
              <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("invite")}>
                <span>поделиться</span>
                <CustomIcon id="share" width={24} height={24} />
              </button>
            }
          </article>
        </li>
        <li>
          <article className={style.card}>
            {userData?.availableBonuses.likes ? (
              <span className={style.cardTag}>Доступен</span>
            ) : (
              <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
            )}
            <h3 className={style.cardTitle}>Поддержите нас лайками</h3>
            <p className={style.cardText}>
              Поставьте лайки 5 комментариям, с которыми вы согласны, и мы подарим вам 2 дня VPN бесплатно!
            </p>
            {userData?.availableBonuses.likes &&
              <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("likes")}>
                <span>поддержать</span>
                <CustomIcon id="google" width={24} height={24} />
              </button>
            }
          </article>
        </li>
        <li>
          <article className={style.card}>
            {userData?.availableBonuses.googleReview ? (
              <span className={style.cardTag}>Доступен</span>
            ) : (
              <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
            )}
            <h3 className={style.cardTitle}>Оцени нас в Google Картах</h3>
            <p className={style.cardText}>
              Поделись впечатлением и получи 1 день VPN в подарок!
            </p>
            {userData?.availableBonuses.googleReview &&
              <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("googleReview")}>
                <span>оценить</span>
              </button>
            }
          </article>
        </li>
        <li>
          <article className={style.card}>
            {userData?.availableBonuses.yandexReview ? (
              <span className={style.cardTag}>Доступен</span>
            ) : (
              <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
            )}
            <h3 className={style.cardTitle}>Оцени нас в ЯНДЕКС Картах</h3>
            <p className={style.cardText}>
              Поделись впечатлением и получи 1 день VPN в подарок!
            </p>
            {userData?.availableBonuses.yandexReview &&
              <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("yandexReview")}>
                <span>оценить</span>
              </button>
            }
          </article>
        </li>
        <li>
          <article className={style.card}>
            {userData?.availableBonuses.telegramSubscription ? (
              <span className={style.cardTag}>Доступен</span>
            ) : (
              <span className={`${style.cardTag} ${style.cardTagCompleted}`}>Выполнен</span>
            )}
            <h3 className={style.cardTitle}>Подписаться на TG-канал </h3>
            <p className={style.cardText}>
              Подпишитесь на канал HIroVPN - получайте новости и апдейты самыми первыми, а так же 1 день VPN бесплатно!
            </p>
            {userData?.availableBonuses.telegramSubscription &&
              <button type="button" className={style.cardBtn} onClick={() => handleBonusToggle("telegramSubscription")}>
                <span>оценить</span>
                <CustomIcon id="tg" width={24} height={24} />
              </button>
            }
          </article>
        </li>
      </ul>
    </section>
  )
}

export default Quests
