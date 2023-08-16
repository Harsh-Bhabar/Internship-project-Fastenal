import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./homeSlider.module.css";

const imageUrls = [
  "images/heroSectionImg5.png",
  "images/heroSectionImg6.png",
  "images/heroSectionImg3.png",
  "images/heroSectionImg2.png",
  "images/heroSectionImg1.png",
  "images/heroSectionImg4.png",
];
const delay = 2500;

export default function HomeSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      <Link to="/shop">
        <div className={styles.slideshow}>
          <div
            className={styles.slideshowSlider}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {imageUrls.map((url) => (
              <img className={styles.slide} key={url} src={url} />
            ))}
          </div>
        </div>
      </Link>
      <div className={styles.indicators}>
        {imageUrls.map((url, curIdx) => (
          <div
            key={url}
            className={styles.indicator}
            onClick={() => {
              setIndex(curIdx);
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
