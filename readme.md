# Daily Spark - Daily Motivational Quotes

Daily Spark is a web app that provides a new motivational quote each day. It features a clean, modern design and allows users to share quotes.

## Features

- Daily motivational quotes
- Share quotes via the web
- Display specific quotes based on URL index

## Live Demo
This app is deployed with Surge. You can view the live version of the app at the following link:

[Live Demo](https://pricey-able.surge.sh/)

## Libraries Used

- **[Parcel](https://parceljs.org/)** ![Parcel](https://img.shields.io/badge/Parcel-%20-blue?style=flat&logo=parcel)
  - A web application bundler that simplifies the build process with zero configuration.

- **[Jest](https://jestjs.io/)** ![Jest](https://img.shields.io/badge/Jest-%20-red?style=flat&logo=jest)
  - For testing the application. Jest is used for running unit tests and ensuring code quality.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/fsystemweb/daily-spark.git
    cd daily-spark
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

    Open [http://localhost:1234](http://localhost:1234) in your browser.

## Test
   ```sh
   npm test    
   ```

## Usage

- **View Quotes:** Click "Reveal Quote" to display a motivational quote.
- **Share Quote:** Click "Share" to share the quote via the web.

### URL Handling

- Add an index to the URL to display a specific quote. Example: [http://localhost:1234/?quote=0](http://localhost:1234/?quote=0)

## URL Manipulation

### `updateUrlWithQuoteIndex(index)`

Updates the current URL with the provided quote index:

```javascript
const updateUrlWithQuoteIndex = (index) => {
  const url = new URL(window.location);
  url.searchParams.set('quote', index);
  history.replaceState(null, '', url);
};
