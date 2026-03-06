import React, { useState, useEffect } from "react";

/* ---------------- MAIN APP ---------------- */

export default function App() {

  const [session,setSession] = useState(null)

  if(!session){
    return <LoginScreen onLogin={setSession}/>
  }

  return(
    <div>
      <Header user={session.name} logout={()=>setSession(null)}/>

      {session.role === "ADMIN"
        ? <AdminSection/>
        : <StaffSection user={session.name}/>
      }
    </div>
  )
}

/* ---------------- LOGIN ---------------- */

function LoginScreen({onLogin}){

  const [name,setName] = useState("")

  const login=()=>{
    const role = name.toUpperCase()==="ADMIN_HAUS" ? "ADMIN" : "USER"
    onLogin({name:name.toUpperCase(),role})
  }

  return(
    <div style={styles.container}>
      <h1 style={styles.brand}>HAUS IZAKAYA</h1>

      <input
      style={styles.input}
      placeholder="USERNAME"
      onChange={(e)=>setName(e.target.value)}
      />

      <button style={styles.btnGold} onClick={login}>
      LOGIN
      </button>
    </div>
  )
}

/* ---------------- HEADER ---------------- */

function Header({user,logout}){

  return(
    <div style={styles.header}>
      <b>HAUS IZAKAYA</b>

      <div>
        <span style={{fontSize:10,marginRight:10}}>
        USER: {user}
        </span>

        <button style={styles.smallBtn} onClick={logout}>
        OUT
        </button>
      </div>
    </div>
  )
}

/* ---------------- STAFF ---------------- */

function StaffSection({user}){

  const [page,setPage] = useState("menu")

  if(page==="update"){
    return <UpdateStock back={()=>setPage("menu")} user={user}/>
  }

  if(page==="history"){
    return <HistoryPage back={()=>setPage("menu")}/>
  }

  return(
    <div style={styles.container}>

      <h2 style={styles.title}>STAFF MENU</h2>

      <button
      style={styles.btn}
      onClick={()=>setPage("update")}
      >
      📝 บันทึกจำนวนของ
      </button>

      <button
      style={styles.btn}
      onClick={()=>setPage("history")}
      >
      📊 ดูประวัติ 7 วัน
      </button>

    </div>
  )
}

/* ---------------- ADMIN ---------------- */

function AdminSection(){

  return(
    <div style={styles.container}>

      <h2 style={styles.title}>ADMIN DASHBOARD</h2>

      <button style={styles.btnGold}>
      💰 รายงานสรุป
      </button>

      <button style={styles.btn}>
      👥 จัดการพนักงาน
      </button>

      <button style={styles.btn}>
      📦 Standard Stock
      </button>

    </div>
  )
}

/* ---------------- UPDATE STOCK ---------------- */

function UpdateStock({back,user}){

  const [item,setItem] = useState("")
  const [qty,setQty] = useState("")

  const save=()=>{

    const data = JSON.parse(localStorage.getItem("haus_stock")||"[]")

    data.push({
      item,
      qty,
      user,
      date:new Date().toISOString()
    })

    localStorage.setItem("haus_stock",JSON.stringify(data))

    alert("บันทึกแล้ว")

    setItem("")
    setQty("")
  }

  return(
    <div style={styles.container}>

      <h2 style={styles.title}>UPDATE STOCK</h2>

      <input
      style={styles.input}
      placeholder="ITEM"
      value={item}
      onChange={(e)=>setItem(e.target.value)}
      />

      <input
      style={styles.input}
      placeholder="QTY"
      value={qty}
      onChange={(e)=>setQty(e.target.value)}
      />

      <button style={styles.btnGold} onClick={save}>
      SAVE
      </button>

      <button style={styles.smallBtn} onClick={back}>
      BACK
      </button>

    </div>
  )
}

/* ---------------- HISTORY ---------------- */

function HistoryPage({back}){

  const [data,setData] = useState([])

  useEffect(()=>{

    const all = JSON.parse(localStorage.getItem("haus_stock")||"[]")

    const seven = new Date()
    seven.setDate(seven.getDate()-7)

    const filtered = all.filter(x=>new Date(x.date)>=seven)

    setData(filtered.reverse())

  },[])

  return(
    <div style={styles.container}>

      <h2 style={styles.title}>ALL - 7 DAYS HISTORY</h2>

      {data.length===0 && (
        <p style={{color:"#888"}}>ไม่พบข้อมูลย้อนหลัง 7 วัน</p>
      )}

      {data.map((x,i)=>(
        <div key={i} style={styles.card}>
          <b>{x.item}</b> | {x.qty}
          <div style={{fontSize:10}}>
            {x.user}
          </div>
        </div>
      ))}

      <button style={styles.smallBtn} onClick={back}>
      BACK TO MENU
      </button>

    </div>
  )
}

/* ---------------- STYLES ---------------- */

const styles={

container:{
background:"#0a0a0a",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
gap:10
},

brand:{
color:"#E6C068",
fontSize:24
},

title:{
color:"#E6C068",
fontSize:16
},

input:{
padding:10,
width:220,
background:"#111",
border:"1px solid #333",
color:"#E6C068"
},

btn:{
padding:16,
width:240,
background:"#151515",
border:"1px solid #333",
color:"#E6C068"
},

btnGold:{
padding:16,
width:240,
background:"#C9A227",
border:"none",
color:"#000",
fontWeight:"bold"
},

smallBtn:{
marginTop:10,
padding:6,
background:"transparent",
border:"1px solid #444",
color:"#888"
},

header:{
position:"fixed",
top:0,
left:0,
right:0,
height:40,
background:"#000",
color:"#E6C068",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 10px",
borderBottom:"1px solid #222"
},

card:{
border:"1px solid #333",
padding:10,
width:240,
color:"#E6C068"
}

    }
