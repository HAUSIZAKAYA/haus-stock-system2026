import React, { useState } from "react";
import StockPage from "./StockPage";
import SummaryPage from "./SummaryPage";
import "./styles.css";

function App() {

  const [page, setPage] = useState("stock");

  return (
    <div className="app-container">

      <header className="header">

        <h1 className="logo">
          HAUS IZAKAYA
        </h1>

        <div className="menu">

          <button
            className={page === "stock" ? "active" : ""}
            onClick={() => setPage("stock")}
          >
            STOCK
          </button>

          <button
            className={page === "summary" ? "active" : ""}
            onClick={() => setPage("summary")}
          >
            SUMMARY
          </button>

        </div>

      </header>

      <main className="content">

        {page === "stock" && <StockPage />}
        {page === "summary" && <SummaryPage />}

      </main>

    </div>
  );
}

export default App;
