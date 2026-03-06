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
    setTimeout(() => setShowWelcome(false), 3000);
  };

  const handleLogout = () => {
    if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
      setUser(null);
      setRole(null);
      setCurrentZone(null);
      localStorage.clear();
    }
  };

  const selectZone = (zone, targetView) => {
    setCurrentZone(zone);
    setCurrentView(targetView);
    if (role !== "ADMIN") {
      localStorage.setItem("HAUS_ZONE_LOCK", zone);
    }
  };

  if (!user) return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  if (showWelcome) return <WelcomeScreen username={user} />;

  // --- หน้าเลือกเมนูหลัก (3 ปุ่ม) ---
  if (!currentZone) {
    return (
      <div style={styles.container}>
        <Header user={user} role={role} onLogout={handleLogout} />
        
        <div style={styles.menuWrapper}>
          <h2 style={styles.menuSubtitle}>MAIN NAVIGATION</h2>
          <div style={styles.buttonGroup}>
            <button onClick={() => selectZone("BAR", "STOCK")} style={styles.mainBtn}>
              🍺 สต็อกบาร์
            </button>
            <button onClick={() => selectZone("KITCHEN", "STOCK")} style={styles.mainBtn}>
              🍳 สต็อกครัว
            </button>
            <button 
              onClick={() => { setCurrentZone("ALL"); setCurrentView("SUMMARY"); }} 
              style={{...styles.mainBtn, border: '1px solid #C9A227', background: 'transparent', color: '#C9A227'}}
            >
              📊 วิว สต็อกซิสเต็ม
            </button>
          </div>
        </div>
        
        <div style={styles.footer}>
          <p style={styles.familyText}>HAUS IZAKAYA MANAGEMENT SYSTEM</p>
        </div>
      </div>
    );
  }

  // --- หน้าจอทำงาน (Stock / Summary) ---
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Header 
        user={user} 
        role={role} 
        onLogout={handleLogout} 
        onBack={() => {
          if (role === "ADMIN") { setCurrentZone(null); } 
          else { alert("กรุณาล็อกเอาต์เพื่อเปลี่ยนโซน"); }
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

// --- Component ย่อย (Login & Welcome) ---

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
      <div>
        <div style={styles.headerBrand}>HAUS IZAKAYA</div>
        <div style={styles.headerUser}>USER: {user}</div>
      </div>
      <div>
        {onBack && role === "ADMIN" && <button onClick={onBack} style={styles.smallBtn}>BACK</button>}
        <button onClick={onLogout} style={{...styles.smallBtn, marginLeft: '8px', color: '#ff4d4d', borderColor: '#ff4d4d'}}>OUT</button>
      </div>
    </div>
  );
}

// --- Styles (รีดไขมันแล้ว สวย แพง ไม่เบียด) ---
const styles = {
  container: {
    backgroundColor: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", padding: "15px", boxSizing: "border-box"
  },
  brandName: {
    fontFamily: "'Noto Serif JP', serif", fontWeight: 900, color: "#E6C068",
    fontSize: "26px", letterSpacing: "2px", marginBottom: "30px"
  },
  userName: { color: "#C9A227", fontSize: "20px", fontWeight: "bold", marginBottom: "10px" },
  slogan: { color: "#666", fontSize: "12px", letterSpacing: "1px" },
  form: { display: "flex", flexDirection: "column", width: "100%", maxWidth: "280px", gap: "10px" },
  input: {
    padding: "12px", borderRadius: "6px", border: "1px solid #222", backgroundColor: "#111",
    color: "#E6C068", fontSize: "14px", textAlign: "center", outline: "none"
  },
  loginBtn: {
    padding: "12px", background: "linear-gradient(135deg, #E6C068, #C9A227)",
    color: "#000", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "bold", cursor: "pointer"
  },
  menuWrapper: { width: "100%", maxWidth: "300px", textAlign: "center", marginTop: "20px" },
  menuSubtitle: { color: "#444", fontSize: "10px", letterSpacing: "2px", marginBottom: "15px" },
  buttonGroup: { display: "flex", flexDirection: "column", gap: "10px" },
  mainBtn: {
    padding: "16px", backgroundColor: "#151515", color: "#E6C068", border: "1px solid #333",
    borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer", transition: "0.2s"
  },
  header: {
    width: "100%", padding: "10px 15px", backgroundColor: "#000", display: "flex",
    justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222"
  },
  headerBrand: { color: "#E6C068", fontSize: "14px", fontWeight: "900", fontFamily: "'Noto Serif JP', serif" },
  headerUser: { color: "#666", fontSize: "9px" },
  smallBtn: {
    background: "transparent", color: "#888", border: "1px solid #444",
    padding: "4px 10px", borderRadius: "4px", fontSize: "9px", fontWeight: "bold"
  },
  footer: { marginTop: "40px" },
  familyText: { color: "#333", fontSize: "9px", letterSpacing: "2px" }
};
