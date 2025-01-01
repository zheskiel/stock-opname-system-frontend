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
import TitleUpdater from "./components/Tracker/title.js";
import Loader from "./components/Loader";

// Plugins
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Tracker from "./components/Tracker";

const AppEnv = process.env.REACT_APP_ENV;

const FallBack = () => {
  return (
    <LayoutContainer>
      <MainSection>
        <Loader />
      </MainSection>
    </LayoutContainer>
  );
};

const AppRender = () => {
  const AppElem = () => {
    return (
      <Suspense fallback={<FallBack />}>
        <App />
      </Suspense>
    );
  };

  if (AppEnv == "production") {
    return (
      <>
        <TitleUpdater />

        <Tracker>
          <AppElem />
        </Tracker>
      </>
    );
  }

  return <AppElem />;
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
        <AppRender />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);

if (AppEnv != "production") {
  // reportWebVitals(console.log);

  module.hot.accept();
}
