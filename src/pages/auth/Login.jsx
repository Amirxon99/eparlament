import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstanse";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import styles from "./login.module.css";
import "../../i18n";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("auth");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        username: form.username,
        password: form.password,
      });

      if (data?.tokenBody && data?.refreshToken && data?.userName) {
        login(data.userName, data.tokenBody, data.refreshToken);
        navigate("/");
      } else {
        throw new Error("Invalid server response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || t("invalid_credentials") || "Login yoki parol noto‘g‘ri");
    }
  };

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className={styles.wrapper}>
      {/* Chap qism */}
      <div className={styles.leftSection}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h2 className={styles.title}>
          {t("title") ||
            "Qonunchilik palatasida qonun loyihalarini ko‘rib chiqishning barcha bosqichlarini raqamlashtirish tizimi"}
        </h2>
        <p className={styles.subtitle}>
          {t("subtitle") ||
            "Ushbu tizim orqali davlat organlari normativ-huquqiy hujjat loyihalarini umumxalq muhokamasi va idoraviy kelishuvdan o‘tkazadilar."}
        </p>
        <div className={styles.contactBox}>
          <p>📞 +998 55 500 30 02</p>
          <p>💬 Telegram bot</p>
        </div>
      </div>

      {/* O‘ng qism */}
      <div className={styles.rightSection}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{t("login") || "Tizimga kirish"}</h3>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>{t("username") || "Login"}</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder={t("username_placeholder") || "Foydalanuvchi nomi"}
              required
            />

            <label>{t("password") || "Parol"}</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t("password_placeholder") || "Parol kiriting"}
              required
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.loginBtn}>
              {t("login") || "Kirish"}
            </button>
          </form>
        </div>

        <select
          className={styles.langSelect}
          value={i18n.language}
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value="uz">Oʻzbek (Lotin)</option>
          <option value="kr">Ўзбек (Кирилл)</option>
          <option value="ru">Русский</option>
        </select>
      </div>
    </div>
  );
}

export default Login;
