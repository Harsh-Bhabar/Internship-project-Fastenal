import Aos from "aos";
import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TheFooter from "../../components/TheFooter/TheFooter";
import WatchCard from "../../components/WatchCard/WatchCard";

import "aos/dist/aos.css";

import styles from "./homePage.module.css";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import { toggleToastNotification } from "../../services/ToggleToast";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import RetailersSection from "../../components/RetailersSection/RetailersSection";
import InternalServerIllustrationSmall from "../../components/InternalServerIllustrationSmall/InternalServerIllustrationSmall";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [newsletterEmailId, setNewsletterEmailId] = useState("");
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPopularModels = async () => {
    setLoading(true);
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/brand/casio`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    setProducts(response.data.content);
  };

  const handleSubmitEmailId = async () => {
    if (newsletterEmailId.length === 0) {
      toggleToastNotification("Email cannot be empty!");
      return;
    }

    const newsletterBaseUrl = process.env.REACT_APP_NEWSLETTER_BACKEND_BASE_URL;
    const response = await axios
      .post(`${newsletterBaseUrl}`, { emailId: newsletterEmailId })
      .catch((error) => console.error(error));
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Subscribed to newsletter successfully!");
      setNewsletterEmailId("");
    } else {
      toggleToastNotification("Unable to subscribe! Try again!");
    }
  };

  useEffect(() => {
    Aos.init();
    getPopularModels();
  }, []);

  return (
    <>
      {/* <LoadingScreen /> */}
      <TheNavbar />
      <section className={styles.heroSection}>
        <HomeSlider />
      </section>
      <section className={styles.shopSection} data-aos="zoom-in-up">
        <h1 className={styles.mainHeading}>CHOOSE YOUR STYLE</h1>
        <p className={styles.description}>
          We are a favoured destination for any watch enthusiast because we are
          home to over 40 top national and international brands. Under one roof,
          we provide the newest stylish items from prestigious lifestyle
          companies. We want to offer a fantastic shopping environment, ongoing
          connection, and service for you where you can purchase your preferred
          brands at the most competitive prices. By promoting branded lifestyle
          products in a first-rate setting, we want to set the bar for luxury
          retailing.
        </p>
        <Link className={styles.mensWatch} to="/shop">
          <button className={styles.shopBtn} type="button">
            Shop Now
          </button>
        </Link>
      </section>
      <section className={styles.browseSection}>
        <Link className={styles.mensWatch} to="/shop">
          <img src="images/mensWatch.png" alt="" data-aos="zoom-in" />
        </Link>
        <Link className={styles.womensWatch} to="/shop">
          <img src="images/womensWatch.png" alt="" data-aos="zoom-in" />
        </Link>
        <Link className={styles.howToSelect} to="/shop">
          <img src="images/howToSelect.png" alt="" data-aos="zoom-in" />
        </Link>
        <Link className={styles.shopAll} to="/shop">
          <img src="images/shopAll.png" alt="" data-aos="zoom-in" />
        </Link>
      </section>
      <div className={styles.features}>
        <div className={styles.feature} data-aos="zoom-in">
          30 DAY PRICE MATCH GUARANTEE
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.218 2.822L14 0L26.782 2.822C27.1274 2.89829 27.4364 3.08931 27.6578 3.36353C27.8792 3.63776 27.9999 3.9788 28 4.33036V19.7648C27.9999 21.2913 27.6205 22.7942 26.8954 24.14C26.1703 25.4859 25.122 26.633 23.8436 27.4797L14 34L4.15644 27.4797C2.8782 26.6332 1.83005 25.4862 1.10499 24.1407C0.379922 22.7952 0.000367665 21.2926 0 19.7664V4.33036C6.07254e-05 3.9788 0.12077 3.63776 0.342206 3.36353C0.563642 3.08931 0.872569 2.89829 1.218 2.822ZM3.11111 5.56982V19.7648C3.11113 20.7824 3.364 21.7843 3.8473 22.6815C4.33059 23.5788 5.02935 24.3436 5.88156 24.9081L14 30.2863L22.1184 24.9081C22.9704 24.3437 23.6691 23.5791 24.1523 22.6822C24.6356 21.7853 24.8886 20.7837 24.8889 19.7664V5.56982L14 3.16818L3.11111 5.56982Z"
              fill="#6D6D6D"
            />
          </svg>
        </div>
        <div className={styles.feature} data-aos="zoom-in">
          FREE SHIPPING
          <svg
            width="22"
            height="22"
            viewBox="0 0 35 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.1654 24.5802C34.0957 24.342 33.9346 24.141 33.7173 24.0211C33.4999 23.9012 33.244 23.8721 33.0054 23.9402L30.6454 24.6102L27.6454 14.1002L27.8554 14.0402C28.0897 13.9672 28.289 13.8106 28.4154 13.6002C28.4748 13.493 28.5125 13.3751 28.5263 13.2532C28.54 13.1314 28.5295 13.008 28.4954 12.8902L25.0954 0.730215C25.0684 0.602587 25.0147 0.482139 24.9377 0.376862C24.8607 0.271585 24.7622 0.183885 24.6487 0.11958C24.5352 0.0552746 24.4094 0.0158342 24.2795 0.00387522C24.1496 -0.00808377 24.0187 0.00771198 23.8954 0.0502145L11.1954 3.68021C11.0768 3.71434 10.9663 3.7717 10.8701 3.84896C10.774 3.92621 10.6942 4.02182 10.6354 4.13021C10.5188 4.34767 10.4867 4.60055 10.5454 4.84021L13.7354 16.0502L13.5254 16.1102C13.2857 16.1835 13.0822 16.3441 12.9554 16.5602C12.8959 16.6674 12.8582 16.7854 12.8444 16.9072C12.8307 17.0291 12.8412 17.1524 12.8754 17.2702L16.1454 28.6802L14.7254 29.0802C14.6753 29.088 14.6242 29.0784 14.5805 29.0529C14.5367 29.0274 14.5031 28.9876 14.4854 28.9402L6.59535 1.13021C6.53419 0.908448 6.39301 0.717219 6.19908 0.593475C6.00515 0.46973 5.77224 0.422252 5.54535 0.460215L0.785353 1.22021C0.545361 1.27296 0.333189 1.41222 0.189323 1.61142C0.0454566 1.81061 -0.0200321 2.05581 0.00535289 2.30021C0.0515189 2.54365 0.191932 2.75901 0.396053 2.89946C0.600175 3.03991 0.851495 3.09409 1.09535 3.05021L5.09535 2.42021L12.5254 28.6402C11.9028 28.4753 11.2479 28.4753 10.6254 28.6402C9.90929 28.8405 9.26894 29.2492 8.78567 29.8142C8.30239 30.3793 7.99801 31.0753 7.91119 31.8137C7.82438 32.5522 7.95905 33.2998 8.2981 33.9615C8.63715 34.6233 9.16527 35.1693 9.81535 35.5302C10.3736 35.8457 11.0041 36.011 11.6454 36.0102C11.9832 36.0053 12.3191 35.9583 12.6454 35.8702C13.6019 35.5957 14.4106 34.9531 14.8942 34.0834C15.3778 33.2136 15.4969 32.1876 15.2254 31.2302C15.1907 31.117 15.1473 31.0066 15.0954 30.9002H15.2754L17.5954 30.2402L30.2954 26.6402L33.5554 25.7202C33.7836 25.6443 33.974 25.4838 34.0875 25.2717C34.2009 25.0597 34.2288 24.8122 34.1654 24.5802ZM12.0954 34.1102C11.6146 34.2402 11.1022 34.1792 10.6654 33.9402C10.3421 33.755 10.0808 33.4784 9.91421 33.1452C9.74766 32.8119 9.68331 32.4369 9.72926 32.0672C9.77521 31.6974 9.92939 31.3496 10.1725 31.0672C10.4155 30.7849 10.7366 30.5806 11.0954 30.4802C11.2611 30.4324 11.4329 30.4089 11.6054 30.4102C12.0561 30.4181 12.4893 30.5869 12.8265 30.8861C13.1638 31.1853 13.383 31.5952 13.4446 32.0419C13.5061 32.4885 13.406 32.9424 13.1622 33.3217C12.9185 33.701 12.5472 33.9807 12.1154 34.1102H12.0954ZM23.5154 2.11021L26.4454 12.4702L15.5454 15.5502L12.6054 5.23021L23.5154 2.11021ZM17.9454 28.2102L14.9454 17.7002L25.8454 14.6102L28.8454 25.1202L21.4754 27.2102L17.9454 28.2102Z"
              fill="#6D6D6D"
            />
          </svg>
        </div>
        <div className={styles.feature} data-aos="zoom-in">
          AUTHORISED RETAILER
          <svg
            width="22"
            height="22"
            viewBox="0 0 34 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.618 4L19.618 0H14.382L12.382 4H9V6H0V48H34V6H25V4H21.618ZM13.618 6L15.618 2H18.382L20.382 6H23V10V12H11V10V6H13.618ZM25 14V12H28V42H6V12H9V14H25ZM32 8V46H2V8H9V10H4V44H30V10H25V8H32Z"
              fill="#6D6D6D"
            />
            <path d="M18 5H16V7H18V5Z" fill="#6D6D6D" />
            <path
              d="M25.707 21.707L24.293 20.293L14 30.586L10.707 27.293L9.29297 28.707L14 33.414L25.707 21.707Z"
              fill="#6D6D6D"
            />
          </svg>
        </div>
      </div>
      <RetailersSection />
      <section className={styles.popularSection}>
        <div className={styles.popularHeader}>
          <h1 className={styles.mainHeading}>POPULAR MODELS</h1>
          <Link to="/shop">
            <button className={styles.shopAllBtn} type="button">
              Shop All
            </button>
          </Link>
        </div>
        {loading && <Loader />}
        {products?.map((product) => {
          return <WatchCard key={product.id} product={product} />;
        })}
        {showInternalError && <InternalServerIllustrationSmall />}
      </section>
      <section className={styles.newsletterSection}>
        <h1 className={styles.mainHeading} data-aos="zoom-in-up">
          JOIN OUR NEWSLETTER
        </h1>
        <p className={styles.description} data-aos="zoom-in-up">
          Subscribe to our newsletter to stay updated about new launches and
          exclusive deals.
        </p>
        <div className={styles.newsletter} data-aos="zoom-in-up">
          <input
            className={styles.newsletterInput}
            type="text"
            placeholder="abcd@email.com"
            value={newsletterEmailId}
            onChange={(e) => setNewsletterEmailId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmitEmailId();
            }}
          />
          <button
            className={styles.subscribeBtn}
            type="button"
            onClick={handleSubmitEmailId}
          >
            Subscribe
          </button>
        </div>
        <img src="images/newsletterBg.png" alt="Newsletter" />
      </section>

      <TheFooter />
    </>
  );
}
