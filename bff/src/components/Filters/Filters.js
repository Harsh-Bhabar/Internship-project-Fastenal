import React, { useState } from "react";
import PriceSlider from "../PriceSlider/PriceSlider";
import CollapseCloseIcon from "../../icons/CollapseCloseIcon";
import CollapseOpenIcon from "../../icons/CollapseOpenIcon";
import { toggleToastNotification } from "../../services/ToggleToast";
import styles from "./filters.module.css";
import FilterIcon from "../../icons/FilterIcon";

const brands = [
  "armani exchange",
  "casio",
  "daniel wellington",
  "fossil",
  "helix",
  "michael kors",
  "timex",
  "tissot",
  "united colors of benetton",
];

const movementTypes = ["analogue", "digital"];

const genders = ["mens", "womens"];

const colors = [
  "lilac",
  "black",
  "white",
  "brown",
  "green",
  "gold",
  "rose gold",
  "silver",
  "grey",
];

export default function Filters(props) {
  const [showFilterSection, setShowFilterSection] = useState({
    priceSlider: true,
    gender: true,
    brand: true,
    movementType: true,
    dialColor: true,
  });
  const [clearFilter, setClearFilter] = useState(false);

  const { filterValues, applyFilters, applyPriceFilters, clearFilters } = props;

  const toggleFilterSection = (sectionToToggle) => {
    setShowFilterSection((prevValue) => {
      return {
        ...prevValue,
        [sectionToToggle]: !prevValue[sectionToToggle],
      };
    });
  };

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handlePriceChange = debounce((priceRange) =>
    applyPriceFilters(priceRange)
  );

  return (
    <div className={`${styles.filters} disableUserSelect`}>
      <div className={styles.filterHeading}>
        <div className={styles.filterHeadingDiv}>
          <FilterIcon />
          <p className={styles.mainHeading}>Filters</p>
        </div>
        <button
          className={styles.clearFiltersBtn}
          onClick={() => {
            toggleToastNotification("Filters cleared!");
            setClearFilter(!clearFilter);
            clearFilters();
          }}
        >
          Clear all
        </button>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeading}>
          <p className={styles.subHeading}>Price Range</p>
          <div
            className={styles.collapseBtn}
            onClick={() => toggleFilterSection("priceSlider")}
          >
            {showFilterSection.priceSlider ? (
              <CollapseCloseIcon />
            ) : (
              <CollapseOpenIcon />
            )}
          </div>
        </div>
        {showFilterSection.priceSlider && (
          <PriceSlider min={1} max={50000} onChange={handlePriceChange} clearFilter={clearFilter} />
        )}
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeading}>
          <p className={styles.subHeading}>Gender</p>
          <div
            className={styles.collapseBtn}
            onClick={() => toggleFilterSection("gender")}
          >
            {showFilterSection.gender ? (
              <CollapseCloseIcon />
            ) : (
              <CollapseOpenIcon />
            )}
          </div>
        </div>
        {showFilterSection.gender && (
          <div className={styles.filterSectionContent}>
            {genders.map((gender) => {
              return (
                <label className={styles.container} key={gender}>
                  {gender}
                  <input
                    type="checkbox"
                    checked={filterValues.genderToFilter.has(gender)}
                    onChange={() => applyFilters("gender", gender)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeading}>
          <p className={styles.subHeading}>Brand</p>
          <div
            className={styles.collapseBtn}
            onClick={() => toggleFilterSection("brand")}
          >
            {showFilterSection.brand ? (
              <CollapseCloseIcon />
            ) : (
              <CollapseOpenIcon />
            )}
          </div>
        </div>
        {showFilterSection.brand && (
          <div className={styles.filterSectionContent}>
            {brands.map((brand) => {
              return (
                <label className={styles.container} key={brand}>
                  {brand}
                  <input
                    type="checkbox"
                    checked={filterValues.brandsToFilter.has(brand)}
                    onChange={() => applyFilters("brands", brand)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeading}>
          <p className={styles.subHeading}>Movement Type</p>
          <div
            className={styles.collapseBtn}
            onClick={() => toggleFilterSection("movementType")}
          >
            {showFilterSection.movementType ? (
              <CollapseCloseIcon />
            ) : (
              <CollapseOpenIcon />
            )}
          </div>
        </div>
        {showFilterSection.movementType && (
          <div className={styles.filterSectionContent}>
            {movementTypes.map((movementType) => {
              return (
                <label className={styles.container} key={movementType}>
                  {movementType}
                  <input
                    type="checkbox"
                    checked={filterValues.movementTypesToFilter.has(
                      movementType
                    )}
                    onChange={() => applyFilters("movementType", movementType)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionHeading}>
          <p className={styles.subHeading}>Dial Color</p>
          <div
            className={styles.collapseBtn}
            onClick={() => toggleFilterSection("dialColor")}
          >
            {showFilterSection.dialColor ? (
              <CollapseCloseIcon />
            ) : (
              <CollapseOpenIcon />
            )}
          </div>
        </div>

        {showFilterSection.dialColor && (
          <div className={styles.filterSectionContent}>
            {colors.map((color) => {
              return (
                <label className={styles.container} key={color}>
                  {color}
                  <input
                    type="checkbox"
                    checked={filterValues.colorToFilter.has(color)}
                    onChange={() => applyFilters("color", color)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
