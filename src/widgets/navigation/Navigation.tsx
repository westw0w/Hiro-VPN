import style from "./Navigation.module.scss";
import type { INavigationProps } from "./types";

const Navigation = (props: INavigationProps) => {
  const {
    type
  } = props;
  return (
    <nav className={`${type === "burger" ? style.burgerNav : style.nav}`} aria-label="Основное меню">
      <a href="#" className={`${type === "burger" ? style.burgerNavLink : style.navLink}`}>FAQ</a>
      <a href="#" className={`${type === "burger" ? style.burgerNavLink : style.navLink}`}>Тарифы</a>
      {type === "burger" ?
        <a href="#" className={style.burgerNavLink}>Скачать</a>
        :
        <a href="#" className={`${style.navDownload} ${style.navLink}`}>Скачать</a>
      }
      <a href="#" className={`${type === "burger" ? style.burgerNavLink : style.navLink}`}>Блог</a>
      <a href="#" className={`${type === "burger" ? style.burgerNavLink : style.navLink} ${style.navLinkActive}`}>Аккаунт</a>
    </nav>
  );
};

export default Navigation;