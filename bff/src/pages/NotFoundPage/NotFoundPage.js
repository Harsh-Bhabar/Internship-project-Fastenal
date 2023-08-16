import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TheFooter from "../../components/TheFooter/TheFooter";
import TheNavbar from "../../components/TheNavbar/TheNavbar";

import styles from "./notFoundPage.module.css";

const imageUrls = [
  "/images/notFoundImg1.png",
  "/images/notFoundImg2.png",
  "/images/notFoundImg3.png",
  "/images/notFoundImg4.png",
  "/images/notFoundImg5.png",
];

export default function NotFoundPage() {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const addSlideEffect = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    if (activeImgIdx === imageUrls.length - 1) setActiveImgIdx(0);
    else setActiveImgIdx(activeImgIdx + 1);
  };

  useEffect(() => {
    addSlideEffect();
  }, [activeImgIdx]);

  return (
    <>
      <TheNavbar />
      <div className={styles.notFoundPage}>
        <div className={styles.heading}>Page Not Found</div>
        <div className={styles.div404}>
          <span>4</span>
          <div className={styles.imgDiv}>
            {activeImgIdx === 0 && (
              <img className={styles.imgSlide} src={imageUrls[0]} alt="0" />
            )}
            {activeImgIdx === 1 && (
              <img className={styles.imgSlide} src={imageUrls[1]} alt="0" />
            )}
            {activeImgIdx === 2 && (
              <img className={styles.imgSlide} src={imageUrls[2]} alt="0" />
            )}
            {activeImgIdx === 3 && (
              <img className={styles.imgSlide} src={imageUrls[3]} alt="0" />
            )}
            {activeImgIdx === 4 && (
              <img className={styles.imgSlide} src={imageUrls[4]} alt="0" />
            )}
          </div>
          <span>4</span>
        </div>
        <h2 className={styles.subheading}>There’s NOTHING here...</h2>
        <p className={styles.description}>
          You can go to <Link to="/shop">Shop</Link>
          <br />
          or start from <Link to="/">Main Page.</Link>
        </p>
      </div>
      <TheFooter />
    </>
  );
}
