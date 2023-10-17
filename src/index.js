require("./bootstrap.js");

import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
// import reportWebVitals from "./utils/reportWebVital";
import * as serviceWorker from "./serviceWorker";
import history from "./utils/history";
import App from "./App";

// Sections
import MainSection from "./sections/Main";

// Containers
import LayoutContainer from "./containers/Layout";

// Components
import Loader from "./components/Loader";

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
      <Router history={history}>
        <Suspense fallback={<FallBack />}>
          <App />
        </Suspense>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);

// reportWebVitals(console.log);

// Better not to opt-in service worker for now
serviceWorker.unregister();

module.hot.accept();
