import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import TransactionProvider from "./context/TransactionProvider";
import BudgetProvider from "./context/BudgetProvider";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AuthProvider>
      <TransactionProvider>
        <BudgetProvider>
          <App />
        </BudgetProvider>
      </TransactionProvider>
    </AuthProvider>
  </React.StrictMode>
);