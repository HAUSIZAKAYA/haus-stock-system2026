import React, { useState } from "react";
import "./App.css";

function App() {

  const [view, setView] = useState("dashboard");

  const now = new Date().toLocaleString();

  const items = [
    { name: "Asahi Beer", category: "Bar", stock: 24 },
    { name: "Sapporo Beer", category: "Bar", stock: 18 },
    { name: "Egg", category: "Kitchen", stock: 120 },
    { name: "Pork", category: "Kitchen", stock: 12 }
  ];

  const barItems = items.filter(i => i.category === "Bar");
  const kitchenItems = items.filter(i => i.category === "Kitchen");

  return (
    <div className="app">

      <header className="header">
        <h1>HAUS IZAKAYA</h1>

        <div className="user-info">
          <p>User: Staff</p>
          <p>{now}</p>
        </div>
      </header>

      {view === "dashboard" && (
        <div>

          <h2>Item List</h2>
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                {item.name} | {item.category}
              </li>
            ))}
          </ul>

          <h2>Latest Stock</h2>
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                {item.name} : {item.stock}
              </li>
            ))}
          </ul>

          <h2>7 Day Summary</h2>
          <p>Average consumption shown here</p>

          <button onClick={() => setView("summary")}>
            View Summary
          </button>

        </div>
      )}

      {view === "summary" && (
        <div>

          <h2>Select Category</h2>

          <button onClick={() => setView("bar")}>
            Bar
          </button>

          <button onClick={() => setView("kitchen")}>
            Kitchen
          </button>

        </div>
      )}

      {view === "bar" && (
        <div>

          <h2>Bar Summary</h2>

          <ul>
            {barItems.map((item, i) => (
              <li key={i}>
                {item.name} : {item.stock}
              </li>
            ))}
          </ul>

          <button onClick={() => setView("dashboard")}>
            Back
          </button>

        </div>
      )}

      {view === "kitchen" && (
        <div>

          <h2>Kitchen Summary</h2>

          <ul>
            {kitchenItems.map((item, i) => (
              <li key={i}>
                {item.name} : {item.stock}
              </li>
            ))}
          </ul>

          <button onClick={() => setView("dashboard")}>
            Back
          </button>

        </div>
      )}

    </div>
  );
}

export default App;
