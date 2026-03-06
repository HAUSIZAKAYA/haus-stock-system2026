import React, { useState } from 'react';

// --- สไตล์แบบรีดไขมัน (เพรียวบาง พรีเมียม ไม่ล้นจอ) ---
const styles = {
  container: { backgroundColor: "#0a0a0a", minHeight: "100vh", padding: "12px", color: "#fff", fontFamily: "sans-serif", boxSizing: "border-box" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", paddingBottom: "10px", marginBottom: "15px" },
  brand: { color: "#E6C068", fontSize: "14px", fontWeight: "900", fontFamily: "'Noto Serif JP', serif" },
  info: { fontSize: "10px", color: "#666" },
  loginBox: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" },
  input: { padding: "12px", width: "240px", backgroundColor: "#111", border: "1px solid #333", color: "#E6C068", borderRadius: "8px", textAlign: "center", marginBottom: "10px", outline: "none" },
  btnGold: { padding: "12px", width: "240px", background: "linear-gradient(135deg, #E6C068, #C9A227)", color: "#000", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" },
  menuGroup: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" },
  mainBtn: { padding: "18px", backgroundColor: "#151515", color: "#E6C068", border: "1px solid #333", borderRadius: "10px", fontSize: "16px", fontWeight: "bold" },
  summaryBtn: { padding: "18px", background: "transparent", color: "#C9A227", border: "1px solid #C9A227", borderRadius: "10px", fontSize: "16px", fontWeight: "bold" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "11px", tableLayout: "fixed", marginTop: "10px" },
  th: { padding: "8px 5px", textAlign: "left", color: "#888", borderBottom: "1px solid #333" },
  td: { padding: "10px 5px", borderBottom: "1px solid #111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
};

export default function App() {
  const [session, setSession] = useState(null); // { user: '', role: '' }
  const [view, setView] = useState('MAIN'); // MAIN, BAR, KITCHEN, SUMMARY

  // ข้อมูลจำลอง (บัญชี 4 คอลัมน์)
  const mockLogs = [
    { recorder: "ต้มจืด", item: "Asahi 640ml", change: "+24", date: "06/03" },
    { recorder: "STAFF_A", item: "Salmon Sliced", change: "-10", date: "06/03" }
  ];

  const handleLogin = (u, p) => {
    if (!u || !p) return alert("กรุณากรอก Username และ Password");
    // เช็คสิทธิ์และตั้งชื่อโชว์จริง
    const displayName = u.toUpperCase().includes("ADMIN") ? "ต้มจืด" : u.toUpperCase();
    setSession({ user: displayName, role: u.toUpperCase().includes("ADMIN") ? "ADMIN" : "USER" });
  };

  if (!session) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={styles.container}>
      {/* 1. Header (หัวมุม) */}
      <div style={styles.header}>
        <div style={styles.brand}>HAUS IZAKAYA</div>
        <div style={styles.info}>👤 {session.user} | 🕒 06/03/26</div>
      </div>

      {/* --- หน้าหลัก: 3 ปุ่มเมนูหลัก --- */}
      {view === 'MAIN' && (
        <div style={styles.menuGroup}>
          <button onClick={() => setView('BAR')} style={styles.mainBtn}>🍺 สต็อกบาร์</button>
          <button onClick={() => setView('KITCHEN')} style={styles.mainBtn}>🍳 สต็อกครัว</button>
          <button onClick={() => setView('SUMMARY')} style={styles.summaryBtn}>📊 วิว สต็อกซิสเต็ม</button>
          <button onClick={() => setSession(null)} style={{ color: '#444', background: 'none', border: 'none', marginTop: '20px', fontSize: '11px' }}>LOGOUT</button>
        </div>
      )}

      {/* --- หน้าจัดการ (บาร์/ครัว) --- */}
      {(view === 'BAR' || view === 'KITCHEN') && (
        <div>
          <button onClick={() => setView('MAIN')} style={{ color: '#666', background: 'none', border: 'none', marginBottom: '10px' }}>← กลับ</button>
          <h2 style={{ color: '#E6C068', textAlign: 'center', fontSize: '16px' }}>จัดการ {view}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
            <button style={{ ...styles.mainBtn, backgroundColor: '#27ae60', color: '#fff' }}>➕ เพิ่มของเข้า</button>
            <button style={{ ...styles.mainBtn, backgroundColor: '#e67e22', color: '#fff' }}>➖ ตัดของออก</button>
          </div>
        </div>
      )}

      {/* --- หน้าบัญชีสรุปยอด (ราชินีสรุปยอด 4 คอลัมน์) --- */}
      {view === 'SUMMARY' && (
        <div>
          <button onClick={() => setView('MAIN')} style={{ color: '#666', background: 'none', border: 'none', marginBottom: '10px' }}>← กลับ</button>
          <h2 style={{ color: '#C9A227', textAlign: 'center', fontSize: '16px' }}>👑 บัญชีสรุปยอด</h2>
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
              {mockLogs.map((log, i) => (
                <tr key={i}>
                  <td style={styles.td}>{log.recorder}</td>
                  <td style={styles.td}>{log.item}</td>
                  <td style={{ ...styles.td, color: log.change.includes('+') ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>{log.change}</td>
                  <td style={styles.td}>{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  return (
    <div style={{ ...styles.container, ...styles.loginBox }}>
      <h1 style={{ ...styles.brand, fontSize: '28px', marginBottom: '30px' }}>HAUS IZAKAYA</h1>
      <input style={styles.input} placeholder="USERNAME" onChange={(e) => setU(e.target.value)} />
      <input style={styles.input} type="password" placeholder="PASSWORD" onChange={(e) => setP(e.target.value)} />
      <button onClick={() => onLogin(u, p)} style={styles.btnGold}>LOGIN</button>
    </div>
  );
}
