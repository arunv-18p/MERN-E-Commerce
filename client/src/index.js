import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

import "./configs/bootstrap.custom.scss";
import "./index.css";

import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import store from "./store";
import App from "./App";

// Alert Options
const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 1000,
  offset: '70px',
  transition: transitions.SCALE
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div className={`alert alert-${options.type}`} style={{...style}} onClick={close}>
    {message}
  </div>
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
