import React, { useState } from "react";
import GridViewIcon from "../../icons/GridViewIcon";
import ListViewIcon from "../../icons/ListViewIcon";
import styles from "./filterHeader.module.css";

const displayView = {
  grid: "grid",
  list: "list",
};

export default function FilterHeader(props) {
  const [activeView, setActiveView] = useState(displayView.grid);
  const { toggleView } = props;

  const toggleDisplayView = () => {
    toggleView();
    if (activeView === displayView.grid) {
      setActiveView(displayView.list);
    } else {
      setActiveView(displayView.grid);
    }
  };

  return (
    <div className={styles.filterHeader}>
      <p className={styles.page}>Home / Shop</p>
      <div className={styles.filterHeaderOptions}>
        {/* <div className={styles.dropdown}>
          <p>
            Gender: <span className={styles.selectedOption}>Unisex</span>
          </p>
          <div className={styles.genderDropdownContent}>
            <p>Mens</p>
            <p>Womens</p>
            <p>Unisex</p>
          </div>
        </div> */}
        <div className={styles.actionBtns}>
          <div
            className={`${styles.listViewBtn} ${
              activeView === displayView.list && styles.activeBtn
            }`}
            onClick={toggleDisplayView}
          >
            <ListViewIcon color={activeView === displayView.list && "white"} />
          </div>
          <div
            className={`${styles.gridViewBtn} ${
              activeView === displayView.grid && styles.activeBtn
            }`}
            onClick={toggleDisplayView}
          >
            <GridViewIcon color={activeView === displayView.grid && "white"} />
          </div>
        </div>
      </div>
    </div>
  );
}
