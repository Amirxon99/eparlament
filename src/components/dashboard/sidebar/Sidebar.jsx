import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { Home, FileText, LogOut, Phone } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { id: "home", icon: <Home size={22} />, label: "Bosh sahifa", path: "/" },
    {
      id: "devonxona",
      icon: <FileText size={22} />,
      label: "Devonxona",
      path: "/devonxona",
    },
  ];

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? "<" : ">"}
      </button>

      <div className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.id}
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>

      <div className={styles.bottom}>
        <div className={styles.contact}>
          <Phone size={20} />
          {isOpen && <span>+998 55 500 30 02</span>}
        </div>
        <div className={styles.logout} onClick={logout}>
          <LogOut size={20} />
          {isOpen && <span>Chiqish</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
