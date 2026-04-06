import { useEffect, useState, useRef } from "react";

import Navigation from "../navigation"

import style from "./Header.module.scss";
import CustomIcon from "@/shared/ui/CustomIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"ru" | "en">("ru")
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen((prev) => !prev)
  }

  const selectLanguage = (lang: "ru" | "en") => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
    // Здесь можно добавить логику смены языка
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header>
      <div className="container">
        <div className={style.inner}>
          <button
            type="button"
            className={style.burgerIcon}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <CustomIcon id="burger" width={24} height={24} />
          </button>
          <a href="/" className={style.logo} aria-label="Логотип">
            <CustomIcon id="logo" width={118} height={44} />
          </a>
          <Navigation />
          <div className={style.languageWrapper} ref={languageDropdownRef}>
            <button
              type="button"
              className={style.language}
              onClick={toggleLanguageDropdown}
              aria-expanded={languageDropdownOpen}
              aria-label="Выбрать язык"
            >
              <span>{language === "ru" ? "РУ" : "EN"}</span>
              <CustomIcon id="down-arrow" width={24} height={24} className={languageDropdownOpen ? style.arrowUp : style.arrowDown} />
            </button>
            {languageDropdownOpen && (
              <div className={style.languageDropdown}>
                <button
                  type="button"
                  className={`${style.languageOption} ${language === "ru" ? style.languageOptionActive : ""}`}
                  onClick={() => selectLanguage("ru")}
                >
                  Русский
                </button>
                <button
                  type="button"
                  className={`${style.languageOption} ${language === "en" ? style.languageOptionActive : ""}`}
                  onClick={() => selectLanguage("en")}
                >
                  English
                </button>
              </div>
            )}
          </div>
          {menuOpen && (
            <>
              <button
                type="button"
                className={style.burgerClose}
                aria-label="Закрыть меню"
                onClick={() => setMenuOpen(false)}
              />
              <div className={`${style.burger} ${menuOpen ? style.burgerOpen : ""}`}>
                <Navigation type="burger" />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;