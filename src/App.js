import React, { useState, useEffect } from 'react';

const USERS = [
  { id: 1, name: 'رأفت', email: 'rafat@familia-alawar.com', password: 'Rafat1983', emoji: '👨', role: 'الأب' },
  { id: 2, name: 'نور', email: 'noor@familia-alawar.com', password: 'Esposa2024', emoji: '👩', role: 'الأم' },
  { id: 3, name: 'جود', email: 'yud@familia-alawar.com', password: 'Hijo2024', emoji: '👦', role: 'الابن' },
];

const C = { bg: '#333333', header: '#c0392b', btn: '#c0392b', surface: '#3d3d3d', border: 'rgba(255,255,255,0.08)' };

const s = {
  input: { background: '#444', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: { background: '#c0392b', border: 'none', color: '#fff', padding: '13px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700, width: '100%' },
  card: { background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' },
  cardHeader: { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#383838' },
};

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const syria = now.toLocaleTimeString('ar-SY', { timeZone: 'Asia/Damascus', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const cr = now.toLocaleTimeString('es-CR', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('ar', { timeZone: 'Asia/Damascus', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div style={{ background: '#2a2a2a', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
        <span>🇸🇾</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>سوريا:</span><span style={{ color: '#fff', fontWeight: 600 }}>{syria}</span>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{date}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
        <span>🇨🇷</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>كوستاريكا:</span><span style={{ color: '#fff', fontWeight: 600 }}>{cr}</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ background: '#2a2a2a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', textAlign: 'center', fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
      جميع الحقوق محفوظة © 2026 — Familia Alawar 🏠
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

const MEMBERS = [
  { name: 'رأفت', emoji: '👨', status: 'online', location: 'المنزل' },
  { name: 'نور', emoji: '👩', status: 'online', location: 'السوق' },
  { name: 'جود', emoji: '👦', status: 'away', location: 'المدرسة' },
  { name: 'البنت', emoji: '👧', status: 'online', location: 'المنزل' },
];

const MAP_PINS = [
  { emoji: '👨', name: 'رأفت', top: '45%', right: '50%', color: '#2ecc71' },
  { emoji: '👩', name: 'نور', top: '30%', right: '25%', color: '#2ecc71' },
  { emoji: '👦', name: 'جود', top: '60%', right: '70%', color: '#f39c12' },
  { emoji: '👧', name: 'البنت', top: '50%', right: '45%', color: '#2ecc71' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [page, setPage] = useState('home');
  const [sosActive, setSosActive] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'نور', text: 'وصلت السوق 🛒', time: '10:30' },
    { id: 2, sender: 'رأفت', text: 'تمام، خذي اللي تحتاجين ✅', time: '10:31' },
    { id: 3, sender: 'جود', text: 'أنا في المدرسة 📚', time: '08:00' },
  ]);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, name: 'رأفت', emoji: '👨', text: 'أهلاً بالجميع في موقع عائلتنا! 🏠❤️', time: 'منذ ساعة' },
    { id: 2, name: 'نور', emoji: '👩', text: 'العشاء جاهز الساعة 7 مساءً 🍽️', time: 'منذ ساعتين' },
  ]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [chatRoom, setChatRoom] = useState('group');
  const [replyTo, setReplyTo] = useState(null);

  const handleLogin = () => {
    const found = USERS.find(u => u.email === loginData.email && u.password === loginData.password);
    if (found) { setUser(found); setLoginError(''); }
    else setLoginError('❌ إيميل أو كلمة مرور غلط!');
  };
  // eslint-disable-next-line
  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: user.name, text: msg, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg(''); 
  };

  const addPost = () => {
    if (!postText.trim()) return;
    setPosts([{ id: Date.now(), name: user.name, emoji: user.emoji, text: postText, time: 'الآن' }, ...posts]);
    setPostText('');
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setPhotos(prev => [...prev, { id: Date.now() + Math.random(), src: ev.target.result, name: file.name, uploader: user.name, time: 'الآن' }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setVideos(prev => [...prev, { id: Date.now() + Math.random(), src: url, name: file.name, uploader: user.name, time: 'الآن' }]);
    });
  };

  // LOGIN
  if (!user) {
    return (
      <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: C.header, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 20 }}>Familia Alawar</span>
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, opacity: 0.85 }}>🔒 موقع خاص</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
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
        <Footer />
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>

      {sosActive && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#3d3d3d', border: '2px solid #c0392b', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 400, boxShadow: '0 0 60px rgba(192,57,43,0.5)' }}>
            <div style={{ fontSize: 60 }}>🆘</div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', color: '#c0392b', fontSize: 28, margin: '16px 0' }}>حالة طوارئ!</h2>
            <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>تم إرسال موقع {user.name} لجميع أفراد العائلة فوراً</p>
            <button onClick={() => setSosActive(false)} style={{ background: '#c0392b', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>إلغاء الطوارئ</button>
          </div>
        </div>
      )}

      <Clock />

      <div style={{ background: C.header, padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16 }}>Familia Alawar</span>
        </div>
        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, opacity: 0.9 }}>أهلاً {user.name} {user.emoji}</div>
        <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>خروج 🚪</button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>

        <div style={{ width: 200, background: '#2d2d2d', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '16px 0', flexShrink: 0 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setPage(n.id); if (n.id === 'sos') setSosActive(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', background: page === n.id ? 'rgba(192,57,43,0.2)' : 'transparent', border: 'none', borderRight: page === n.id ? '3px solid #c0392b' : '3px solid transparent', color: page === n.id ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: page === n.id ? 700 : 400, textAlign: 'right', width: '100%' }}>
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>

          {/* HOME */}
          {page === 'home' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🏠 الصفحة الرئيسية</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'أفراد العائلة', value: '4', icon: '👨‍👩‍👧‍👦' },
                  { label: 'متصلون الآن', value: '3', icon: '🟢' },
                  { label: 'صور مشتركة', value: photos.length.toString(), icon: '📸' },
                  { label: 'رسائل جديدة', value: '2', icon: '💬' },
                ].map((stat, i) => (
                  <div key={i} style={{ ...s.card, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 28, fontWeight: 700, color: '#c0392b' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div style={s.card}>
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>👨‍👩‍👧‍👦 أفراد العائلة</span></div>
                  {MEMBERS.map((m, i) => (
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
                    </div>
                  ))}
                  <div style={{ padding: 12 }}>
                    <button onClick={() => setPage('chat')} style={{ ...s.btn, padding: '8px', fontSize: 13 }}>فتح الدردشة</button>
                  </div>
                </div>
              </div>
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🗺️ مواقع العائلة</span>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: '#2ecc71' }}>● مباشر</span>
                </div>
                <div style={{ height: 300, background: '#2d2d2d', position: 'relative', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                  {MAP_PINS.map((p, i) => (
                    <div key={i} style={{ position: 'absolute', top: p.top, right: p.right, textAlign: 'center', transform: 'translate(50%, -50%)' }}>
                      <div style={{ width: 44, height: 44, background: '#3d3d3d', border: `2px solid ${p.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto' }}>{p.emoji}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, background: 'rgba(0,0,0,0.7)', borderRadius: 6, padding: '2px 8px', marginTop: 4 }}>{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {page === 'photos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📸 الصور</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="image/*" multiple id="photoUpload" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                <label htmlFor="photoUpload" style={{ display: 'inline-block', background: '#c0392b', color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>
                  + رفع صورة
                </label>
              </div>
              {photos.length === 0 ? (
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📸</div>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)' }}>لا توجد صور بعد — ارفع أول صورة!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {photos.map(p => (
                    <div key={p.id} style={s.card}>
                      <img src={p.src} alt={p.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                      <div style={{ padding: '10px 14px' }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{p.uploader}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{p.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIDEOS */}
          {page === 'videos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🎥 الفيديو</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="video/*" multiple id="videoUpload" style={{ display: 'none' }} onChange={handleVideoUpload} />
                <label htmlFor="videoUpload" style={{ display: 'inline-block', background: '#c0392b', color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>
                  + رفع فيديو
                </label>
              </div>
              {videos.length === 0 ? (
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>🎥</div>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)' }}>لا توجد فيديوهات بعد — ارفع أول فيديو!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {videos.map(v => (
                    <div key={v.id} style={s.card}>
                      <video src={v.src} controls style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                      <div style={{ padding: '10px 14px' }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{v.uploader}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{v.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* POSTS */}
          {page === 'posts' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📝 المنشورات</h2>
              <div style={{ ...s.card, marginBottom: 16 }}>
                <div style={{ padding: 20 }}>
                  <textarea placeholder="شارك شيئاً مع العائلة..." value={postText} onChange={e => setPostText(e.target.value)} style={{ ...s.input, height: 100, resize: 'none', marginBottom: 12 }} />
                  <button onClick={addPost} style={{ ...s.btn, width: 'auto', padding: '10px 24px' }}>نشر ✓</button>
                </div>
              </div>
              {posts.map((p, i) => (
                <div key={i} style={{ ...s.card, marginBottom: 12 }}>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.emoji}</div>
                      <div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{p.name}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{p.time}</div>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

{/* CHAT */}
{page === 'chat' && (
  <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, height: 600 }}>
    
    {/* قائمة المحادثات */}
    <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
      <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>💬 المحادثات</span></div>
      
      {/* المجموعة */}
      <div onClick={() => setChatRoom('group')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: chatRoom === 'group' ? 'rgba(192,57,43,0.2)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: chatRoom === 'group' ? '3px solid #c0392b' : '3px solid transparent' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍👩‍👧‍👦</div>
        <div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>المجموعة العائلية</div>
          <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>الكل</div>
        </div>
      </div>

      {/* محادثات خاصة */}
      {MEMBERS.filter(m => m.name !== user.name).map((m, i) => (
        <div key={i} onClick={() => setChatRoom(m.name)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: chatRoom === m.name ? 'rgba(192,57,43,0.2)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: chatRoom === m.name ? '3px solid #c0392b' : '3px solid transparent' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${m.status === 'online' ? '#2ecc71' : '#f39c12'}` }}>{m.emoji}</div>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{m.name}</div>
            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: m.status === 'online' ? '#2ecc71' : '#f39c12' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
          </div>
        </div>
      ))}
    </div>

    {/* نافذة الدردشة */}
    <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
      <div style={s.cardHeader}>
        <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
          {chatRoom === 'group' ? '👨‍👩‍👧‍👦 المجموعة العائلية' : `💬 ${chatRoom}`}
        </span>
      </div>

      {/* الرسائل */}
      <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.filter(m => chatRoom === 'group' ? m.room === 'group' || !m.room : (m.room === chatRoom && (m.sender === user.name || m.to === user.name))).map(m => (
          <div key={m.id}>
            {/* رد على رسالة */}
            {replyTo && replyTo.id === m.id && (
              <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, padding: '4px 10px', marginBottom: 4, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'Tajawal, sans-serif' }}>
                ↩️ رد على: {m.text}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: m.sender === user.name ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                {MEMBERS.find(mb => mb.name === m.sender)?.emoji || '👤'}
              </div>
              <div style={{ maxWidth: '70%', position: 'relative' }}>
                {m.replyTo && (
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRight: '2px solid #c0392b', padding: '4px 8px', borderRadius: 6, marginBottom: 4, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Tajawal, sans-serif' }}>
                    ↩️ {m.replyTo}
                  </div>
                )}
                <div style={{ background: m.sender === user.name ? 'rgba(192,57,43,0.25)' : '#444', border: `1px solid ${m.sender === user.name ? 'rgba(192,57,43,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 14, padding: '8px 14px', fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{m.sender} · {m.time}</div>
                  {m.image && <img src={m.image} alt="صورة" style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 4 }} />}
                  {m.text}
                </div>
                {/* أزرار الرد والحذف */}
                <div style={{ display: 'flex', gap: 4, marginTop: 3, justifyContent: m.sender === user.name ? 'flex-start' : 'flex-end' }}>
                  <button onClick={() => setReplyTo(m)}
                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, fontFamily: 'Tajawal, sans-serif', padding: '2px 6px' }}>
                    ↩️ رد
                  </button>
                  {m.sender === user.name && (
                    <button onClick={() => setMessages(prev => prev.filter(x => x.id !== m.id))}
                      style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, fontFamily: 'Tajawal, sans-serif', padding: '2px 6px' }}>
                      🗑️ حذف
                    </button>
                  )}
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '2px 6px' }}>✅</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* رد على رسالة */}
      {replyTo && (
        <div style={{ padding: '8px 16px', background: 'rgba(192,57,43,0.1)', borderTop: '1px solid rgba(192,57,43,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>↩️ رد على: {replyTo.text?.substring(0, 30)}...</span>
          <button onClick={() => setReplyTo(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
      )}

      {/* إيموجي */}
      <div style={{ padding: '6px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6 }}>
        {['😊','😂','❤️','👍','🎉','😢','😮','🙏','👋','🔥'].map(emoji => (
          <button key={emoji} onClick={() => setMsg(prev => prev + emoji)}
            style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', padding: '3px' }}>
            {emoji}
          </button>
        ))}
      </div>

      {/* حقل الإرسال */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="file" accept="image/*" id="chatImage" style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
              setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: '', image: ev.target.result, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
            };
            reader.readAsDataURL(file);
          }}
        />
        <label htmlFor="chatImage" style={{ width: 38, height: 38, background: '#444', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>📎</label>

        <input value={msg} onChange={e => setMsg(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (!msg.trim()) return;
              setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: msg, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, replyTo: replyTo ? replyTo.text?.substring(0, 50) : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
              setMsg('');
              setReplyTo(null);
            }
          }}
          placeholder={chatRoom === 'group' ? 'اكتب للمجموعة...' : `اكتب لـ ${chatRoom}...`}
          style={{ flex: 1, background: '#444', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 14, outline: 'none' }} />

        <button onClick={() => {
          if (!msg.trim()) return;
          setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: msg, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, replyTo: replyTo ? replyTo.text?.substring(0, 50) : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
          setMsg('');
          setReplyTo(null);
        }} style={{ width: 42, height: 42, background: '#c0392b', border: 'none', borderRadius: 10, color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
      </div>
    </div>
  </div>
)}

          {/* SOS */}
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
      <Footer />
    </div>
  );
}
