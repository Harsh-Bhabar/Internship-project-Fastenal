import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toggleToastNotification } from "../../services/ToggleToast";
import Logo from "../Logo/Logo";

import styles from "./theFooter.module.css";

export default function TheFooter() {
  const [newsletterEmailId, setNewsletterEmailId] = useState("");
  const location = useLocation();
  const [userName, setUserName] = useState("");

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
    if (localStorage.getItem("userName"))
      setUserName(localStorage.getItem("userName"));
  }, []);

  return (
    <footer className={styles.theFooter}>
      <div className={styles.footerSection}>
        <div className={styles.contactDetails}>
          <div className={styles.logo}>
            <Logo lightTheme={true} />
          </div>
          <div className={styles.contact}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0H4C1.8 0 0 1.8 0 4V14C0 16.2 1.8 18 4 18H20C22.2 18 24 16.2 24 14V4C24 1.8 22.2 0 20 0ZM21.6 5.8L13.7 11.1C13.2 11.4 12.6 11.6 12 11.6C11.4 11.6 10.8 11.4 10.3 11.1L2.4 5.8C2 5.5 1.9 4.9 2.2 4.4C2.5 4 3.1 3.9 3.6 4.2L11.5 9.5C11.8 9.7 12.3 9.7 12.6 9.5L20.5 4.2C21 3.9 21.6 4 21.9 4.5C22.1 4.9 22 5.5 21.6 5.8Z"
                fill="white"
              />
            </svg>
            <p className={styles.link}>
              <a> company@abcd.com </a>
            </p>
          </div>
          <div className={styles.contact}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0C4.02984 0 0 4.02963 0 8.99952C0 12.6279 1.26422 13.6413 8.07656 23.5159C8.52333 24.1614 9.47859 24.1614 9.92531 23.5159C16.7344 13.6399 18 12.6274 18 8.99952C18 4.02963 13.9688 0 9 0ZM9 12.7071C6.93141 12.7071 5.25 11.0253 5.25 8.95733C5.25 6.88932 6.93281 5.20753 9 5.20753C11.0672 5.20753 12.75 6.88932 12.75 8.95733C12.75 11.0253 11.0672 12.7071 9 12.7071Z"
                fill="white"
              />
            </svg>

            <p className={styles.link}>Company Address, New City, New State</p>
          </div>
          <div className={styles.contact}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0868 14.5114C18.2574 13.6591 15.8998 12.0625 14.3545 12.0625C13.9966 12.0625 13.6841 12.142 13.4285 12.3068C12.6729 12.7898 12.0707 13.1648 11.781 13.1648C11.6219 13.1648 11.4515 13.0227 11.0765 12.6989L11.014 12.642C9.97441 11.7386 9.75285 11.5057 9.34949 11.0852L9.24723 10.9773C9.17338 10.9034 9.11089 10.8352 9.0484 10.7727C8.69617 10.4091 8.44052 10.1477 7.53723 9.125L7.49746 9.07955C7.0657 8.59091 6.78165 8.27273 6.76461 8.03977C6.74756 7.8125 6.9464 7.44318 7.45202 6.75568C8.06557 5.92614 8.0883 4.90341 7.52587 3.71591C7.07706 2.77841 6.34421 1.88068 5.69656 1.09091L5.63975 1.02273C5.08301 0.340909 4.43537 0 3.71387 0C2.91284 0 2.24816 0.431818 1.89593 0.659091C1.86752 0.676136 1.83912 0.698864 1.81071 0.715909C1.02104 1.21591 0.447256 1.90341 0.231376 2.60227C-0.0924454 3.65341 -0.308326 5.01705 1.24261 7.85227C2.58334 10.3068 3.79909 11.9545 5.73065 13.9375C7.54859 15.8011 8.35531 16.4034 10.1619 17.7102C12.173 19.1648 14.1045 20 15.4566 20C16.7122 20 17.7007 20 19.1096 18.3011C20.5866 16.517 19.9731 15.4261 19.0868 14.5114Z"
                fill="white"
              />
            </svg>

            <p className={styles.link}>+0987654321</p>
          </div>
        </div>
        <div className={styles.siteMap}>
          <h3 className={styles.sectionHeading}>Sitemap</h3>
          <Link to="/">
            <p className={styles.link}>Home</p>
          </Link>
          <Link to="/shop">
            <p className={styles.link}>Shop</p>
          </Link>
          <Link to={`/wishlist/${userName}`}>
            <p className={styles.link}>Wishlist</p>
          </Link>
          <Link to={`/cart/${userName}`}>
            <p className={styles.link}>Cart</p>
          </Link>
          <Link to={`/profile/${userName}`}>
            <p className={styles.link}>Profile</p>
          </Link>
          <Link to="/login">
            <p className={styles.link}>Login</p>
          </Link>
          <Link to="/register">
            <p className={styles.link}>Register</p>
          </Link>
        </div>
        <div className={styles.socialsSection}>
          {location.pathname != "/" && (
            <>
              <h3 className={styles.sectionHeading}>Newsletter</h3>
              <div className={styles.newsletter}>
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
            </>
          )}
          <h3 className={styles.sectionHeading}>Social Links</h3>
          <div className={styles.contactBtns}>
            <a target="_blank">
              <div className={styles.contactBtn}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.37 4.37012C7.68762 4.37012 5.46507 6.46335 5.46507 9.0707C5.46507 11.6781 7.6493 13.7713 10.37 13.7713C13.0907 13.7713 15.275 11.6413 15.275 9.0707C15.275 6.50007 13.0524 4.37012 10.37 4.37012ZM10.37 12.082C8.64562 12.082 7.22778 10.7233 7.22778 9.0707C7.22778 7.41815 8.64562 6.05939 10.37 6.05939C12.0944 6.05939 13.5123 7.41815 13.5123 9.0707C13.5123 10.7233 12.0944 12.082 10.37 12.082Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M15.4666 5.3249C16.0803 5.3249 16.5779 4.84809 16.5779 4.25992C16.5779 3.67175 16.0803 3.19495 15.4666 3.19495C14.8528 3.19495 14.3553 3.67175 14.3553 4.25992C14.3553 4.84809 14.8528 5.3249 15.4666 5.3249Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M18.3406 1.50566C17.3443 0.514126 15.9264 0 14.317 0H6.42306C3.08923 0 0.866669 2.12995 0.866669 5.32488V12.8532C0.866669 14.4323 1.40315 15.791 2.47611 16.7826C3.51075 17.7374 4.89027 18.2148 6.46138 18.2148H14.2787C15.9264 18.2148 17.3059 17.7006 18.3023 16.7826C19.3369 15.8277 19.8734 14.469 19.8734 12.8899V5.32488C19.8734 3.7825 19.3369 2.46046 18.3406 1.50566ZM18.1873 12.8899C18.1873 14.0283 17.7658 14.9464 17.076 15.5707C16.3863 16.195 15.4283 16.5255 14.2787 16.5255H6.46138C5.31179 16.5255 4.35379 16.195 3.66403 15.5707C2.97427 14.9097 2.62939 13.9916 2.62939 12.8532V5.32488C2.62939 4.22318 2.97427 3.3051 3.66403 2.64408C4.31547 2.01978 5.31179 1.68927 6.46138 1.68927H14.3553C15.5049 1.68927 16.4629 2.01978 17.1527 2.6808C17.8041 3.34182 18.1873 4.2599 18.1873 5.32488V12.8899Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </a>
            <a target="_blank">
              <div className={styles.contactBtn}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 9 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.71105 5.24257H5.74438V3.56219C5.74438 2.93112 6.22867 2.78399 6.56977 2.78399C6.91009 2.78399 8.66332 2.78399 8.66332 2.78399V0.00971895L5.78008 0C2.5794 0 1.85102 2.06914 1.85102 3.39328V5.24257H0V8.1013H1.85102C1.85102 11.7701 1.85102 16.1905 1.85102 16.1905H5.74438C5.74438 16.1905 5.74438 11.7265 5.74438 8.1013H8.37151L8.71105 5.24257Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </a>
            <a target="_blank">
              <div className={styles.contactBtn}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.387595 5.07954H3.56996V16.0546H0.387595V5.07954ZM1.97878 3.54956C1.39398 3.54956 0.917989 3.37956 0.550793 3.03956C0.183598 2.69957 0 2.27797 0 1.77478C0 1.27158 0.183598 0.84999 0.550793 0.509994C0.917989 0.169998 1.39398 0 1.97878 0C2.56357 0 3.03956 0.163198 3.40676 0.489595C3.77395 0.815991 3.95755 1.22399 3.95755 1.71358C3.95755 2.24397 3.77395 2.68597 3.40676 3.03956C3.03956 3.37956 2.56357 3.54956 1.97878 3.54956Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M13.1942 4.91634C14.5542 4.91634 15.649 5.32434 16.4785 6.14033C17.3217 6.95632 17.7433 8.1667 17.7433 9.77148V16.0546H14.561V10.2611C14.561 9.39069 14.3706 8.7447 13.9898 8.3231C13.609 7.88791 13.0582 7.67031 12.3374 7.67031C11.535 7.67031 10.8958 7.9219 10.4198 8.4251C9.94382 8.91469 9.70582 9.64909 9.70582 10.6283V16.0546H6.52346V5.07954H9.56302V6.36472C9.98462 5.90233 10.5082 5.54873 11.1338 5.30394C11.7594 5.04554 12.4462 4.91634 13.1942 4.91634Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </a>
            <a target="_blank">
              <div className={styles.contactBtn}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.40527 3.20702L2.33065 2.90856C2.24708 2.57429 2.20483 2.23104 2.20483 1.88649C2.20483 1.43355 2.27785 0.983569 2.42108 0.553872L2.56172 0.131956C2.58601 0.059079 2.66478 0.0196929 2.73766 0.0439854L3.20702 0.200439C3.73992 0.333665 4.25665 0.524813 4.74796 0.770469L4.81053 0.801755L6.01316 1.40307C6.80971 1.13756 7.64385 1.00219 8.48348 1.00219H8.61887C9.54697 1.00219 10.479 1.10377 11.385 1.3051C11.6702 1.36848 11.9685 1.33175 12.2298 1.2011L13.0285 0.801755C13.4264 0.536479 13.867 0.341588 14.331 0.225599L14.4316 0.200439L15.1074 0.0314955C15.1785 0.0137233 15.2512 0.0536793 15.2744 0.123195L15.418 0.553872C15.5612 0.983569 15.6342 1.43355 15.6342 1.88649C15.6342 2.23104 15.592 2.57429 15.5084 2.90856L15.4338 3.20702L16.0158 4.37099C16.2937 4.92688 16.4711 5.52757 16.5397 6.14528C16.6038 6.72138 16.5723 7.3041 16.4465 7.86994L16.2355 8.81931L16.0867 9.21622C15.7912 10.0041 15.2765 10.6911 14.6033 11.196C14.2241 11.4804 13.8014 11.7019 13.3517 11.8518L12.2268 12.2268L11.2246 12.4272L11.2739 12.5011C11.5072 12.8512 11.6929 13.2307 11.8259 13.6298C11.9586 14.0281 12.0263 14.4452 12.0263 14.865V17.6386V17.9824C12.0263 18.02 12.0351 18.057 12.0519 18.0905C12.1322 18.2513 12.0153 18.4404 11.8356 18.4404H6.026C5.82359 18.4404 5.73481 18.185 5.89358 18.0594V15.6542L5.49293 15.7209C5.04069 15.7963 4.57955 15.8017 4.12567 15.7368L3.85115 15.6976C3.55728 15.6556 3.2721 15.5665 3.00658 15.4338C2.74107 15.301 2.49869 15.1263 2.28878 14.9164L2.20217 14.8298C1.94029 14.5679 1.74298 14.2487 1.62586 13.8973C1.48044 13.4611 1.21203 13.0761 0.852939 12.7889L0.452091 12.4682C0.418044 12.4409 0.381215 12.4174 0.342217 12.3979L0.226489 12.34C0.0876817 12.2706 0 12.1287 0 11.9735C0 11.8854 0.0564249 11.8071 0.140078 11.7792L0.279763 11.7326C0.48565 11.664 0.710368 11.68 0.90448 11.777L1.40307 12.0263L1.48467 12.0807C1.82688 12.3089 2.11415 12.6101 2.32575 12.9628C2.51063 13.2709 2.75354 13.5403 3.04101 13.7559L3.40746 14.0307L3.63099 14.1052C3.88121 14.1886 4.14324 14.2312 4.407 14.2312C4.54216 14.2312 4.6771 14.22 4.81042 14.1978L5.81273 14.0307C5.94502 13.5016 6.18175 13.0042 6.50902 12.5678L6.61448 12.4272L5.61229 12.2268L4.51371 11.8972C3.91645 11.718 3.36331 11.4158 2.88987 11.01C2.43774 10.6225 2.06764 10.1484 1.80133 9.61581L1.70672 9.42661C1.50505 9.02326 1.35361 8.59671 1.25578 8.15649L1.17239 7.78124C1.0597 7.27413 1.03147 6.7519 1.08884 6.23559C1.16382 5.56074 1.38347 4.91001 1.73281 4.32778L2.40527 3.20702Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyrightSection}>
        <p>© 2023 Copyright Company. All Rights Reserved. </p>
      </div>
    </footer>
  );
}
