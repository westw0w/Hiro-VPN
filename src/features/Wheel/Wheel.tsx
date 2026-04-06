import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { usePrizes, useUser, useAppDispatch } from "@/shared/store/hooks";
import { fetchPrizes } from "@/shared/store/prizesSlice";
import { updateUser } from "@/shared/store/userSlice";
import style from "./Wheel.module.scss";
import CustomIcon from "@/shared/ui/CustomIcon";

const Wheel = () => {
  const dispatch = useAppDispatch();
  const { data: prizes, status } = usePrizes();
  const { data: userData } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<{ title: string; description: string; image: string; message: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Текущее время, обновляемое каждую секунду для точного отсчета
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPrizes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    let animationFrameId: number | undefined;
    const intervalId = window.setInterval(() => {
      animationFrameId = requestAnimationFrame(() => {
        setCurrentTime(Date.now());
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Вычисление оставшегося времени
  const { isCooldown, timeLeft } = useMemo(() => {
    if (!userData?.lastSpinTime) {
      return { isCooldown: false, timeLeft: null };
    }

    const lastSpin = new Date(userData.lastSpinTime).getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const elapsed = currentTime - lastSpin;
    const remaining = twentyFourHours - elapsed;

    if (remaining > 0) {
      return { isCooldown: true, timeLeft: Math.floor(remaining / 1000) };
    } else {
      return { isCooldown: false, timeLeft: null };
    }
  }, [userData, currentTime]);

  // Разделение времени на часы, минуты, секунды для отдельного отображения
  const { hours, minutes, seconds } = useMemo(() => {
    if (!timeLeft) return { hours: 0, minutes: 0, seconds: 0 };
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;
    return { hours: hrs, minutes: mins, seconds: secs };
  }, [timeLeft]);

  // Форматирование с ведущими нулями и разбиение на цифры
  const [hourDigits, minuteDigits, secondDigits] = useMemo(() => {
    const format = (num: number) => num.toString().padStart(2, "0");
    return [
      format(hours).split(""),
      format(minutes).split(""),
      format(seconds).split("")
    ];
  }, [hours, minutes, seconds]);

  // Преобразуем объект призов в массив
  const prizeEntries = useMemo(() => {
    if (!prizes) return [];
    return Object.entries(prizes);
  }, [prizes]);

  const prizeCount = prizeEntries.length;
  const itemWidth = 122;
  const gap = 4;
  const itemTotalWidth = itemWidth + gap;

  // Для бесконечной прокрутки создаем достаточно элементов
  const duplicatedEntries = useMemo(() => {
    if (prizeCount === 0) return [];
    const copies = 10;
    let result: typeof prizeEntries = [];

    for (let i = 0; i < copies; i++) {
      result = [...result, ...prizeEntries];
    }

    return result;
  }, [prizeEntries, prizeCount]);

  const spinWheel = useCallback(() => {
    if (isSpinning || prizeCount === 0 || !wheelContainerRef.current) {
      return;
    }

    setIsSpinning(true);

    // Случайное количество прокруток
    const spins = 3 + Math.floor(Math.random() * 4);

    // Случайный конечный элемент
    const targetIndex = Math.floor(Math.random() * prizeCount);

    const containerWidth = wheelContainerRef.current.clientWidth;
    const totalWidth = prizeCount * itemTotalWidth;
    const targetCenterPosition = targetIndex * itemTotalWidth + itemWidth / 2;
    const containerCenter = containerWidth / 2;
    const targetX = containerCenter - targetCenterPosition;
    const spinsOffset = spins * totalWidth;
    const finalOffset = targetX - spinsOffset + 60;

    // Анимация с плавным замедлением
    animate(x, finalOffset, {
      duration: 3,
      ease: [0.2, 0.8, 0.4, 1],
      onComplete: () => {
        setIsSpinning(false);

        // Обновляем данные пользователя
        const now = new Date().toISOString();
        const currentConsecutiveSpinDays = userData?.consecutiveSpinDays ?? 0;
        const nextStreak = Math.min(currentConsecutiveSpinDays + 1, 7);

        dispatch(updateUser({
          consecutiveSpinDays: nextStreak,
          lastSpinTime: now,
        }));

        // Показываем выигранный приз в модальном окне
        const [, prize] = prizeEntries[targetIndex];
        setWonPrize(prize);
        setShowModal(true);
      },
    });
  }, [isSpinning, prizeCount, itemWidth, itemTotalWidth, x, prizeEntries, userData, dispatch]);

  if (status === "loading" || status === "failed" || !prizes) {
    return <div className={style.wheel}>
      <div className={style.loader}>
        Загрузка призов...
      </div>
    </div>;
  }

  const closeModal = () => {
    setShowModal(false);
    setWonPrize(null);
  };


  return (
    <div className={style.wheel}>
      {isCooldown ? (
        <div className={style.cooldownOverlay}>
          <div className={style.timerTop}>
            <span className={style.timerValue}>{hourDigits[0]}</span>
            <span className={style.timerValue}>{hourDigits[1]}</span>
            <span className={style.timerSeparator}>:</span>
            <span className={style.timerValue}>{minuteDigits[0]}</span>
            <span className={style.timerValue}>{minuteDigits[1]}</span>
            <span className={style.timerSeparator}>:</span>
            <span className={style.timerValue}>{secondDigits[0]}</span>
            <span className={style.timerValue}>{secondDigits[1]}</span>
          </div>
          <div className={style.timerBottom}>
            <span className={style.timerDescription}>Часы</span>
            <span className={style.timerDescription}>Минуты</span>
            <span className={style.timerDescription}>Секунды</span>
          </div>
        </div>
      ) : (
        <>
          <div className={style.wheelContainer} ref={wheelContainerRef}>
            <motion.ul
              className={style.prizesList}
              style={{ x }}
              initial={{ x: 0 }}
            >
              {duplicatedEntries.map(([key, prize], index) => (
                <li key={`${key}-${index}`} className={style.prizeItem}>
                  <h3 className={style.prizeTitle}>{prize.title}</h3>
                  <div className={style.prizeImage}>
                    <CustomIcon id={prize.image} width={120} height={120} />
                  </div>
                  <h4 className={style.prizeDescription}>{prize.description}</h4>
                </li>
              ))}
            </motion.ul>
            <CustomIcon id="win-stroke" width={122} height={208} className={style.winStroke} />
          </div>
          <button
            type="button"
            className={style.spinButton}
            onClick={spinWheel}
            disabled={isSpinning}
          >
            <span>{isSpinning ? "Крутится..." : "Испытать удачу"}</span>
            <CustomIcon id="gift" width={24} height={24} />
          </button>
        </>
      )}
      {showModal && wonPrize && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            {wonPrize.message ?
              <h2 className={style.modalTitle}>Поздравляем! Вы выиграли</h2>
              :
              <h2 className={style.modalTitle}>В другой раз повезёт!</h2>
            }
            <div className={style.modalPrize}>
              <p className={style.modalPrizeTitle}>{wonPrize.title}</p>
              <CustomIcon id={wonPrize.image} width={120} height={120} />
              <p className={style.modalPrizeDescription}>{wonPrize.description}</p>
            </div>
            {wonPrize.message && (
              <p className={style.modalMessage}>{wonPrize.message}</p>
            )}
            <button
              type="button"
              className={style.modalButton}
              onClick={closeModal}
            >
              Продолжить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wheel;
