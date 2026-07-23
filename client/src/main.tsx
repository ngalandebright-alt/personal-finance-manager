import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TransactionProvider from "./context/TransactionProvider";
import BudgetProvider from "./context/BudgetProvider";
ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <TransactionProvider>
      <BudgetProvider>
      <App />
      </BudgetProvider>
    </TransactionProvider>
  </React.StrictMode>
);