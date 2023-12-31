import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddProductForm from "../AddProductForm/AddProductForm";

import ProductsTable from "../ProductsTable/ProductsTable";
import SubscriptionsTable from "../SubscriptionsTable/SubscriptionsTable";
import UsersTable from "../UsersTable/UsersTable";

import styles from "./adminDashboard.module.css";

function getLinkForTab(location) {
  const pathname = location.split("/")[2];
  if (!pathname) return 0;
  else {
    switch (pathname) {
      case "all-products":
        return 1;
      case "add-product":
        return 2;
      case "all-users":
        return 3;
      case "all-subscriptions":
        return 4;

      default:
        return 0;
    }
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(getLinkForTab(location?.pathname));

  const handleTabChange = (newValue) => {
    navigate(
      `/admin-dashboard/${
        newValue === 1
          ? "all-products"
          : newValue === 2
          ? "add-product"
          : newValue === 3
          ? "all-users"
          : newValue === 4
          ? "all-subscriptions"
          : "all-products"
      }`
    );
  };

  useEffect(() => {
    setValue(getLinkForTab(location?.pathname));
  }, [location]);

  return (
    <>
      <div className={styles.sidebar}>
        <h1 className={styles.heading}>Admin Dashboard</h1>
        <ul>
          <li className={styles.tabSection}>
            <p className={styles.sectionHeading}>Products</p>
            <ul>
              <li>
                <div
                  className={`${styles.subTab} ${
                    value === 1 && styles.activeTab
                  }`}
                  onClick={() => handleTabChange(1)}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 30 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.5 23.9327V10.0671C28.4989 9.86683 28.4451 9.67038 28.3438 9.49755C28.2426 9.32473 28.0976 9.18165 27.9234 9.08274L15.5484 2.12181C15.3817 2.02554 15.1925 1.97485 15 1.97485C14.8075 1.97485 14.6183 2.02554 14.4516 2.12181L2.07656 9.08274C1.9024 9.18165 1.75739 9.32473 1.65617 9.49755C1.55494 9.67038 1.50108 9.86683 1.5 10.0671V23.9327C1.50108 24.133 1.55494 24.3295 1.65617 24.5023C1.75739 24.6751 1.9024 24.8182 2.07656 24.9171L14.4516 31.8781C14.6183 31.9743 14.8075 32.025 15 32.025C15.1925 32.025 15.3817 31.9743 15.5484 31.8781L27.9234 24.9171C28.0976 24.8182 28.2426 24.6751 28.3438 24.5023C28.4451 24.3295 28.4989 24.133 28.5 23.9327Z"
                      stroke={`${
                        value === 1 ? "var(--primary-color)" : "var(--black)"
                      }`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.8906 20.4453V13.1328L8.25 5.60938"
                      stroke={`${
                        value === 1 ? "var(--primary-color)" : "var(--black)"
                      }`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.3449 9.4906L15.1262 17L1.6543 9.4906"
                      stroke={`${
                        value === 1 ? "var(--primary-color)" : "var(--black)"
                      }`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.1266 17L15 32.0188"
                      stroke={`${
                        value === 1 ? "var(--primary-color)" : "var(--black)"
                      }`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  View All Products
                </div>
              </li>
              <li>
                <div
                  className={`${styles.subTab} ${
                    value === 2 && styles.activeTab
                  }`}
                  onClick={() => handleTabChange(2)}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.4613 15.4947L18.8502 14.0574C19.0673 13.8328 19.4449 13.99 19.4449 14.3134V20.8441C19.4449 22.0343 18.5117 23 17.3615 23H2.08338C0.93318 23 0 22.0343 0 20.8441V5.03388C0 3.84363 0.93318 2.87795 2.08338 2.87795H13.9543C14.2625 2.87795 14.4187 3.26422 14.2017 3.49329L12.8128 4.93058C12.7477 4.99795 12.6609 5.03388 12.5654 5.03388H2.08338V20.8441H17.3615V15.7462C17.3615 15.6519 17.3962 15.562 17.4613 15.4947ZM24.2583 6.43075L12.8605 18.2255L8.93682 18.6747C7.79965 18.8049 6.83174 17.8123 6.95762 16.6265L7.39165 12.5662L18.7895 0.77142C19.7834 -0.25714 21.3893 -0.25714 22.379 0.77142L24.254 2.71176C25.2479 3.74032 25.2479 5.40668 24.2583 6.43075ZM19.97 7.81863L17.4483 5.20905L9.38388 13.5588L9.06704 16.4918L11.9013 16.1639L19.97 7.81863ZM22.7826 4.23888L20.9076 2.29854C20.7296 2.11439 20.4388 2.11439 20.2652 2.29854L18.924 3.68642L21.4458 6.296L22.787 4.90812C22.9606 4.71947 22.9606 4.42303 22.7826 4.23888Z"
                      fill={`${
                        value === 2 ? "var(--primary-color)" : "var(--black)"
                      }`}
                    />
                  </svg>
                  Add Product
                </div>
              </li>
            </ul>
          </li>
          <li className={styles.tabSection}>
            <p className={styles.sectionHeading}>Users</p>

            <ul>
              <li>
                <div
                  className={`${styles.subTab} ${
                    value === 3 && styles.activeTab
                  }`}
                  onClick={() => handleTabChange(3)}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9024 14.7007C20.7984 14.5974 20.6751 14.5156 20.5395 14.46C20.4039 14.4044 20.2587 14.3761 20.1121 14.3766C19.9655 14.3771 19.8205 14.4065 19.6853 14.4631C19.5501 14.5196 19.4274 14.6023 19.3241 14.7063C19.2209 14.8102 19.1391 14.9336 19.0835 15.0692C19.0279 15.2048 18.9995 15.35 19 15.4965C19.0006 15.6431 19.0299 15.7881 19.0865 15.9233C19.1431 16.0585 19.2257 16.1813 19.3297 16.2845C20.2735 17.2183 21.0227 18.3301 21.5339 19.5554C22.0451 20.7807 22.3081 22.0953 22.3078 23.423C22.3078 24.7838 18.3928 26.7691 12.2693 26.7691C6.14584 26.7691 2.23084 24.7838 2.23084 23.423C2.22907 22.1041 2.48723 20.7977 2.99057 19.5786C3.49391 18.3595 4.23256 17.2515 5.1643 16.318C5.37205 16.109 5.48865 15.8263 5.48865 15.5316C5.48865 15.237 5.37205 14.9543 5.1643 14.7453C4.95532 14.5375 4.67263 14.4209 4.37796 14.4209C4.08329 14.4209 3.80059 14.5375 3.59161 14.7453C2.44846 15.8821 1.54235 17.2345 0.925828 18.7241C0.309307 20.2137 -0.00536179 21.8108 6.9118e-05 23.423C6.9118e-05 27.048 6.32431 28.9999 12.2693 28.9999C18.2143 28.9999 24.5385 27.048 24.5385 23.423C24.5428 21.8004 24.2235 20.1932 23.5991 18.6955C22.9747 17.1979 22.058 15.8398 20.9024 14.7007Z"
                      fill={`${
                        value === 3 ? "var(--primary-color)" : "var(--black)"
                      }`}
                    />
                    <path
                      d="M12.2696 15.6154C13.8138 15.6154 15.3234 15.1575 16.6073 14.2996C17.8913 13.4416 18.892 12.2222 19.483 10.7956C20.0739 9.36891 20.2286 7.79904 19.9273 6.2845C19.626 4.76995 18.8824 3.37875 17.7905 2.28683C16.6986 1.1949 15.3074 0.451288 13.7928 0.150026C12.2783 -0.151236 10.7084 0.00338294 9.28174 0.594329C7.85507 1.18528 6.63567 2.18601 5.77775 3.46998C4.91983 4.75395 4.46191 6.26348 4.46191 7.8077C4.46191 9.87843 5.28451 11.8644 6.74874 13.3286C8.21296 14.7928 10.1989 15.6154 12.2696 15.6154ZM12.2696 2.23077C13.3726 2.23077 14.4509 2.55786 15.368 3.17066C16.2851 3.78346 16.9999 4.65445 17.422 5.6735C17.8441 6.69255 17.9546 7.81389 17.7394 8.89571C17.5242 9.97752 16.993 10.9712 16.2131 11.7512C15.4331 12.5311 14.4394 13.0623 13.3576 13.2775C12.2758 13.4927 11.1545 13.3822 10.1354 12.9601C9.11636 12.538 8.24537 11.8232 7.63257 10.9061C7.01977 9.98896 6.69269 8.91071 6.69269 7.8077C6.69269 6.32861 7.28025 4.9101 8.32613 3.86422C9.37201 2.81834 10.7905 2.23077 12.2696 2.23077Z"
                      fill={`${
                        value === 3 ? "var(--primary-color)" : "var(--black)"
                      }`}
                    />
                  </svg>
                  View All Users
                </div>
              </li>
            </ul>
          </li>
          <li className={styles.tabSection}>
            <p className={styles.sectionHeading}>Newsletter</p>

            <ul>
              <li>
                <div
                  className={`${styles.subTab} ${
                    value === 4 && styles.activeTab
                  }`}
                  onClick={() => handleTabChange(4)}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.2917 24.1716C24.2917 24.0637 24.2917 23.9558 24.2917 23.8546C24.2917 23.5645 24.2917 23.2677 24.2917 22.9776C24.2917 22.5391 24.2917 22.1006 24.2917 21.6621C24.2917 21.1224 24.2917 20.5759 24.2917 20.0362C24.2917 19.4291 24.2917 18.8219 24.2917 18.2148C24.2917 17.5806 24.2917 16.9532 24.2917 16.3191C24.2917 15.7052 24.2917 15.0913 24.2917 14.4774C24.2917 13.9174 24.2917 13.3642 24.2917 12.8043C24.2917 12.3456 24.2917 11.8801 24.2917 11.4213C24.2917 11.0975 24.2917 10.7737 24.2917 10.4499C24.2917 10.2205 24.3322 9.9574 24.258 9.73477C24.2377 9.6943 24.2175 9.65382 24.1905 9.62009C24.1635 9.57961 24.1365 9.54588 24.1028 9.51215L20.7297 6.71247V4.6144C20.7702 3.16397 19.6233 1.9564 18.1729 1.91592H14.9482L12.8232 0.14167C12.6005 -0.0472234 12.27 -0.0472234 12.0474 0.14167L9.79412 1.91592H6.15791C4.70748 1.96315 3.56737 3.16397 3.60785 4.6144V6.84065C3.17609 7.18471 2.75108 7.52202 2.31932 7.86607C1.98201 8.13592 1.6447 8.39902 1.31414 8.66887C1.0308 8.8915 0.733966 9.09388 0.450625 9.31651C-0.156533 9.79549 0.0256145 10.3757 0.0256145 10.9693C0.0256145 11.5562 0.0256145 12.1432 0.0256145 12.7301C0.0323607 14.3357 0.0188683 15.9413 0.0256145 17.5469C0.0323607 19.0783 0.0188683 20.6097 0.0256145 22.1478C0.0256145 22.8292 0.0458531 23.5105 0.0525993 24.1851C0.0525993 24.2189 0.0525993 24.2391 0.0525993 24.2661C0.0593455 24.3201 0.0660916 24.374 0.0863302 24.4213C0.0863302 24.4415 0.0863302 24.4617 0.0863302 24.482C0.147046 24.6236 0.248239 24.7383 0.383163 24.8125C0.470864 24.853 0.565311 24.88 0.659758 24.88H0.740712H23.6576C23.9342 24.8665 24.177 24.6844 24.2647 24.4213C24.2647 24.3471 24.2917 24.1784 24.2917 24.1716ZM20.4666 13.3777L23.0032 11.3539V22.8831L15.724 17.1758L20.4666 13.3777ZM20.723 11.4888V8.40577L22.6052 9.97089L20.723 11.4888ZM12.4116 1.52464L12.8839 1.91592H11.9192L12.4116 1.52464ZM6.15791 3.26516H18.1729C18.8947 3.2854 19.4682 3.88581 19.4479 4.60766V4.6144V7.05653V12.5277L14.6514 16.3393L12.8232 14.9024C12.243 14.4301 11.4132 14.4301 10.833 14.9024L9.22069 16.2516L4.88288 12.6289V4.6144C4.88288 3.89931 5.44282 3.30564 6.15791 3.26516ZM1.28715 11.3606L8.20876 17.1354L1.35462 22.8494L1.28715 11.3606ZM3.60785 11.5765L1.7459 10.0249L3.60785 8.54069V11.5765ZM2.54869 23.5443L9.63221 17.6548L11.6561 15.9885C11.7842 15.8873 11.9731 15.8873 12.1013 15.9885L14.3006 17.7155L21.7619 23.524L2.54869 23.5443Z"
                      fill={`${
                        value === 4 ? "var(--primary-color)" : "var(--black)"
                      }`}
                    />
                    <path
                      d="M7.70978 7.99426H12.1488C12.5198 7.99426 12.8234 7.69068 12.8234 7.31964C12.8234 6.9486 12.5198 6.64502 12.1488 6.64502H7.70978C7.33874 6.64502 7.03516 6.9486 7.03516 7.31964C7.03516 7.69068 7.33874 7.99426 7.70978 7.99426Z"
                      fill={`${
                        value === 4 ? "var(--primary-color)" : "var(--black)"
                      }`}
                    />
                    <path
                      d="M7.70978 11.6102H17.2084C17.5795 11.6102 17.8831 11.3066 17.8831 10.9356C17.8831 10.5646 17.5795 10.261 17.2084 10.261H7.70978C7.33874 10.261 7.03516 10.5646 7.03516 10.9356C7.03516 11.3066 7.33874 11.6102 7.70978 11.6102Z"
                      fill={`${
                        value === 4 ? "var(--primary-color)" : "var(--black)"
                      }`}
                    />
                  </svg>
                  View All Subscriptions
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={styles.dashboardContent}>
        {value === 1 && (
          <>
            <h1 className={styles.tabHeading}>Products</h1>
            <ProductsTable />
          </>
        )}
        {value === 2 && (
          <>
            <h1 className={styles.tabHeading}>Add Product</h1>
            <AddProductForm />
          </>
        )}
        {value === 3 && (
          <>
            <h1 className={styles.tabHeading}>Users</h1>
            <UsersTable />
          </>
        )}
        {value === 4 && (
          <>
            <h1 className={styles.tabHeading}>All Subscriptions</h1>
            <SubscriptionsTable />
          </>
        )}
      </div>
    </>
  );
}
