// analytics.js
import ReactGA from "react-ga4";

const TRACKING_ID = "G-XKE6G9K0KY";

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
