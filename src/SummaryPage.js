import React, { useState, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6GKq6LeA69DhCE93tjHi_Ig5hWbIzu5R9g9MiN3TCxj5X2QbXQDjQ63q5RunIT7Piqw/exec";

export default function SummaryPage({ zone, onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?zone=${zone}`);
      const json = await response.json();
      setData(json);
    } catch (err) { console.error("Error:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchHistory(); }, [zone]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{zone} - 7 DAYS HISTORY</h2>
        <button onClick={fetchHistory} style={styles.refreshBtn}>🔄 UPDATE</button>
      </div>

      {loading ? <div style={styles.loading}>กำลังดึงข้อมูล...</div> : (
        <div style={styles.scroll}>
          {data.length > 0 ? data.map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardTop}>
                <span>{item.date}</span>
                <span style={{color: "#C9A227", fontWeight: "bold"}}>{item.staff}</span>
              </div>
              <div style={styles.cardBottom}>
                <span style={{flex: 1}}>{item.item}</span>
                <div style={{textAlign: "right"}}>
                  <span style={styles.qty}>{item.qty1} <small style={styles.unit}>{item.unit1}</small></span>
                  {item.qty2 > 0 && <span style={styles.qty}> + {item.qty2} <small style={styles.unit}>{item.unit2}</small></span>}
                </div>
              </div>
            </div>
          )) : <div style={styles.noData}>ไม่พบข้อมูลย้อนหลัง 7 วัน</div>}
        </div>
      )}
      <button onClick={onBack} style={styles.backBtn}>BACK TO MENU</button>
    </div>
  );
}

const styles = {
  container: { padding: "15px", backgroundColor: "#0a0a0a", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  title: { color: "#E6C068", fontSize: "16px", fontWeight: "900" },
  refreshBtn: { background: "#1a1a1a", border: "1px solid #333", color: "#E6C068", padding: "8px 15px", borderRadius: "20px", fontSize: "10px" },
  loading: { textAlign: "center", marginTop: "100px", color: "#666" },
  scroll: { display: "flex", flexDirection: "column", gap: "10px" },
  card: { backgroundColor: "#111", padding: "15px", borderRadius: "10px", border: "1px solid #222" },
  cardTop: { display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#555", marginBottom: "8px", borderBottom: "1px solid #1a1a1a", paddingBottom: "5px" },
  cardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  qty: { color: "#E6C068", fontSize: "18px", fontWeight: "900", marginLeft: "10px" },
  unit: { fontSize: "10px", color: "#444" },
  backBtn: { width: "100%", padding: "15px", marginTop: "30px", backgroundColor: "transparent", color: "#666", border: "1px solid #333", borderRadius: "8px" }
};