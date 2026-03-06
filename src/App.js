import React, { useState, useEffect } from "react";
// หมายเหตุ: ตรวจสอบว่ามีไฟล์ StockPage.js และ SummaryPage.js ในโฟลเดอร์เดียวกันนะครับ
import StockPage from "./StockPage";
import SummaryPage from "./SummaryPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [currentView, setCurrentView] = useState("STOCK");

  useEffect(() => {
    const savedUser = localStorage.getItem("HAUS_USER");
    const savedRole = localStorage.getItem("HAUS_ROLE");
    const savedZone = localStorage.getItem("HAUS_ZONE_LOCK");
    if (savedUser) {
      setUser(savedUser);
      setRole(savedRole);
      if (savedZone) setCurrentZone(savedZone);
    }
  }, []);

  const handleLoginSuccess = (username, userRole) => {
    setUser(username);
    setRole(userRole);
    localStorage.setItem("HAUS_USER", username);
    localStorage.setItem("HAUS_ROLE", userRole);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 2500);
  };

  const handleLogout = () => {
    if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
      setUser(null); setRole(null); setCurrentZone(null);
      localStorage.clear();
    }
  };

  // --- ฟังก์ชันเลือกโซนและมุมมอง ---
  const selectAction = (zone, view) => {
    setCurrentZone(zone);
    setCurrentView(view);
    if (role !== "ADMIN" && view === "STOCK") {
      localStorage.setItem("HAUS_ZONE_LOCK", zone);
    }
  };

  if (!user) return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  if (showWelcome) return <WelcomeScreen username={user} />;

  // --- หน้าแรก: 3 เมนูหลักตามโจทย์ ---
  if (!currentZone) {
    return (
      <div style={styles.container}>
        <Header user={user} role={role} onLogout={handleLogout} />
        <div style={styles.menuWrapper}>
          <h2 style={styles.menuSubtitle}>MAIN MENU</h2>
          <div style={styles.buttonGroup}>
            <button onClick={() => selectAction("BAR", "STOCK")} style={styles.mainBtn}>🍺 สต็อกบาร์</button>
            <button onClick={() => selectAction("KITCHEN", "STOCK")} style={styles.mainBtn}>🍳 สต็อกครัว</button>
            <button onClick={() => setCurrentZone("SELECT_SUMMARY")} style={styles.summaryBtnMain}>
              📊 วิว สต็อกซิสเต็ม
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- หน้าเลือกแผนกรายงาน (หลังจากกด วิว สต็อกซิสเต็ม) ---
  if (currentZone === "SELECT_SUMMARY") {
    return (
      <div style={styles.container}>
        <Header user={user} role={role} onLogout={handleLogout} onBack={() => setCurrentZone(null)} />
        <div style={styles.menuWrapper}>
          <h2 style={styles.menuSubtitle}>เลือกแผนกที่ต้องการดูสรุป</h2>
          <div style={styles.buttonGroup}>
            <button onClick={() => selectAction("BAR", "SUMMARY")} style={styles.choiceBtn}>สรุปยอดบาร์</button>
            <button onClick={() => selectAction("KITCHEN", "SUMMARY")} style={styles.choiceBtn}>สรุปยอดครัว</button>
          </div>
        </div>
      </div>
    );
  }

  // --- หน้าจอทำงานจริง (StockPage / SummaryPage) ---
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Header 
        user={user} role={role} onLogout={handleLogout} 
        onBack={() => {
          if (role === "ADMIN") setCurrentZone(null);
          else alert("สิทธิ์ทั่วไป ล็อกเอาต์เพื่อเปลี่ยนโซน");
        }} 
      />
      {currentView === "STOCK" ? (
        <StockPage zone={currentZone} username={user} onFinish={() => setCurrentView("SUMMARY")} />
      ) : (
        <SummaryPage zone={currentZone} username={user} onBack={() => setCurrentView("STOCK")} />
      )}
    </div>
  );
}

// --- ส่วนประกอบหน้าจอ (UI Components) ---

function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={styles.container}>
      <h1 style={styles.brandName}>HAUS IZAKAYA</h1>
      <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(username.toUpperCase(), username === "ADMIN_HAUS" ? "ADMIN" : "USER"); }} style={styles.form}>
        <input style={styles.input} placeholder="USERNAME" onChange={(e) => setUsername(e.target.value)} />
        <input style={styles.input} type="password" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={styles.loginBtn}>LOGIN</button>
      </form>
    </div>
  );
}

function WelcomeScreen({ username }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.brandName}>HAUS IZAKAYA</h1>
      <h2 style={styles.userName}>{username}</h2>
      <p style={styles.slogan}>Precision Stock. Elevated Service.</p>
    </div>
  );
}

function Header({ user, role, onLogout, onBack }) {
  return (
    <div style={styles.header}>
      <div style={{ textAlign: 'left' }}>
        <div style={styles.headerBrand}>HAUS IZAKAYA</div>
        <div style={styles.headerUser}>USER: {user}</div>
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {onBack && <button onClick={onBack} style={styles.smallBtn}>BACK</button>}
        <button onClick={onLogout} style={{...styles.smallBtn, color: '#ff4d4d', borderColor: '#442222'}}>OUT</button>
      </div>
    </div>
  );
}

// --- Styles (เน้นประหยัดพื้นที่ สวย แพง) ---
const styles = {
  container: {
    backgroundColor: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", padding: "15px", boxSizing: "border-box"
  },
  brandName: { fontFamily: "'Noto Serif JP', serif", fontWeight: 900, color: "#E6C068", fontSize: "24px", letterSpacing: "2px", marginBottom: "30px" },
  userName: { color: "#C9A227", fontSize: "18px", fontWeight: "bold", marginBottom: "5px" },
  slogan: { color: "#555", fontSize: "11px", letterSpacing: "1px" },
  form: { display: "flex", flexDirection: "column", width: "100%", maxWidth: "260px", gap: "10px" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #222", backgroundColor: "#111", color: "#E6C068", fontSize: "14px", textAlign: "center", outline: "none" },
  loginBtn: { padding: "12px", background: "linear-gradient(135deg, #E6C068, #9F7A1C)", color: "#000", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" },
  menuWrapper: { width: "100%", maxWidth: "280px", textAlign: "center" },
  menuSubtitle: { color: "#444", fontSize: "10px", letterSpacing: "2px", marginBottom: "20px", textTransform: "uppercase" },
  buttonGroup: { display: "flex", flexDirection: "column", gap: "12px" },
  mainBtn: { padding: "18px", backgroundColor: "#151515", color: "#E6C068", border: "1px solid #333", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" },
  summaryBtnMain: { padding: "18px", backgroundColor: "transparent", color: "#C9A227", border: "1px solid #C9A227", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" },
  choiceBtn: { padding: "15px", backgroundColor: "#222", color: "#fff", border: "1px solid #444", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" },
  header: { width: "100%", padding: "10px 15px", backgroundColor: "#000", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", position: 'fixed', top: 0, zIndex: 100 },
  headerBrand: { color: "#E6C068", fontSize: "13px", fontWeight: "900", fontFamily: "'Noto Serif JP', serif" },
  headerUser: { color: "#666", fontSize: "9px" },
  smallBtn: { background: "transparent", color: "#888", border: "1px solid #444", padding: "4px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: "bold" }
};
