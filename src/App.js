import React, { useState, useEffect } from "react";
import StockPage from "./StockPage"; 
import SummaryPage from "./SummaryPage"; 

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);
  const [currentView, setCurrentView] = useState("STOCK");

  useEffect(() => {
    const savedUser = localStorage.getItem("HAUS_USER");
    const savedRole = localStorage.getItem("HAUS_ROLE");
    if (savedUser) { setUser(savedUser); setRole(savedRole); }
  }, []);

  const handleLoginSuccess = (username, userRole) => {
    setUser(username); setRole(userRole);
    localStorage.setItem("HAUS_USER", username);
    localStorage.setItem("HAUS_ROLE", userRole);
  };

  const handleLogout = () => {
    if (window.confirm("ออกจากระบบ?")) {
      setUser(null); setRole(null); setCurrentZone(null);
      localStorage.clear();
    }
  };

  if (!user) return <LoginScreen onLoginSuccess={handleLoginSuccess} />;

  // --- 1. หน้าหลัก (3 ปุ่มเมนูหลัก) ---
  if (!currentZone) {
    return (
      <div style={styles.container}>
        <Header user={user} onLogout={handleLogout} />
        <div style={styles.menuWrapper}>
          <button onClick={() => {setCurrentZone("BAR"); setCurrentView("STOCK");}} style={styles.mainBtn}>🍺 สต็อกบาร์</button>
          <button onClick={() => {setCurrentZone("KITCHEN"); setCurrentView("STOCK");}} style={styles.mainBtn}>🍳 สต็อกครัว</button>
          <button onClick={() => setCurrentZone("SELECT_SUMMARY")} style={styles.summaryBtnMain}>📊 วิว สต็อกซิสเต็ม</button>
        </div>
      </div>
    );
  }

  // --- 2. หน้าเลือกแผนกสรุปยอด ---
  if (currentZone === "SELECT_SUMMARY") {
    return (
      <div style={styles.container}>
        <Header user={user} onLogout={handleLogout} onBack={() => setCurrentZone(null)} />
        <div style={styles.menuWrapper}>
          <p style={styles.label}>เลือกแผนกเพื่อดูบัญชีสรุป</p>
          <button onClick={() => {setCurrentZone("BAR"); setCurrentView("SUMMARY");}} style={styles.choiceBtn}>สรุปยอดบาร์</button>
          <button onClick={() => {setCurrentZone("KITCHEN"); setCurrentView("SUMMARY");}} style={styles.choiceBtn}>สรุปยอดครัว</button>
        </div>
      </div>
    );
  }

  // --- 3. หน้าจอทำงาน (Stock / Summary แบบบัญชี) ---
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", paddingTop: '60px' }}>
      <Header user={user} onLogout={handleLogout} onBack={() => setCurrentZone(null)} />
      
      {currentView === "STOCK" ? (
        <StockPage zone={currentZone} username={user} onFinish={() => setCurrentView("SUMMARY")} />
      ) : (
        <div style={{ padding: '10px' }}>
          <h2 style={{ color: '#E6C068', fontSize: '16px', textAlign: 'center', marginBottom: '15px' }}>
             บัญชีสรุปยอด: {currentZone}
          </h2>
          {/* --- ตารางสรุปแบบบัญชี 4 คอลัมน์ --- */}
          <div style={styles.tableScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>คนลง</th>
                  <th style={styles.th}>รายการ</th>
                  <th style={styles.th}>สรุป</th>
                  <th style={styles.th}>วันที่</th>
                </tr>
              </thead>
              <tbody>
                {/* ข้อมูลตัวอย่าง (ข้อมูลจริงจะดึงจากฐานข้อมูลพี่ครับ) */}
                <tr style={styles.tr}>
                  <td style={styles.td}>{user}</td>
                  <td style={styles.td}>Asahi 640</td>
                  <td style={{...styles.td, color: '#27ae60'}}>+24</td>
                  <td style={styles.td}>06/03</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={() => setCurrentView("STOCK")} style={styles.backActionBtn}>เพิ่มรายการใหม่</button>
        </div>
      )}
    </div>
  );
}

// --- UI Components ---

function LoginScreen({ onLoginSuccess }) {
  const [u, setU] = useState("");
  return (
    <div style={styles.container}>
      <h1 style={styles.brandName}>HAUS IZAKAYA</h1>
      <input style={styles.input} placeholder="USERNAME" onChange={(e)=>setU(e.target.value)} />
      <button onClick={()=>onLoginSuccess(u.toUpperCase(), u==="ADMIN_HAUS"?"ADMIN":"USER")} style={styles.loginBtn}>LOGIN</button>
    </div>
  );
}

function Header({ user, onLogout, onBack }) {
  return (
    <div style={styles.header}>
      <div style={{fontSize: '12px', color: '#E6C068', fontWeight: '900'}}>HAUS IZAKAYA</div>
      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
        <span style={{fontSize: '9px', color: '#666'}}>{user}</span>
        {onBack && <button onClick={onBack} style={styles.smallBtn}>BACK</button>}
        <button onClick={onLogout} style={{...styles.smallBtn, color: '#ff4d4d'}}>OUT</button>
      </div>
    </div>
  );
}

// --- Styles (เน้นประหยัดพื้นที่ 100% ไม่ล้นจอ) ---
const styles = {
  container: { backgroundColor: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "15px" },
  brandName: { color: "#E6C068", fontSize: "22px", fontWeight: 900, marginBottom: "30px", fontFamily: "'Noto Serif JP', serif" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #222", backgroundColor: "#111", color: "#E6C068", width: "240px", textAlign: "center", marginBottom: "10px" },
  loginBtn: { padding: "12px", background: "#C9A227", color: "#000", border: "none", borderRadius: "6px", width: "240px", fontWeight: "bold" },
  menuWrapper: { width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "10px" },
  mainBtn: { padding: "18px", backgroundColor: "#151515", color: "#E6C068", border: "1px solid #333", borderRadius: "8px", fontSize: "16px", fontWeight: "bold" },
  summaryBtnMain: { padding: "18px", background: "transparent", color: "#C9A227", border: "1px solid #C9A227", borderRadius: "8px", fontSize: "16px", fontWeight: "bold" },
  choiceBtn: { padding: "15px", backgroundColor: "#222", color: "#fff", border: "1px solid #444", borderRadius: "8px" },
  header: { width: "100%", padding: "10px 15px", backgroundColor: "#000", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", position: 'fixed', top: 0, boxSizing: 'border-box' },
  smallBtn: { background: "transparent", border: "1px solid #444", color: "#888", padding: "4px 8px", borderRadius: "4px", fontSize: "9px" },
  label: { color: "#555", fontSize: "11px", textAlign: "center", marginBottom: "5px" },
  tableScroll: { width: '100%', overflowX: 'auto', borderRadius: '8px', border: '1px solid #222' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px', backgroundColor: '#111', tableLayout: 'fixed' },
  th: { backgroundColor: '#1a1a1a', color: '#888', padding: '10px 5px', textAlign: 'left', borderBottom: '1px solid #333' },
  td: { padding: '10px 5px', color: '#ccc', borderBottom: '1px solid #222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid #222' },
  backActionBtn: { width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px' }
};
