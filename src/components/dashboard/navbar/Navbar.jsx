import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { User } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation("auth");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span className={styles.title}>
        {t("nav_title")}
        </span>
      </div>

      <div className={styles.right}>
        <select
          className={styles.langSelect}
          value={i18n.language}
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value="uz">Oʻzbek</option>
          <option value="kr">Ўзбек</option>
          <option value="ru">Русский</option>
        </select>

        <div className={styles.profile}>
          <User size={22} />
          {user && (
            <span className={styles.username}>
              {user}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
