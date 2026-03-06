import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('MAIN'); // หน้าจอ: MAIN, BAR, KITCHEN, SUMMARY
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  // ข้อมูลบัญชีสรุป 4 คอลัมน์ (คนลง, รายการ, สรุป, วันที่)
  const mockData = [
    { recorder: "ต้มจืด", item: "Asahi 640ml", change: "+24", date: "06/03" },
    { recorder: "พนักงาน A", item: "Salmon Sliced", change: "-10", date: "06/03" },
    { recorder: "ต้มจืด", item: "Sake Junmai", change: "+5", date: "05/03" }
  ];

  const handleLogin = (name) => {
    if (!name) return alert("กรุณาใส่ชื่อผู้ใช้งาน");
    setUser(name.toUpperCase() === "ADMIN_HAUS" ? "ต้มจืด" : name);
    setIsLogin(true);
  };

  if (!isLogin) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={styles.appContainer}>
      {/* --- ส่วนหัว (Header) --- */}
      <div style={styles.header}>
        <div style={styles.headerBrand}>HAUS IZAKAYA</div>
        <div style={styles.headerInfo}>👤 {user} | 🕒 {new Date().toLocaleDateString('th-TH')}</div>
      </div>

      {/* --- หน้าแรก: 3 ปุ่มเมนูหลัก (ราชินีสั่งลุย) --- */}
      {view === 'MAIN' && (
        <div style={styles.menuWrapper}>
          <button onClick={() => setView('BAR')} style={styles.mainBtn}>🍺 สต็อกบาร์</button>
          <button onClick={() => setView('KITCHEN')} style={styles.mainBtn}>🍳 สต็อกครัว</button>
          <button onClick={() => setView('SUMMARY')} style={styles.summaryBtnMain}>📊 วิว สต็อกซิสเต็ม</button>
          <button onClick={() => setIsLogin(false)} style={styles.logoutBtn}>ออกจากระบบ</button>
        </div>
      )}

      {/* --- หน้าจัดการสต็อก --- */}
      {(view === 'BAR' || view === 'KITCHEN') && (
        <div style={styles.pageContent}>
          <button onClick={() => setView('MAIN')} style={styles.backLink}>← กลับหน้าหลัก</button>
          <h2 style={styles.pageTitle}>จัดการ {view === 'BAR' ? 'บาร์' : 'ครัว'}</h2>
          <div style={styles.actionGroup}>
            <button style={{ ...styles.actionBtn, backgroundColor: '#27ae60' }}>➕ เพิ่มของเข้า</button>
            <button style={{ ...styles.actionBtn, backgroundColor: '#e67e22' }}>➖ ตัดของออก</button>
          </div>
        </div>
      )}

      {/* --- หน้าบัญชีสรุปยอด (4 คอลัมน์ ไม่ล้นจอ) --- */}
      {view === 'SUMMARY' && (
        <div style={styles.pageContent}>
          <button onClick={() => setView('MAIN')} style={styles.backLink}>← กลับหน้าหลัก</button>
          <h2 style={styles.pageTitle}>👑 ราชินีสรุปยอด</h2>
          
          <div style={styles.tableWrapper}>
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
                {mockData.map((row, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={styles.td}>{row.recorder}</td>
                    <td style={styles.td}>{row.item}</td>
                    <td style={{ ...styles.td, color: row.change.includes('+') ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>
                      {row.change}
                    </td>
                    <td style={styles.td}>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [input, setInput] = useState("");
  return (
    <div style={styles.loginContainer}>
      <h1 style={styles.brandTitle}>HAUS IZAKAYA</h1>
      <input 
        style={styles.loginInput} 
        placeholder="USERNAME" 
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onLogin(input)}
      />
      <button onClick={() => onLogin(input)} style={styles.loginBtn}>ENTER SYSTEM</button>
    </div>
  );
}

// --- CSS Styles (ปรับปรุงล่าสุด: รีดไขมัน ไม่เบียดจอ) ---
const styles = {
  appContainer: { backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '12px', color: '#fff', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #222', paddingBottom: '8px', marginBottom: '15px' },
  headerBrand: { color: '#E6C068', fontSize: '13px', fontWeight: '900', fontFamily: "'Noto Serif JP', serif", letterSpacing: '1px' },
  headerInfo: { fontSize: '9px', color: '#666' },
  loginContainer: { backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  brandTitle: { color: '#E6C068', fontSize: '26px', fontWeight: '900', fontFamily: "'Noto Serif JP', serif", marginBottom: '25px', textAlign: 'center' },
  loginInput: { padding: '12px', width: '100%', maxWidth: '240px', backgroundColor: '#111', border: '1px solid #333', color: '#E6C068', borderRadius: '8px', textAlign: 'center', marginBottom: '12px', outline: 'none', fontSize: '14px' },
  loginBtn: { padding: '12px', width: '100%', maxWidth: '240px', background: 'linear-gradient(135deg, #E6C068, #C9A227)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' },
  menuWrapper: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '5%' },
  mainBtn: { padding: '16px', backgroundColor: '#151515', color: '#E6C068', border: '1px solid #333', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  summaryBtnMain: { padding: '16px', backgroundColor: 'transparent', color: '#C9A227', border: '1px solid #C9A227', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  logoutBtn: { marginTop: '15px', background: 'none', border: 'none', color: '#444', fontSize: '11px', textDecoration: 'underline' },
  pageContent: { animation: 'fadeIn 0.2s ease' },
  pageTitle: { color: '#E6C068', fontSize: '16px', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' },
  backLink: { background: 'none', border: 'none', color: '#555', fontSize: '11px', marginBottom: '8px', cursor: 'pointer', padding: '0' },
  actionGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  actionBtn: { padding: '14px', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' },
  tableWrapper: { overflowX: 'auto', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#0d0d0d' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '11px', tableLayout: 'fixed' },
  th: { padding: '10px 6px', textAlign: 'left', color: '#666', borderBottom: '1px solid #222', fontWeight: 'normal' },
  td: { padding: '10px 6px', borderBottom: '1px solid #151515', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid #111' }
};
