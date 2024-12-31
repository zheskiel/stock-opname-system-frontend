require("./bootstrap.js");

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { Router } from "react-router-dom";
// import reportWebVitals from "./utils/reportWebVital";
import history from "./utils/history";
import App from "./App";

// Sections
import MainSection from "./sections/Main";

// Containers
import LayoutContainer from "./containers/Layout";

// Components
import Loader from "./components/Loader";

// Plugins
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const FallBack = () => {
  return (
    <LayoutContainer>
      <MainSection>
        <Loader />
      </MainSection>
    </LayoutContainer>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer
        className="toast-container"
        bodyClassName="toast-body"
        progressClassName="toast-progress-bar"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />

      <Router history={history}>
        <Suspense fallback={<FallBack />}>
          <App />
        </Suspense>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);

const AppEnv = process.env.REACT_APP_ENV;

if (AppEnv != "production") {
  // reportWebVitals(console.log);

  module.hot.accept();
}
