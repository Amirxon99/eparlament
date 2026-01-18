import React, { useState } from "react";
import styles from "./home.module.css";
import { useTranslation } from "react-i18next";

import { FaInbox, FaEye, FaBookOpen, FaBookReader, FaCheckCircle, FaClock, FaUndoAlt, FaTimesCircle, FaPaperPlane } from "react-icons/fa";

const Home = () => {
  const { t, i18n } = useTranslation("d_home");
  const [lang, setLang] = useState("uz");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  const stats = [
    { color: "#0040ff", label: t("kelib_tushgan"), value: 1775, icon: <FaInbox /> },
    { color: "#ff3366", label: t("korib_chiqilgan"), value: 247, icon: <FaEye /> },
    { color: "#0040ff", label: t("birinchi_oqish"), value: 126, icon: <FaBookOpen /> },
    { color: "#008f39", label: t("ikkinchi_oqish"), value: 128, icon: <FaBookReader /> },
    { color: "#00b341", label: t("uchinchi_oqish"), value: 50, icon: <FaCheckCircle /> },
    { color: "#ff9900", label: t("muddat_yaqinlashgan"), value: 0, icon: <FaClock /> },
    { color: "#ff6600", label: t("kengashda_qaytarilgan"), value: 7, icon: <FaUndoAlt /> },
    { color: "#ff0000", label: t("rad_etilgan"), value: 64, icon: <FaTimesCircle /> },
    { color: "#00aaff", label: t("senatga_yuborilgan"), value: 209, icon: <FaPaperPlane /> },
    { color: "#ffcc00", label: t("senatdan_qaytarilgan"), value: 59, icon: <FaPaperPlane/> },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("title")}</h2>
      <div className={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.iconBox}
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <div className={styles.info}>
              <h3>{item.value}</h3>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
