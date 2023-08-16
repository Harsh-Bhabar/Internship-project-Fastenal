<h2 style="display: flex; align-items: center; line-height: 0">
    <img src="./public/favicon.ico" alt="WATCH WORLD" style="width: 80px; height 80px; margin-right: 1rem" />
    <br />
    WATCH WORLD
</h2>

Watch World is a full-stack e-commerce application for buying watches. The app uses `ReactJS` for front-end.<br />

### Backend microservices:

* User Microservice: [https://bitbucket.org/ecom-training/user-microservice]
* Product Microservice: [https://bitbucket.org/ecom-training/product-microservice]
* Cart-Order-Wishlist Microservice: [https://bitbucket.org/ecom-training/cart-orders-wishlist-microservice]

# Table of contents

* [Installation and Setup](#markdown-header-installation-and-setup)
* [Deployment](#markdown-header-deployment)

## Installation and Setup

* Fork the repository
* Clone and create your branch
* Create a `.env.local` file in the root directory of the project with following values.
    ```dosini
    REACT_APP_PRODUCTS_BACKEND_BASE_URL=<URL_HERE>
    REACT_APP_USER_BACKEND_BASE_URL=<URL_HERE>
    REACT_APP_CART_BACKEND_BASE_URL=<URL_HERE>
    REACT_APP_ORDERS_BACKEND_BASE_URL=<URL_HERE>
    REACT_APP_WISHLIST_BACKEND_BASE_URL=<URL_HERE>
    REACT_APP_NEWSLETTER_BACKEND_BASE_URL=<URL_HERE>
    ```
* Open the project and run following commands for setup

    ```bash
    # install dependencies
    $ npm install

    # serve with hot reload at http://localhost:3000
    $ npm start
    ```

## Deployment
Run build command with publish directory as `build`.

```bash
# build command
npm run build
```

Your front-end application is good to go! Proceed to backend setup.

Refer [React.js documentation](https://reactjs.org) for more details.
