/* โค้ดสะพานใหม่ 2026 - สว่างไสว เข้าได้แน่นอน */
import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('MAIN');
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  // ฟังก์ชันล็อกอิน (ใช้ชื่อไหน โชว์ชื่อนั้น ไม่มโน)
  const handleLogin = (u, p) => {
    if (!u || !p) return alert("กรุณาใส่ Username และ Password");
    setUser(u.toUpperCase());
    setIsLogin(true);
  };

  if (!isLogin) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.brand}>HAUS IZAKAYA</div>
        <div style={styles.user}>👤 {user}</div>
      </header>

      {view === 'MAIN' && (
        <div style={styles.menuBox}>
          <button onClick={() => setView('BAR')} style={styles.btn}>🍺 สต็อกบาร์</button>
          <button onClick={() => setView('KITCHEN')} style={styles.btn}>🍳 สต็อกครัว</button>
          <button onClick={() => setView('SUMMARY')} style={styles.btnGold}>📊 วิว สต็อกซิสเต็ม</button>
          <button onClick={() => setIsLogin(false)} style={styles.btnLogout}>LOGOUT</button>
        </div>
      )}

      {/* ปุ่มกดกลับหน้าหลัก */}
      {view !== 'MAIN' && (
        <div style={{padding: '10px'}}>
          <button onClick={() => setView('MAIN')} style={styles.back}>← กลับหน้าหลัก</button>
          <h2 style={{textAlign:'center', color:'#E6C068'}}>{view} SYSTEM</h2>
          {/* ข้อมูลจะตามมาในขั้นตอนถัดไป */}
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  return (
    <div style={styles.loginPage}>
      <h1 style={styles.title}>HAUS IZAKAYA</h1>
      <input style={styles.input} placeholder="USERNAME" onChange={e => setU(e.target.value)} />
      <input style={styles.input} type="password" placeholder="PASSWORD" onChange={e => setP(e.target.value)} />
      <button style={styles.loginBtn} onClick={() => onLogin(u, p)}>ENTER</button>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #222' },
  brand: { color: '#E6C068', fontWeight: 'bold' },
  user: { fontSize: '12px', color: '#888' },
  loginPage: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  title: { color: '#E6C068', marginBottom: '30px', fontSize: '28px' },
  input: { padding: '12px', marginBottom: '10px', width: '250px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' },
  loginBtn: { padding: '12px', width: '276px', backgroundColor: '#E6C068', border: 'none', borderRadius: '5px', fontWeight: 'bold' },
  menuBox: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' },
  btn: { padding: '20px', backgroundColor: '#151515', color: '#E6C068', border: '1px solid #333', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold' },
  btnGold: { padding: '20px', backgroundColor: 'transparent', color: '#E6C068', border: '2px solid #E6C068', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold' },
  btnLogout: { marginTop: '20px', color: '#444', background: 'none', border: 'none', textDecoration: 'underline' },
  back: { color: '#666', background: 'none', border: 'none', marginBottom: '10px' }
};
