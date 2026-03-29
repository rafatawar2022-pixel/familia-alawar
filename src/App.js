import React, { useState } from 'react';

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

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'رفعت', text: msg, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg('');
  };

  const styles = {
    app: { fontFamily: 'Tajawal, sans-serif', background: '#070b14', minHeight: '100vh', color: '#f1f5f9', direction: 'rtl' },
    header: { background: '#0c1220', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    nav: { display: 'flex', gap: 8 },
    navBtn: (active) => ({ background: active ? 'rgba(56,189,248,0.1)' : 'transparent', border: active ? '1px solid rgba(56,189,248,0.3)' : '1px solid transparent', color: active ? '#38bdf8' : '#64748b', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 14, fontWeight: 600 }),
    content: { maxWidth: 1200, margin: '0 auto', padding: 24 },
    card: { background: '#0c1220', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' },
    cardHeader: { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  };

  return (
    <div style={styles.app}>

      {/* SOS MODAL */}
      {sos && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#1a0a0a', border: '2px solid #ef4444', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 60 }}>🆘</div>
            <h2 style={{ color: '#ef4444', fontSize: 28, margin: '16px 0' }}>حالة طوارئ!</h2>
            <p style={{ color: '#fca5a5', marginBottom: 24 }}>تم إرسال موقعك لجميع أفراد العائلة</p>
            <button onClick={() => setSos(false)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'Tajawal, sans-serif' }}>
              إلغاء الطوارئ
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #38bdf8, #a78bfa)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏠</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Familia Alawar</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>لوحة التحكم العائلية</div>
          </div>
        </div>
        <div style={styles.nav}>
          {[
            { id: 'dashboard', label: '🏠 الرئيسية' },
            { id: 'email', label: '📧 الإيميل' },
            { id: 'chat', label: '💬 الدردشة' },
          ].map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={styles.navBtn(page === n.id)}>{n.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, background: '#34d399', borderRadius: '50%' }}></div>
          <span style={{ color: '#34d399', fontSize: 13, fontWeight: 600 }}>كل الأفراد بأمان</span>
        </div>
      </div>

      <div style={styles.content}>

        {/* DASHBOARD PAGE */}
        {page === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'أفراد العائلة', value: '4', icon: '👨‍👩‍👧‍👦', color: '#38bdf8' },
                { label: 'متصلون الآن', value: '3', icon: '🟢', color: '#34d399' },
                { label: 'مناطق آمنة', value: '2', icon: '📍', color: '#a78bfa' },
                { label: 'تنبيهات اليوم', value: '0', icon: '🔔', color: '#fbbf24' },
              ].map((s, i) => (
                <div key={i} style={{ ...styles.card, padding: 20 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={{ fontWeight: 700 }}>🗺️ خريطة العائلة</span>
                    <span style={{ fontSize: 12, color: '#34d399' }}>● مباشر</span>
                  </div>
                  <div style={{ height: 280, background: '#111827', position: 'relative', backgroundImage: 'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    {[
                      { emoji: '👨', name: 'رفعت', top: '45%', right: '50%', color: '#34d399' },
                      { emoji: '👩', name: 'الأم', top: '30%', right: '25%', color: '#34d399' },
                      { emoji: '👦', name: 'الابن', top: '60%', right: '70%', color: '#fbbf24' },
                      { emoji: '👧', name: 'البنت', top: '50%', right: '45%', color: '#34d399' },
                    ].map((p, i) => (
                      <div key={i} style={{ position: 'absolute', top: p.top, right: p.right, textAlign: 'center', transform: 'translate(50%, -50%)' }}>
                        <div style={{ width: 44, height: 44, background: '#0c1220', border: `2px solid ${p.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto' }}>{p.emoji}</div>
                        <div style={{ fontSize: 11, background: 'rgba(7,11,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '2px 8px', marginTop: 4 }}>{p.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}><span style={{ fontWeight: 700 }}>👨‍👩‍👧‍👦 أفراد العائلة</span></div>
                  {members.map(m => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a2236', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `2px solid ${m.status === 'online' ? '#34d399' : '#fbbf24'}` }}>{m.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>📍 {m.location}</div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 12, color: m.status === 'online' ? '#34d399' : '#fbbf24' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
                        <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>🔋 {m.battery}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ ...styles.card, padding: 24, textAlign: 'center' }}>
                  <h3 style={{ marginBottom: 20, fontWeight: 700 }}>🆘 زر الطوارئ</h3>
                  <button onClick={() => setSos(true)} style={{ width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, #ff6b6b, #ef4444)', border: '4px solid rgba(239,68,68,0.4)', color: 'white', fontSize: 28, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 30px rgba(239,68,68,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <span>SOS</span>
                    <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>اضغط للطوارئ</span>
                  </button>
                  <p style={{ color: '#64748b', fontSize: 12, marginTop: 16 }}>يرسل موقعك فوراً للعائلة</p>
                </div>

                <div style={{ ...styles.card, flex: 1 }}>
                  <div style={styles.cardHeader}><span style={{ fontWeight: 700 }}>💬 آخر الرسائل</span></div>
                  {messages.slice(-3).map(m => (
                    <div key={m.id} style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13 }}>
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>{m.sender}: </span>{m.text}
                    </div>
                  ))}
                  <div style={{ padding: 12 }}>
                    <button onClick={() => setPage('chat')} style={{ width: '100%', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', padding: '8px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 13 }}>فتح الدردشة</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMAIL PAGE */}
        {page === 'email' && (
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={{ fontWeight: 700 }}>📧 الإيميل</span>
              </div>
              <div style={{ padding: 12 }}>
                <button onClick={() => { setComposing(true); setSelectedEmail(null); }} style={{ width: '100%', background: 'linear-gradient(135deg, #38bdf8, #a78bfa)', border: 'none', color: '#070b14', padding: '10px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>✏️ رسالة جديدة</button>
                {[
                  { label: '📥 الوارد', count: 1 },
                  { label: '📤 المرسل', count: 0 },
                  { label: '⭐ المهم', count: 0 },
                  { label: '🗑️ المحذوف', count: 0 },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, cursor: 'pointer', color: i === 0 ? '#38bdf8' : '#94a3b8', background: i === 0 ? 'rgba(56,189,248,0.1)' : 'transparent', marginBottom: 4 }}>
                    <span style={{ fontSize: 14 }}>{f.label}</span>
                    {f.count > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{f.count}</span>}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>حسابات العائلة</div>
                {[
                  { name: 'رفعت', email: 'rafat@familia-alawar.com', emoji: '👨' },
                  { name: 'الزوجة', email: 'esposa@familia-alawar.com', emoji: '👩' },
                  { name: 'الابن', email: 'hijo@familia-alawar.com', emoji: '👦' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                    <span style={{ fontSize: 18 }}>{a.emoji}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{a.name}</div>
                      <div style={{ fontSize: 10, color: '#475569' }}>{a.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              {composing ? (
                <div>
                  <div style={styles.cardHeader}>
                    <span style={{ fontWeight: 700 }}>✏️ رسالة جديدة</span>
                    <button onClick={() => setComposing(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 18 }}>✕</button>
                  </div>
                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {['to', 'subject'].map(field => (
                      <input key={field} placeholder={field === 'to' ? 'إلى...' : 'الموضوع...'} value={newEmail[field]} onChange={e => setNewEmail({ ...newEmail, [field]: e.target.value })}
                        style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', color: '#f1f5f9', fontFamily: 'Tajawal, sans-serif', fontSize: 14, outline: 'none' }} />
                    ))}
                    <textarea placeholder="اكتب رسالتك..." value={newEmail.body} onChange={e => setNewEmail({ ...newEmail, body: e.target.value })}
                      style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', color: '#f1f5f9', fontFamily: 'Tajawal, sans-serif', fontSize: 14, outline: 'none', height: 200, resize: 'none' }} />
                    <button onClick={() => { setComposing(false); setNewEmail({ to: '', subject: '', body: '' }); }}
                      style={{ background: 'linear-gradient(135deg, #38bdf8, #0284c7)', border: 'none', color: 'white', padding: '12px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 14, fontWeight: 700 }}>
                      إرسال ✈️
                    </button>
                  </div>
                </div>
              ) : selectedEmail ? (
                <div>
                  <div style={styles.cardHeader}>
                    <span style={{ fontWeight: 700 }}>{selectedEmail.subject}</span>
                    <button onClick={() => setSelectedEmail(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 18 }}>✕</button>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a2236', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{selectedEmail.emoji}</div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{selectedEmail.from}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{selectedEmail.time}</div>
                      </div>
                    </div>
                    <p style={{ lineHeight: 1.8, color: '#94a3b8' }}>هذه رسالة من {selectedEmail.from} بخصوص: {selectedEmail.subject}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={styles.cardHeader}><span style={{ fontWeight: 700 }}>📥 صندوق الوارد</span></div>
                  {emails.map(e => (
                    <div key={e.id} onClick={() => setSelectedEmail(e)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: e.read ? 'transparent' : 'rgba(56,189,248,0.03)' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1a2236', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{e.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: e.read ? 400 : 700, fontSize: 14 }}>{e.from}</span>
                          <span style={{ fontSize: 12, color: '#475569' }}>{e.time}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: e.read ? 400 : 600, marginBottom: 2 }}>{e.subject}</div>
                        <div style={{ fontSize: 12, color: '#475569' }}>{e.preview}</div>
                      </div>
                      {!e.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', flexShrink: 0 }}></div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHAT PAGE */}
        {page === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
            <div style={styles.card}>
              <div style={styles.cardHeader}><span style={{ fontWeight: 700 }}>👨‍👩‍👧‍👦 العائلة</span></div>
              {members.map(m => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1a2236', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${m.status === 'online' ? '#34d399' : '#fbbf24'}` }}>{m.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: m.status === 'online' ? '#34d399' : '#fbbf24' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...styles.card, display: 'flex', flexDirection: 'column' }}>
              <div style={styles.cardHeader}><span style={{ fontWeight: 700 }}>💬 مجموعة Familia Alawar</span></div>
              <div style={{ flex: 1, padding: 16, overflowY: 'auto', maxHeight: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: m.sender === 'رفعت' ? 'row-reverse' : 'row', gap: 8 }}>
                    <div style={{ maxWidth: '75%', background: m.sender === 'رفعت' ? 'rgba(56,189,248,0.1)' : '#1a2236', border: `1px solid ${m.sender === 'رفعت' ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: '8px 12px', fontSize: 13 }}>
                      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>{m.sender} · {m.time}</div>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
                <input value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()}
                  placeholder="اكتب رسالة..." style={{ flex: 1, background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 12px', color: '#f1f5f9', fontFamily: 'Tajawal, sans-serif', fontSize: 13, outline: 'none' }} />
                <button onClick={sendMessage} style={{ width: 36, height: 36, background: '#38bdf8', border: 'none', borderRadius: 10, color: '#070b14', fontSize: 16, cursor: 'pointer' }}>←</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
