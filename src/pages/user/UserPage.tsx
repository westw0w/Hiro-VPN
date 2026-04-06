import { useState, useEffect } from "react";
import { useAppDispatch } from "@/shared/store/hooks";
import { fetchUser } from "@/shared/store/userSlice";
import { useUser } from "@/shared/store/hooks";
import Quests from "@/features/quests/Quests";
import style from "./UserPage.module.scss";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { data: user, status: userStatus, error: userError } = useUser();
  const [showQuests, setShowQuests] = useState(true);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, userStatus]);

  const handleCloseQuests = () => {
    setShowQuests(false);
  };

  const handleOpenQuests = () => {
    setShowQuests(true);
  };

  const loading = userStatus === "loading";
  const error = userError;

  return (
    <main className={style.main}>
      <div className="container">
        <h1 className={style.title}>АККАУНТ</h1>

        {showQuests ? (
          <Quests onClose={handleCloseQuests} />
        ) : (
          <div className={style.info}>
            {loading && <p>Загрузка данных аккаунта...</p>}
            {error && <p>Ошибка: {error}</p>}
            {user && (
              <div className={style.details}>
                <div className={style.field}>
                  <span className={style.label}>Почта: </span>
                  <span className={style.value}>{user.email}</span>
                </div>
                <div className={style.field}>
                  <span className={style.label}>Пароль: </span>
                  <span className={style.value}>{user.password}</span>
                </div>

                <button className={style.questBtn} onClick={handleOpenQuests}>
                  Квесты
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default UserPage;