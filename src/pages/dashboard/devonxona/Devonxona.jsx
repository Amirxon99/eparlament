import React, { useState, useMemo } from "react";
import styles from "./devonxona.module.css";
import FilterCollapse from "../../../components/common/filterCollapse/FilterCollapse.jsx";
import DocumentTable from "../../../components/common/documentTable/DocumentTable.jsx";
import mockData from "../../../../public/mockData.js";


const Devonxona = () => {
  
  const [data] = useState(mockData);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "Barchasi",
    fromOrg: "",
    toManager: "",
    number: "",
  });

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const filtered = useMemo(() => {
    return data.filter((d) => {
      if (filters.dateFrom) {
        if (d.date < filters.dateFrom) return false;
      }
      if (filters.dateTo) {
        if (d.date > filters.dateTo) return false;
      }
      if (filters.status && filters.status !== "Barchasi") {
        if (d.status !== filters.status) return false;
      }
      if (filters.fromOrg) {
        if (!d.organization.toLowerCase().includes(filters.fromOrg.toLowerCase()))
          return false;
      }

      
      if (filters.toManager) {
        if (!d.manager.toLowerCase().includes(filters.toManager.toLowerCase()))
          return false;
      }

     
      if (filters.number) {
        if (!d.number.toLowerCase().includes(filters.number.toLowerCase()))
          return false;
      }

      return true;
    });
  }, [data, filters]);

  return (
    <div className={styles.container}>
   
      <div className={styles.main}>
    
        <div className={styles.header}>
          <h1>Kelib tushgan hujjatlar</h1>
          <div className={styles.headerRight}>
            <button className={styles.exportBtn}>Eksport</button>
            <div className={styles.totalBadge}>Hujjatlar soni: <span>{data.length}</span></div>
          </div>
        </div>

        <FilterCollapse onFilter={handleFilter} initial={filters} />

        <DocumentTable data={filtered} perPage={10} />
      </div>
    </div>
  );
};

export default Devonxona;
