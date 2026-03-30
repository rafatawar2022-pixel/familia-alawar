import React, { useState } from 'react';

const COLORS = {
  bg: '#333333',
  header: '#c0392b',
  btn: '#c0392b',
  btnHover: '#a93226',
  white: '#ffffff',
  surface: '#3d3d3d',
  surface2: '#444444',
  border: 'rgba(255,255,255,0.1)',
};

const USERS = [
  { id: 1, name: 'رفعت', email: 'rafat@familia-alawar.com', password: 'Rafat1983', emoji: '👨', role: 'الأب' },
  { id: 2, name: 'الزوجة', email: 'esposa@familia-alawar.com', password: 'Esposa2024', emoji: '👩', role: 'الأم' },
  { id: 3, name: 'الابن', email: 'hijo@familia-alawar.com', password: 'Hijo2024', emoji: '👦', role: 'الابن' },
];

const members = [
  { id: 1, name: 'رفعت', role: 'الأب', emoji: '👨', status: 'online', location: 'المنزل', battery: 85 },
  { id: 2, name: 'الأم', role: 'الأم', emoji: '👩', status: 'online', location: 'السوق', battery: 62 },
  { id: 3, name: 'الابن', role: 'الابن', emoji: '👦', status: 'away', location: 'المدرسة', battery: 45 },
  { id: 4, name: 'البنت', role: 'البنت', emoji: '👧', status: 'online', location: 'المنزل', battery: 90 },
];

const emails = [
  { id: 1, from: 'الأم', subject: 'موعد العشاء 🍽️', preview: 'العشاء الساعة 7 مساءً...', time: '10:30', read: false, emoji: '👩' },
  { id: 2, from: 'الابن', subject: 'نتائج المدرسة 📚', preview: 'حصلت على علامة ممتازة...', time: '09:15', read: true, emoji: '👦' },
  { id: 3, from: 'رفعت', subject: 'رحلة عائلية 🏖️', preview: 'بدي أقترح رحلة...', time: 'أمس', read: true, emoji: '👨' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [page, setPage] = useState('dashboard');
  const [sos, setSos] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'الأم', text: 'وصلت السوق 🛒', time: '10:30' },
    { id: 2, sender: 'رفعت', text: 'تمام، خذي اللي تحتاجين ✅', time: '10:31' },
  ]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composing, setComposing] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });

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

  const s = {
    input: { background: '#444444', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' },
    btn: { background: COLORS.btn, border: 'none', color: '#fff', padding: '13px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700, width: '100%' },
    card: { background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' },
    cardHeader: { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#383838' },
    navBtn: (active) => ({ background: active ? COLORS.btn : 'transparent', border: active ? 'none' : '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 700 }),
  };

  // LOGIN PAGE
  if (!user) {
    return (
      <div style={{ fontFamily: 'Tajawal, sans-serif', background: COLORS.bg, minHeight: '100vh', color: '#fff', direction: 'rtl' }}>
        
        {/* Header أحمر */}
        <div style={{ background: COLORS.header, padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏠</div>
            <div>
              <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 22 }}>Familia Alawar</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>منصة الأمان العائلي</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, opacity: 0.9 }}>
            <span>🔒 موقع خاص</span>
            <span>👨‍👩‍👧‍👦 عائلة Alawar</span>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '60px 32px 40px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🏠</div>
          <h1 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 36, margin: '0 0 12px', color: '#fff' }}>
            أهلاً بكم في موقع عائلة Alawar
          </h1>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 40px' }}>
            منصة عائلية خاصة لتواصل أفراد العائلة ومتابعة أماكنهم والتواصل معهم بأمان
          </p>

          {/* Features */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 50 }}>
            {[
              { icon: '📍', title: 'تتبع المواقع', desc: 'اعرف مكان عائلتك دائماً' },
              { icon: '🆘', title: 'زر الطوارئ', desc: 'تنبيه فوري عند الحاجة' },
              { icon: '💬', title: 'دردشة عائلية', desc: 'تواصل مع عائلتك' },
              { icon: '📧', title: 'إيميل خاص', desc: 'رسائل داخلية آمنة' },
            ].map((f, i) => (
              <div key={i} style={{ background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 24px', width: 160, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Login Card */}
        <div style={{ maxWidth: 420, margin: '0 auto', padding: '0 24px 60px' }}>
          <div style={{ background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, overflow: 'hidden' }}>
            
            {/* Card Header */}
            <div style={{ background: COLORS.header, padding: '18px 24px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 18, margin: 0 }}>تسجيل الدخول</h2>
              <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, margin: '4px 0 0', opacity: 0.85 }}>للأعضاء المعتمدين فقط</p>
            </div>

            <div style={{ padding: 28 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 6, display: 'block' }}>الإيميل</label>
                <input type="email" placeholder="rafat@familia-alawar.com" value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })} style={s.input} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 6, display: 'block' }}>كلمة المرور</label>
                <input type="password" placeholder="••••••••" value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  onKeyPress={e => e.key === 'Enter' && handleLogin()} style={s.input} />
              </div>

              {loginError && (
                <div style={{ background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 10, padding: '10px 14px', color: '#ff6b6b', fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
                  {loginError}
                </div>
              )}

              <button onClick={handleLogin} style={s.btn}>دخول ←</button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }}></div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>أو</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }}></div>
              </div>

              <button onClick={() => {}} style={{ ...s.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                👆 الدخول ببصمة الإصبع
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 20 }}>
            🔒 موقع خاص بعائلة Alawar — غير مرخص للدخول لغير أفراد العائلة
          </p>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ fontFamily: 'Tajawal, sans-serif', background: COLORS.bg, minHeight: '100vh', color: '#fff', direction: 'rtl' }}>

      {sos && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#3d3d3d', border: '2px solid #c0392b', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 60 }}>🆘</div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', color: '#c0392b', fontSize: 28, margin: '16px 0' }}>حالة طوارئ!</h2>
            <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>تم إرسال موقع {user.name} لجميع أفراد العائلة</p>
            <button onClick={() => setSos(false)} style={{ background: '#c0392b', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>إلغاء الطوارئ</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: COLORS.header, padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏠</div>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16 }}>Familia Alawar</div>
            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, opacity: 0.85 }}>أهلاً {user.name} {user.emoji}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ id: 'dashboard', label: '🏠 الرئيسية' }, { id: 'email', label: '📧 الإيميل' }, { id: 'chat', label: '💬 الدردشة' }].map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={s.navBtn(page === n.id)}>{n.label}</button>
          ))}
        </div>
        <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>
          خروج 🚪
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>

        {/* DASHBOARD */}
        {page === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'أفراد العائلة', value: '4', icon: '👨‍👩‍👧‍👦', color: '#fff' },
                { label: 'متصلون الآن', value: '3', icon: '🟢', color: '#2ecc71' },
                { label: 'مناطق آمنة', value: '2', icon: '📍', color: '#fff' },
                { label: 'تنبيهات اليوم', value: '0', icon: '🔔', color: '#fff' },
              ].map((stat, i) => (
                <div key={i} style={{ ...s.card, padding: 20 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 32, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={s.card}>
                  <div style={s.cardHeader}>
                    <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🗺️ خريطة العائلة</span>
                    <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: '#2ecc71' }}>● مباشر</span>
                  </div>
                  <div style={{ height: 280, background: '#2d2d2d', position: 'relative', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    {[
                      { emoji: '👨', name: 'رفعت', top: '45%', right: '50%', color: '#2ecc71' },
                      { emoji: '👩', name: 'الأم', top: '30%', right: '25%', color: '#2ecc71' },
                      { emoji: '👦', name: 'الابن', top: '60%', right: '70%', color: '#f39c12' },
                      { emoji: '👧', name: 'البنت', top: '50%', right: '45%', color: '#2ecc71' },
                    ].map((p, i) => (
                      <div key={i} style={{ position: 'absolute', top: p.top, right: p.right, textAlign: 'center', transform: 'translate(50%, -50%)' }}>
                        <div style={{ width: 44, height: 44, background: '#3d3d3d', border: `2px solid ${p.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto' }}>{p.emoji}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, background: 'rgba(0,0,0,0.7)', borderRadius: 6, padding: '2px 8px', marginTop: 4 }}>{p.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={s.card}>
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>👨‍👩‍👧‍👦 أفراد العائلة</span></div>
                  {members.map(m => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `2px solid ${m.status === 'online' ? '#2ecc71' : '#f39c12'}` }}>{m.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📍 {m.location}</div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: m.status === 'online' ? '#2ecc71' : '#f39c12' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>🔋 {m.battery}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ ...s.card, padding: 24, textAlign: 'center' }}>
                  <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20 }}>🆘 زر الطوارئ</h3>
                  <button onClick={() => setSos(true)} style={{ width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle, #e74c3c, #c0392b)', border: '4px solid rgba(192,57,43,0.4)', color: 'white', fontSize: 28, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 30px rgba(192,57,43,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
                    <span>SOS</span>
                    <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8, fontFamily: 'Tajawal, sans-serif' }}>اضغط للطوارئ</span>
                  </button>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 16 }}>يرسل موقعك فوراً للعائلة</p>
                </div>

                <div style={{ ...s.card, flex: 1 }}>
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>💬 آخر الرسائل</span></div>
                  {messages.slice(-3).map(m => (
                    <div key={m.id} style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Tajawal, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#c0392b', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{m.sender}: </span>{m.text}
                    </div>
                  ))}
                  <div style={{ padding: 12 }}>
                    <button onClick={() => setPage('chat')} style={{ ...s.btn, fontSize: 13, padding: '8px' }}>فتح الدردشة</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMAIL */}
        {page === 'email' && (
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
            <div style={s.card}>
              <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>📧 الإيميل</span></div>
              <div style={{ padding: 12 }}>
                <button onClick={() => { setComposing(true); setSelectedEmail(null); }} style={{ ...s.btn, marginBottom: 12, padding: '10px' }}>✏️ رسالة جديدة</button>
                {[{ label: '📥 الوارد', count: 1 }, { label: '📤 المرسل', count: 0 }, { label: '⭐ المهم', count: 0 }, { label: '🗑️ المحذوف', count: 0 }].map((f, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, cursor: 'pointer', color: '#fff', background: i === 0 ? 'rgba(192,57,43,0.2)' : 'transparent', marginBottom: 4, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
                    <span>{f.label}</span>
                    {f.count > 0 && <span style={{ background: '#c0392b', color: 'white', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{f.count}</span>}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px' }}>
                <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>حسابات العائلة</div>
                {[{ name: 'رفعت', email: 'rafat@familia-alawar.com', emoji: '👨' }, { name: 'الزوجة', email: 'esposa@familia-alawar.com', emoji: '👩' }, { name: 'الابن', email: 'hijo@familia-alawar.com', emoji: '👦' }].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                    <span style={{ fontSize: 18 }}>{a.emoji}</span>
                    <div>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12 }}>{a.name}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{a.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.card}>
              {composing ? (
                <div>
                  <div style={s.cardHeader}>
                    <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>✏️ رسالة جديدة</span>
                    <button onClick={() => setComposing(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>✕</button>
                  </div>
                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input placeholder="إلى..." value={newEmail.to} onChange={e => setNewEmail({ ...newEmail, to: e.target.value })} style={s.input} />
                    <input placeholder="الموضوع..." value={newEmail.subject} onChange={e => setNewEmail({ ...newEmail, subject: e.target.value })} style={s.input} />
                    <textarea placeholder="اكتب رسالتك..." value={newEmail.body} onChange={e => setNewEmail({ ...newEmail, body: e.target.value })} style={{ ...s.input, height: 200, resize: 'none' }} />
                    <button onClick={() => { setComposing(false); setNewEmail({ to: '', subject: '', body: '' }); }} style={s.btn}>إرسال ✈️</button>
                  </div>
                </div>
              ) : selectedEmail ? (
                <div>
                  <div style={s.cardHeader}>
                    <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{selectedEmail.subject}</span>
                    <button onClick={() => setSelectedEmail(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>✕</button>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{selectedEmail.emoji}</div>
                      <div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{selectedEmail.from}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{selectedEmail.time}</div>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Tajawal, sans-serif', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>رسالة من {selectedEmail.from} بخصوص: {selectedEmail.subject}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>📥 صندوق الوارد</span></div>
                  {emails.map(e => (
                    <div key={e.id} onClick={() => setSelectedEmail(e)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{e.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: e.read ? 400 : 700, fontSize: 14 }}>{e.from}</span>
                          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{e.time}</span>
                        </div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, marginBottom: 2 }}>{e.subject}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{e.preview}</div>
                      </div>
                      {!e.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c0392b' }}></div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHAT */}
        {page === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
            <div style={s.card}>
              <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>👨‍👩‍👧‍👦 العائلة</span></div>
              {members.map(m => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${m.status === 'online' ? '#2ecc71' : '#f39c12'}` }}>{m.emoji}</div>
                  <div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{m.name}</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: m.status === 'online' ? '#2ecc71' : '#f39c12' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
              <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>💬 مجموعة Familia Alawar</span></div>
              <div style={{ flex: 1, padding: 16, overflowY: 'auto', maxHeight: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: m.sender === user.name ? 'row-reverse' : 'row', gap: 8 }}>
                    <div style={{ maxWidth: '75%', background: m.sender === user.name ? 'rgba(192,57,43,0.25)' : '#444', border: `1px solid ${m.sender === user.name ? 'rgba(192,57,43,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '8px 12px', fontFamily: 'Tajawal, sans-serif', fontSize: 13 }}>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{m.sender} · {m.time}</div>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
                <input value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()}
                  placeholder="اكتب رسالة..." style={{ flex: 1, background: '#444', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 12px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 13, outline: 'none' }} />
                <button onClick={sendMessage} style={{ width: 38, height: 38, background: '#c0392b', border: 'none', borderRadius: 10, color: '#fff', fontSize: 16, cursor: 'pointer' }}>←</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}