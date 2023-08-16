import React from "react";

import styles from "./retailersSection.module.css";

const brandLogoUrls = [
  "https://www.titan.co.in/wps/wcm/connect/titanrt/c4f78f12-1b98-4890-8f3e-b6b516137777/TITAN+Logo+new+%282%29.svg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80OGR2D068O7K5LN3O26-c4f78f12-1b98-4890-8f3e-b6b516137777-o4kck3a",
  "data:image/webp;base64,UklGRsgCAABXRUJQVlA4TLwCAAAvx8AIEIcgEEgy2d9ziBkZEIFACje4RA2O4QYIsq1GlchgzIAm+9/uf6DdZgEQ0f8J4P/YSJkYFnvzYGj0PDtM9Cb/bSNlZPGgp82x0fqPrMkL1ld8QX5hLHi84n/LGmsLz/DgXGLayUAeH/nC9Vt2IWddmkKlnVxCf9SE8bE0kZ+qa2G2rSxxhidTuD5mRfCkaAvPQGb8cCJ+2P5Hkrw88CV/zYZwBSEv0ehFRvb+X2TF/eBS5Pd6fjk9CTfyjsIUGu3FFZ5VaSnLe9X+aRL8AGPhyzbTNUPVNfVz5sKMZHYuPONuWONREaaGv2eMnM3SFA7azVJXxbm09wbCRF7DtXCn3QTdVNwq34Adgo+Fr7CdrPMi5KW3DVgTxJloOye60SUMdKGyA7senLYfRxl5AnHhA9XXen4zvRanatCGGBmjDiq6iQG/9i6/ZkVzhx3dgKkgDz8TnTTA3IN1RaIdLdjJblTJrCwcqAIPe6jSjDvKqJI5usmMUSc7UN5CWkre0YGMLCI/KC6cyRI6dxBujdcNOUpm1hFTRxeZGWpvVfvPY+nzfgYyM8vI00Tl5wa8gbLwjSxs5wLXj93IHM7ww2B+L000ogEf21mQQUFio98KPHzuWnAGOpGfm4mogjB1ERSUv9YWPsiM0Ux7yagA6yommNH5sWPhQWYWJ/ArbMVRRlFVkKH+rTCRhR87kbetdBSQseImcQL+Fi98EGbkx04YTBKLokoM/FO+8DAxTmRxIxOwZLcUpYbih9LCM0h2Ir/2ERZsiip0kk+U33m96sItHKRl5HUbGVVFFLIio/qdsfAwdZzI8y5OlBXWwU3KiPpnysIz6OwUZtiEo6jJ4NQY4q+kKRz0lJGPTTAy9e3uM6gY+FeuhYc9jhP5+aQx/IPEsDxp/Gu6w90rqZ1heOB/WxQHi+GZFRYB",
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Patek_Philippe_SA_logo.svg/225px-Patek_Philippe_SA_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Casio_logo.svg/220px-Casio_logo.svg.png",
  "https://www.fossil.com/on/demandware.static/Sites-fossil-in-Site/-/default/dw4a885643/images/svg-icons/logo-xl.svg",
  "https://www.michaelkors.global/img/logo_mk.webp",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Daniel_Wellington_logo.svg/220px-Daniel_Wellington_logo.svg.png",
  "https://helix-watches.com/media/logo/stores/1/helix.png",
  "https://www.tissotwatches.com/static/version1677076051/frontend/Tissot/default/en_US/images/logo/tissot-black.svg",
  "https://in.benetton.com/on/demandware.static/Sites-UCB_in-Site/-/default/dwad86e74b/images/logos/benetton_logo_black.svg",
  "https://seeklogo.com/images/A/armani_exchange-logo-7034929045-seeklogo.com.png",
  "https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/gnb-desktop-120x32.png",
  "https://www.seikowatches.com/in-en/-/media/Images/GlobalEn/Seiko/Home/common/SeikoLogo/SeikoLogo-white.svg?mh=28&mw=88&hash=45A65EB01975F4A162CE4E4593949494",
];

export default function RetailersSection() {
  return (
    <div className={styles.retailerSection}>
      <h1 className={styles.heading}>Authorised Retailers</h1>
      <div className={styles.sliderContainer}>
        {brandLogoUrls.map((url) => (
          <div className={styles.slide} key={url}>
            <img src={url} alt="Brand" />
          </div>
        ))}
      </div>
    </div>
  );
}
