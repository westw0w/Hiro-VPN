import CustomIcon from "@/shared/ui/CustomIcon";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={style.content}>
          <div className={style.inner}>
            <div className={style.col}>
              <CustomIcon id="logo-footer" width={65} height={24} />
              <ul className={style.links}>
                <li>
                  <a href="#" className={style.link}>FAQ</a>
                </li>
                <li>
                  <a href="#" className={style.link}>Тарифы</a>
                </li>
                <li>
                  <a href="#" className={style.link}>Блог</a>
                </li>
                <li>
                  <a href="#" className={style.link}>Роутеры</a>
                </li>
                <li>
                  <a href="#" className={style.link}>Партнёрам</a>
                </li>
                <li>
                  <a href="#" className={style.link}>Аккаунт</a>
                </li>
              </ul>
            </div>
            <div className={style.col}>
              <h4 className={style.colHeading}>Скачать</h4>
              <ul className={style.links}>
                <li className={style.item}>
                  <CustomIcon id="app-store" width={24} height={24} />
                  <a href="#" className={style.link}>iOS</a>
                </li>
                <li className={style.item}>
                  <CustomIcon id="google-play" width={24} height={24} />
                  <a href="#" className={style.link}>Android</a>
                </li>
                <li className={style.item}>
                  <CustomIcon id="android-tv" width={24} height={24} />
                  <a href="#" className={style.link}>Android TV</a>
                </li>
                <li className={style.item}>
                  <CustomIcon id="windows" width={24} height={24} />
                  <a href="#" className={style.link}>Windows</a>
                </li>
                <li className={style.item}>
                  <CustomIcon id="mac-os" width={24} height={24} />
                  <a href="#" className={style.link}>Mac OS</a>
                </li>
                <li className={style.item}>
                  <CustomIcon id="linux" width={24} height={24} />
                  <a href="#" className={style.link}>Linux</a>
                </li>
              </ul>
            </div>
            <div className={style.col}>
              <h4 className={style.colHeading}>Способы оплаты</h4>
              <ul className={style.payments}>
                <li className={style.item}>
                  <CustomIcon id="sbp" width={24} height={24} />
                  <span className={style.payment}>СБП</span>
                </li>
                <li className={style.item}>
                  <CustomIcon id="sberpay" width={24} height={24} />
                  <span className={style.payment}>СберPay</span>
                </li>
                <li className={style.item}>
                  <CustomIcon id="tpay" width={24} height={24} />
                  <span className={style.payment}>Tinkoff Pay</span>
                </li>
                <li className={style.item}>
                  <CustomIcon id="credit-card" width={24} height={24} />
                  <span className={style.payment}>Банковская карта</span>
                </li>
                <li className={style.item}>
                  <CustomIcon id="tether" width={24} height={24} />
                  <span className={style.payment}>Криптовалюта</span>
                </li>
              </ul>
            </div>
            <div className={style.col}>
              <h4 className={style.colHeading}>Поддержка 24/7</h4>
              <a href="#" className={style.btn}>
                Telegram
                <CustomIcon id="telegram" width={24} height={24} />
              </a>
              <div className={style.legal}>
                <a href="#" className={style.legalLink}>Публичная оферта</a>
                <a href="#" className={style.legalLink}>Пользовательское соглашение</a>
              </div>
            </div>
          </div>
          <div className={style.copy}>
            <span>© 2025 Wolle Development Limited. Все права защищены.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;