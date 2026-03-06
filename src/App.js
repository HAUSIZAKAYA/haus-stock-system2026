import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('MAIN'); 
  const [currentUser, setCurrentUser] = useState(""); // เก็บชื่อยูสเซอร์จริงที่ล็อกอิน
  const [isLogin, setIsLogin] = useState(false);

  // ข้อมูลจำลองหน้าบัญชี (4 คอลัมน์: คนลง, รายการ, สรุป, วันที่)
  const mockData = [
    { recorder: "STAFF_A", item: "Asahi 640ml", change: "+24", date: "06/03" },
    { recorder: "ADMIN_HAUS", item: "Salmon Sliced", change: "-10", date: "06/03" }
  ];

  const handleLogin = (username, password) => {
    if (!username || !password) return alert("กรุณากรอกให้ครบทั้ง Username และ Password");
    
    // ตั้งค่า User ตามที่พิมพ์มาจริงๆ (ไม่มโนชื่อใหม่)
    setCurrentUser(username.toUpperCase());
    setIsLogin(true);
  };

  if (!isLogin) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={styles.appContainer}>
      {/* --- ส่วนหัว (Header): โชว์ยูสเซอร์ที่ใช้งานอยู่จริง --- */}
      <div style={styles.header}>
        <div style={styles.headerBrand}>HAUS IZAKAYA</div>
        <div style={styles.headerInfo}>👤 USER: {currentUser} | 🕒 06/03/26</div>
      </div>

      {/* --- หน้าแรก: 3 ปุ่มเมนูหลัก --- */}
      {view === 'MAIN' && (
        <div style={styles.menuWrapper}>
          <button onClick={() => setView('BAR')} style={styles.mainBtn}>🍺 สต็อกบาร์</button>
          <button onClick={() => setView('KITCHEN')} style={styles.mainBtn}>🍳 สต็อกครัว</button>
          <button onClick={() => setView('SUMMARY')} style={styles.summaryBtnMain}>📊 วิว สต็อกซิสเต็ม</button>
          <button onClick={() => setIsLogin(false)} style={styles.logoutBtn}>LOGOUT</button>
        </div>
      )}

      {/* --- หน้าจัดการสต็อก --- */}
      {(view === 'BAR' || view === 'KITCHEN') && (
        <div>
          <button onClick={() => setView('MAIN')} style={styles.backLink}>← กลับหน้าหลัก</button>
          <h2 style={styles.pageTitle}>จัดการ {view}</h2>
          <div style={styles.actionGroup}>
            <button style={{ ...styles.actionBtn, backgroundColor: '#27ae60' }}>➕ เพิ่มของ</button>
            <button style={{ ...styles.actionBtn, backgroundColor: '#e67e22' }}>➖ ตัดของ</button>
          </div>
        </div>
      )}

      {/* --- หน้าบัญชีสรุปยอด (4 คอลัมน์: คนลง, รายการ, สรุป, วันที่) --- */}
      {view === 'SUMMARY' && (
        <div>
          <button onClick={() => setView('MAIN')} style={styles.backLink}>← กลับหน้าหลัก</button>
          <h2 style={styles.pageTitle}>👑 บัญชีสรุปยอด</h2>
          
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
                {/* แถวตัวอย่างเมื่อยูสเซอร์ปัจจุบันลงข้อมูล */}
                <tr style={styles.tr}>
                  <td style={styles.td}>{currentUser}</td>
                  <td style={styles.td}>รายการล่าสุด</td>
                  <td style={styles.td}>...</td>
                  <td style={styles.td}>06/03</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// --- หน้าจอ Login (เรียก Password กลับมาแล้ว!) ---
function LoginScreen({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  return (
    <div style={styles.loginContainer}>
      <h1 style={styles.brandTitle}>HAUS IZAKAYA</h1>
      <div style={styles.formGroup}>
        <input style={styles.loginInput} placeholder="USERNAME" onChange={(e) => setU(e.target.value)} />
        <input style={styles.loginInput} type="password" placeholder="PASSWORD" onChange={(e) => setP(e.target.value)} />
        <button onClick={() => onLogin(u, p)} style={styles.loginBtn}>LOGIN</button>
      </div>
    </div>
  );
}

// --- CSS Styles (รีดให้เพรียว ไม่ล้นจอ S25 Ultra) ---
const styles = {
  appContainer: { backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '12px', color: '#fff', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' },
  headerBrand: { color: '#E6C068', fontSize: '12px', fontWeight: '900', fontFamily: "'Noto Serif JP', serif" },
  headerInfo: { fontSize: '9px', color: '#666' },
  loginContainer: { backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  brandTitle: { color: '#E6C068', fontSize: '26px', fontWeight: '900', fontFamily: "'Noto Serif JP', serif", marginBottom: '30px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px', width: '240px' },
  loginInput: { padding: '12px', backgroundColor: '#111', border: '1px solid #333', color: '#E6C068', borderRadius: '6px', textAlign: 'center', outline: 'none' },
  loginBtn: { padding: '12px', background: 'linear-gradient(135deg, #E6C068, #C9A227)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold' },
  menuWrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  mainBtn: { padding: '18px', backgroundColor: '#151515', color: '#E6C068', border: '1px solid #333', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' },
  summaryBtnMain: { padding: '18px', backgroundColor: 'transparent', color: '#C9A227', border: '1px solid #C9A227', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' },
  logoutBtn: { marginTop: '20px', background: 'none', border: 'none', color: '#444', fontSize: '11px', textDecoration: 'underline' },
  pageTitle: { color: '#E6C068', fontSize: '16px', textAlign: 'center', marginBottom: '15px' },
  backLink: { background: 'none', border: 'none', color: '#555', fontSize: '11px', marginBottom: '5px' },
  actionGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  actionBtn: { padding: '14px', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' },
  tableWrapper: { overflowX: 'auto', borderRadius: '8px', border: '1px solid #222' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '11px', tableLayout: 'fixed' },
  th: { padding: '10px 5px', textAlign: 'left', color: '#666', borderBottom: '1px solid #222' },
  td: { padding: '10px 5px', borderBottom: '1px solid #111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
};
