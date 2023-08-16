import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleToastNotification } from "../../services/ToggleToast";
import styles from "./searchBar.module.css";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSubmitSearchQuery();
  };

  const handleSubmitSearchQuery = () => {
    if (searchQuery.length === 0) {
      toggleToastNotification(
        "Search query cannot be empty!",
        "search-query-id"
      );
      return;
    }

    navigate(`/search-results/${searchQuery}`);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <svg
        className={styles.searchBtn}
        onClick={handleSubmitSearchQuery}
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.4988 0C13.2822 0.00337372 15.9506 1.11057 17.9188 3.07875C19.887 5.04692 20.9942 7.71536 20.9975 10.4988C20.9901 12.7598 20.246 14.9568 18.8778 16.7569L23.5578 21.4369C23.6977 21.5761 23.8088 21.7414 23.8846 21.9235C23.9605 22.1056 23.9997 22.3009 24 22.4982C24.0003 22.6955 23.9616 22.8909 23.8862 23.0733C23.8109 23.2556 23.7003 23.4212 23.5608 23.5608C23.4212 23.7003 23.2556 23.8109 23.0733 23.8862C22.8909 23.9616 22.6955 24.0003 22.4982 24C22.3009 23.9997 22.1056 23.9605 21.9235 23.8846C21.7414 23.8088 21.5761 23.6977 21.4369 23.5578L16.7569 18.8778C14.9568 20.246 12.7598 20.9901 10.4988 20.9975C7.71433 20.9975 5.04392 19.8914 3.07502 17.9225C1.10612 15.9536 -6.26677e-07 13.2832 -6.26677e-07 10.4988C-6.26677e-07 7.71433 1.10612 5.04392 3.07502 3.07502C5.04392 1.10612 7.71433 0 10.4988 0ZM10.4988 17.9979C11.982 17.9979 13.4318 17.5581 14.6651 16.7341C15.8983 15.9101 16.8595 14.7389 17.4271 13.3686C17.9947 11.9983 18.1432 10.4905 17.8538 9.03577C17.5645 7.58108 16.8502 6.24486 15.8015 5.19609C14.7527 4.14732 13.4165 3.4331 11.9618 3.14374C10.5071 2.85439 8.99927 3.0029 7.62898 3.57049C6.2587 4.13808 5.08749 5.09926 4.26348 6.33248C3.43946 7.56571 2.99965 9.01559 2.99965 10.4988C3.00198 12.4869 3.79282 14.393 5.19867 15.7989C6.60452 17.2047 8.5106 17.9956 10.4988 17.9979Z"
          fill="var(--grey)"
        />
      </svg>
    </div>
  );
}
