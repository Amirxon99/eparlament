import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Navbar from "../components/dashboard/navbar/Navbar";
import styles from "./dashboardLayout.module.css";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <Outlet /> {/* 🔹 Bu yerda Home, Projects va boshqalar chiqadi */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
