import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentZone && currentView === "STOCK") {
        e.preventDefault();
        e.returnValue = "มีข้อมูลยังไม่บันทึก ต้องการออกจริงหรือไม่?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentZone, currentView]);

  const handleLoginSuccess = (username, userRole) => {
    setUser(username);
    setRole(userRole);
    localStorage.setItem("HAUS_USER", username);
    localStorage.setItem("HAUS_ROLE", userRole);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 4000);
  };

  const handleLogout = () => {
    if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
      setUser(null);
      setRole(null);
      setCurrentZone(null);
      setCurrentView("STOCK");
      localStorage.clear();
    }
  };

  const selectZone = (zone, targetView = "STOCK") => {
    setCurrentZone(zone);
    setCurrentView(targetView);
    if (role !== "ADMIN") {
      localStorage.setItem("HAUS_ZONE_LOCK", zone);
    }
  };

  if (!user) return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  if (showWelcome) return <WelcomeScreen username={user} />;

  if (!currentZone) {
    return (
      <div style={styles.container}>
        <Header user={user} role={role} onLogout={handleLogout} />

        <div style={styles.menuWrapper}>
          <h2 style={styles.sectionTitle}>ENTER STOCK</h2>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => selectZone("BAR", "STOCK")}
              style={styles.zoneBtn}
            >
              BAR
            </button>
            <button
              onClick={() => selectZone("KITCHEN", "STOCK")}
              style={styles.zoneBtn}
            >
              KITCHEN
            </button>
          </div>

          <h2
            style={{
              ...styles.sectionTitle,
              color: "#C9A227",
              marginTop: "30px",
            }}
          >
            VIEW SUMMARY
          </h2>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => selectZone("BAR", "SUMMARY")}
              style={styles.summaryBtn}
            >
              BAR SUMMARY
            </button>
            <button
              onClick={() => selectZone("KITCHEN", "SUMMARY")}
              style={styles.summaryBtn}
            >
              KITCHEN SUMMARY
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Header
        user={user}
        role={role}
        onLogout={handleLogout}
        onBack={() => {
          if (role === "ADMIN") {
            setCurrentZone(null);
            setCurrentView("STOCK");
          } else {
            alert("สิทธิ์ผู้ใช้งานทั่วไป กรุณาล็อกเอาต์เพื่อเปลี่ยนโซนครับ");
          }
        }}
      />

      {currentView === "STOCK" ? (
        <StockPage
          zone={currentZone}
          username={user}
          onFinish={() => setCurrentView("SUMMARY")}
        />
      ) : (
        <SummaryPage
          zone={currentZone}
          username={user}
          onBack={() => setCurrentView("STOCK")}
        />
      )}
    </div>
  );
}

function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("กรุณากรอกข้อมูลให้ครบครับ");
    const role = username === "ADMIN_HAUS" ? "ADMIN" : "USER";
    onLoginSuccess(username, role);
  };

  return (
    <div style={styles.container}>
      {/* เอาโลโก้ออกแล้ว ใช้ชื่อร้านหล่อๆ แทนครับ */}
      <h1 style={styles.brandName}>HAUS IZAKAYA</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value.toUpperCase())}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          LOGIN
        </button>
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
      <div style={styles.footer}>
        <p style={styles.familyText}>PROUD TO BE HAUS FAMILY</p>
      </div>
    </div>
  );
}

function Header({ user, role, onLogout, onBack }) {
  return (
    <div style={styles.header}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <div
            style={{
              color: "#E6C068",
              fontSize: "16px",
              fontWeight: "900",
              fontFamily: "'Noto Serif JP', serif",
            }}
          >
            HAUS IZAKAYA
          </div>
          <div
            style={{ color: "#888", fontSize: "10px", letterSpacing: "1px" }}
          >
            USER: {user}
          </div>
        </div>
      </div>
      <div>
        {role === "ADMIN" && onBack && (
          <button onClick={onBack} style={styles.smallBtn}>
            BACK
          </button>
        )}
        <button
          onClick={onLogout}
          style={{
            ...styles.smallBtn,
            marginLeft: "10px",
            color: "#ff4d4d",
            borderColor: "#ff4d4d",
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    padding: "20px",
    position: "relative",
  },
  brandName: {
    fontFamily: "'Noto Serif JP', serif",
    fontWeight: 900,
    color: "#E6C068",
    fontSize: "32px",
    letterSpacing: "3px",
    marginBottom: "40px",
    textAlign: "center",
  },
  userName: {
    color: "#C9A227",
    fontSize: "24px",
    letterSpacing: "2px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  slogan: {
    color: "#fff",
    fontSize: "14px",
    letterSpacing: "2px",
    fontWeight: 300,
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "300px",
    gap: "15px",
  },
  input: {
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#151515",
    color: "#E6C068",
    fontSize: "16px",
    textAlign: "center",
    outline: "none",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  button: {
    padding: "15px",
    background: "linear-gradient(135deg, #E6C068, #C9A227, #9F7A1C)",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "2px",
    cursor: "pointer",
    marginTop: "10px",
  },
  footer: {
    position: "absolute",
    bottom: "40px",
    width: "100%",
    textAlign: "center",
  },
  familyText: { color: "#666", fontSize: "10px", letterSpacing: "3px" },

  menuWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: "40px",
  },
  sectionTitle: {
    color: "#E6C068",
    letterSpacing: "2px",
    fontSize: "14px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "300px",
  },
  zoneBtn: {
    padding: "20px",
    backgroundColor: "#151515",
    color: "#E6C068",
    border: "1px solid #C9A227",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    width: "100%",
  },
  summaryBtn: {
    padding: "15px",
    backgroundColor: "transparent",
    color: "#C9A227",
    border: "1px dashed #C9A227",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    width: "100%",
  },

  header: {
    width: "100%",
    padding: "15px 20px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    borderBottom: "1px solid #333",
  },
  smallBtn: {
    background: "transparent",
    color: "#ccc",
    border: "1px solid #555",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
