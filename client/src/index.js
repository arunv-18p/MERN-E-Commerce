import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store";

import { transitions, positions, Provider as AlertProvider } from "react-alert";

import App from "./App";

import "./configs/bootstrap.custom.scss";
import "./index.css";

import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

// ALERT OPTIONS
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
