import React, { useState } from "react";
import { MASTER_DATA } from "./masterData"; 

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6GKq6LeA69DhCE93tjHi_Ig5hWbIzu5R9g9MiN3TCxj5X2QbXQDjQ63q5RunIT7Piqw/exec";

export default function StockPage({ zone, username, onFinish }) {
  const zoneData = MASTER_DATA[zone] || {};
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(zoneData)[0] || "");
  const [selectedItem, setSelectedItem] = useState("");
  const [qty1, setQty1] = useState("");
  const [qty2, setQty2] = useState("");
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCart = () => {
    if (!selectedItem) return alert("เลือกสินค้าก่อนครับ");
    const item = zoneData[selectedCategory].find(i => i.id === selectedItem);
    setCart([...cart, { 
      id: item.id, name: item.name, category: selectedCategory,
      qty1: qty1 || 0, unit1: item.unit1, qty2: qty2 || 0, unit2: item.unit2 || "" 
    }]);
    setSelectedItem(""); setQty1(""); setQty2("");
  };

  const submitToSheet = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        body: JSON.stringify({ user: username, zone: zone, items: cart })
      });
      alert("ส่งข้อมูลสำเร็จ!");
      setCart([]); onFinish();
    } catch (e) { alert("Error!"); }
    setIsSubmitting(false);
  };

  return (
    <div style={{padding: "20px", color: "#fff"}}>
      <h3 style={{color: "#E6C068"}}>โซน: {zone}</h3>
      <select onChange={(e) => setSelectedCategory(e.target.value)} style={styles.input}>
        {Object.keys(zoneData).map(cat => <option key={cat}>{cat}</option>)}
      </select>
      <div style={styles.list}>
        {zoneData[selectedCategory]?.map(item => (
          <div key={item.id} onClick={() => setSelectedItem(item.id)} 
               style={selectedItem === item.id ? styles.itemActive : styles.item}>{item.name}</div>
        ))}
      </div>
      {selectedItem && (
        <div style={{marginTop: "10px", display: "flex", gap: "10px"}}>
          <input type="number" value={qty1} onChange={(e) => setQty1(e.target.value)} placeholder="หน่วยหลัก" style={styles.input} />
          <input type="number" value={qty2} onChange={(e) => setQty2(e.target.value)} placeholder="หน่วยรอง" style={styles.input} />
          <button onClick={addToCart} style={styles.addBtn}>ADD</button>
        </div>
      )}
      <button onClick={submitToSheet} disabled={isSubmitting || cart.length === 0} style={styles.sendBtn}>
        {isSubmitting ? "กำลังส่ง..." : "CONFIRM & SEND"}
      </button>
    </div>
  );
}

const styles = {
  input: { width: "100%", padding: "12px", backgroundColor: "#111", color: "#fff", border: "1px solid #333", borderRadius: "8px" },
  list: { maxHeight: "250px", overflowY: "auto", border: "1px solid #222", margin: "10px 0" },
  item: { padding: "12px", borderBottom: "1px solid #111", color: "#666" },
  itemActive: { padding: "12px", color: "#E6C068", backgroundColor: "#1a1a1a", borderBottom: "2px solid #C9A227", fontWeight: "bold" },
  addBtn: { padding: "0 20px", backgroundColor: "#C9A227", borderRadius: "8px", fontWeight: "bold" },
  sendBtn: { width: "100%", padding: "18px", backgroundColor: "#E6C068", border: "none", borderRadius: "10px", fontWeight: "900", fontSize: "16px", marginTop: "20px" }
};