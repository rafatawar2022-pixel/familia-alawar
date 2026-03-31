import React, { useState, useEffect } from 'react';

const USERS = [
  { id: 1, name: 'رفعت', email: 'rafat@familia-alawar.com', password: 'Rafat1983', emoji: '👨', role: 'الأب' },
  { id: 2, name: 'الزوجة', email: 'esposa@familia-alawar.com', password: 'Esposa2024', emoji: '👩', role: 'الأم' },
  { id: 3, name: 'الابن', email: 'hijo@familia-alawar.com', password: 'Hijo2024', emoji: '👦', role: 'الابن' },
];

const C = {
  bg: '#333333',
  header: '#c0392b',
  btn: '#c0392b',
  surface: '#3d3d3d',
  surface2: '#444444',
  border: 'rgba(255,255,255,0.08)',
};

const s = {
  input: { background: '#444', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: { background: C.btn, border: 'none', color: '#fff', padding: '13px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700, width: '100%' },
  card: { background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' },
  cardHeader: { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#383838' },
};

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const syria = now.toLocaleTimeString('ar-SY', { timeZone: 'Asia/Damascus', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const cr = now.toLocaleTimeString('es-CR', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('ar', { timeZone: 'Asia/Damascus', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ background: '#2a2a2a', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
        <span>🇸🇾</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>سوريا:</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{syria}</span>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{date}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
        <span>🇨🇷</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>كوستاريكا:</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{cr}</span>
      </div>
    </div>
  );
}

const NAV = [
  { id: 'home', label: 'الرئيسية', icon: '🏠' },
  { id: 'photos', label: 'الصور', icon: '📸' },
  { id: 'videos', label: 'الفيديو', icon: '🎥' },
  { id: 'posts', label: 'المنشورات', icon: '📝' },
  { id: 'chat', label: 'الدردشة', icon: '💬' },
  { id: 'map', label: 'الخريطة', icon: '🗺️' },
  { id: 'sos', label: 'الطوارئ', icon: '🆘' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [page, setPage] = useState('home');
  const [sosActive, setSosActive] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'الأم', text: 'وصلت السوق 🛒', time: '10:30' },
    { id: 2, sender: 'رفعت', text: 'تمام، خذي اللي تحتاجين ✅', time: '10:31' },
    { id: 3, sender: 'الابن', text: 'أنا في المدرسة 📚', time: '08:00' },
  ]);

  const handleLogin = () => {
    const found = USERS.find(u => u.email === loginData.email && u.password === loginData.password);
    if (found) { setUser(found); setLoginError(''); }
    else setLoginError('❌ إيميل أو كلمة مرور غلط!');
  };

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: user.name, text: msg, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg('');
  };

  // LOGIN
  if (!user) {
    return (
      <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: 'rtl' }}>
        <div style={{ background: C.header, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 20 }}>Familia Alawar</span>
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, opacity: 0.85 }}>🔒 موقع خاص</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', padding: '40px 24px' }}>
          <img src="/logo.png" alt="Familia Alawar" style={{ width: 150, height: 150, borderRadius: 16, marginBottom: 20, objectFit: 'contain' }} />
          <h1 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 28, margin: '0 0 8px', textAlign: 'center' }}>أهلاً بكم في موقع عائلة Alawar</h1>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 40, textAlign: 'center' }}>منصة عائلية خاصة وآمنة</p>

          <div style={{ width: '100%', maxWidth: 400, background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ background: C.header, padding: '16px 24px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 18, margin: 0 }}>تسجيل الدخول</h2>
              <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, margin: '4px 0 0', opacity: 0.85 }}>للأعضاء المعتمدين فقط</p>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>الإيميل</label>
                <input type="email" placeholder="rafat@familia-alawar.com" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} style={s.input} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>كلمة المرور</label>
                <input type="password" placeholder="••••••••" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} onKeyPress={e => e.key === 'Enter' && handleLogin()} style={s.input} />
              </div>
              {loginError && <div style={{ background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 10, padding: '10px', color: '#ff6b6b', fontSize: 13, textAlign: 'center', marginBottom: 16, fontFamily: 'Tajawal, sans-serif' }}>{loginError}</div>}
              <button onClick={handleLogin} style={s.btn}>دخول ←</button>
            </div>
          </div>
          <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 24, textAlign: 'center' }}>🔒 غير مرخص للدخول لغير أفراد العائلة</p>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>

      {/* SOS MODAL */}
      {sosActive && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#3d3d3d', border: '2px solid #c0392b', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 400, boxShadow: '0 0 60px rgba(192,57,43,0.5)' }}>
            <div style={{ fontSize: 60, animation: 'pulse 1s infinite' }}>🆘</div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', color: '#c0392b', fontSize: 28, margin: '16px 0' }}>حالة طوارئ!</h2>
            <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>تم إرسال موقع {user.name} لجميع أفراد العائلة فوراً</p>
            <button onClick={() => setSosActive(false)} style={{ background: '#c0392b', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>إلغاء الطوارئ</button>
          </div>
        </div>
      )}

      {/* TOP BAR - التوقيت */}
      <Clock />

      {/* HEADER */}
      <div style={{ background: C.header, padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16 }}>Familia Alawar</span>
        </div>
        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, opacity: 0.9 }}>أهلاً {user.name} {user.emoji}</div>
        <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>خروج 🚪</button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* SIDEBAR */}
        <div style={{ width: 200, background: '#2d2d2d', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '16px 0', flexShrink: 0 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setPage(n.id); if (n.id === 'sos') setSosActive(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', background: page === n.id ? 'rgba(192,57,43,0.2)' : 'transparent', border: 'none', borderRight: page === n.id ? '3px solid #c0392b' : '3px solid transparent', color: page === n.id ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: page === n.id ? 700 : 400, textAlign: 'right', width: '100%', transition: 'all 0.2s' }}>
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>

          {/* HOME */}
          {page === 'home' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🏠 الصفحة الرئيسية</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'أفراد العائلة', value: '4', icon: '👨‍👩‍👧‍👦' },
                  { label: 'متصلون الآن', value: '3', icon: '🟢' },
                  { label: 'صور مشتركة', value: '12', icon: '📸' },
                  { label: 'رسائل جديدة', value: '2', icon: '💬' },
                ].map((stat, i) => (
                  <div key={i} style={{ ...s.card, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 28, fontWeight: 700, color: '#c0392b' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={s.card}>
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>👨‍👩‍👧‍👦 أفراد العائلة</span></div>
                  {[
                    { name: 'رفعت', role: 'الأب', emoji: '👨', status: 'online', location: 'المنزل' },
                    { name: 'الأم', role: 'الأم', emoji: '👩', status: 'online', location: 'السوق' },
                    { name: 'الابن', role: 'الابن', emoji: '👦', status: 'away', location: 'المدرسة' },
                    { name: 'البنت', role: 'البنت', emoji: '👧', status: 'online', location: 'المنزل' },
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${m.status === 'online' ? '#2ecc71' : '#f39c12'}` }}>{m.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📍 {m.location}</div>
                      </div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: m.status === 'online' ? '#2ecc71' : '#f39c12' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
                    </div>
                  ))}
                </div>
                <div style={s.card}>
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>💬 آخر الرسائل</span></div>
                  {messages.slice(-4).map(m => (
                    <div key={m.id} style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Tajawal, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#c0392b', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{m.sender}: </span>{m.text}
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginRight: 8 }}>{m.time}</span>
                    </div>
                  ))}
                  <div style={{ padding: 12 }}>
                    <button onClick={() => setPage('chat')} style={{ ...s.btn, padding: '8px', fontSize: 13 }}>فتح الدردشة</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {page === 'photos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📸 الصور</h2>
              <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>📸</div>
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>شارك ذكرياتك مع العائلة</p>
                <button style={{ ...s.btn, width: 'auto', padding: '12px 32px' }}>+ رفع صورة</button>
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {page === 'videos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🎥 الفيديو</h2>
              <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🎥</div>
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>شارك لحظاتك مع العائلة</p>
                <button style={{ ...s.btn, width: 'auto', padding: '12px 32px' }}>+ رفع فيديو</button>
              </div>
            </div>
          )}

          {/* POSTS */}
          {page === 'posts' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📝 المنشورات</h2>
              <div style={{ ...s.card, marginBottom: 16 }}>
                <div style={{ padding: 20 }}>
                  <textarea placeholder="شارك شيئاً مع العائلة..." style={{ ...s.input, height: 100, resize: 'none', marginBottom: 12 }} />
                  <button style={{ ...s.btn, width: 'auto', padding: '10px 24px' }}>نشر ✓</button>
                </div>
              </div>
              {[
                { name: 'رفعت', emoji: '👨', text: 'أهلاً بالجميع في موقع عائلتنا! 🏠❤️', time: 'منذ ساعة' },
                { name: 'الأم', emoji: '👩', text: 'العشاء جاهز الساعة 7 مساءً 🍽️', time: 'منذ ساعتين' },
              ].map((p, i) => (
                <div key={i} style={{ ...s.card, marginBottom: 12 }}>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.emoji}</div>
                      <div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{p.name}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{p.time}</div>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 15, lineHeight: 1.6 }}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CHAT */}
          {page === 'chat' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>💬 الدردشة العائلية</h2>
              <div style={{ ...s.card, display: 'flex', flexDirection: 'column', height: 500 }}>
                <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {messages.map(m => (
                    <div key={m.id} style={{ display: 'flex', flexDirection: m.sender === user.name ? 'row-reverse' : 'row', gap: 8 }}>
                      <div style={{ maxWidth: '75%', background: m.sender === user.name ? 'rgba(192,57,43,0.25)' : '#444', border: `1px solid ${m.sender === user.name ? 'rgba(192,57,43,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '8px 14px', fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{m.sender} · {m.time}</div>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 10 }}>
                  <input value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="اكتب رسالة..." style={{ flex: 1, background: '#444', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 14, outline: 'none' }} />
                  <button onClick={sendMessage} style={{ background: '#c0392b', border: 'none', borderRadius: 10, color: '#fff', padding: '0 18px', fontSize: 18, cursor: 'pointer' }}>←</button>
                </div>
              </div>
            </div>
          )}

          {/* MAP */}
          {page === 'map' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🗺️ خريطة العائلة</h2>
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>المواقع الحالية</span>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: '#2ecc71' }}>● مباشر</span>
                </div>
                <div style={{ height: 400, background: '#2d2d2d', position: 'relative', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                  {[
                    { emoji: '👨', name: 'رفعت', top: '45%', right: '50%', color: '#2ecc71' },
                    { emoji: '👩', name: 'الأم', top: '30%', right: '25%', color: '#2ecc71' },
                    { emoji: '👦', name: 'الابن', top: '60%', right: '70%', color: '#f39c12' },
                    { emoji: '👧', name: 'البنت', top: '50%', right: '45%', color: '#2ecc71' },
                  ].map((p, i) => (
                    <div key={i} style={{ position: 'absolute', top: p.top, right: p.right, textAlign: 'center', transform: 'translate(50%, -50%)' }}>
                      <div style={{ width: 48, height: 48, background: '#3d3d3d', border: `2px solid ${p.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto', boxShadow: `0 0 12px ${p.color}40` }}>{p.emoji}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, background: 'rgba(0,0,0,0.7)', borderRadius: 6, padding: '2px 8px', marginTop: 4 }}>{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SOS PAGE */}
          {page === 'sos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🆘 الطوارئ</h2>
              <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 15 }}>في حالة الطوارئ اضغط الزر لإرسال موقعك فوراً لجميع أفراد العائلة</p>
                <button onClick={() => setSosActive(true)} style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, #e74c3c, #c0392b)', border: '4px solid rgba(192,57,43,0.4)', color: 'white', fontSize: 32, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 40px rgba(192,57,43,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
                  <span>SOS</span>
                  <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8, fontFamily: 'Tajawal, sans-serif' }}>اضغط للطوارئ</span>
                </button>
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 24 }}>⚠️ استخدم فقط في حالات الطوارئ الحقيقية</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
