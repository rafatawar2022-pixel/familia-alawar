import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const USERS = [
  { id: 1, name: 'رأفت', email: 'rafat@familia-alawar.com', password: 'Rafat1983', emoji: '👨', role: 'الأب', birthday: '1983-01-01', location: 'كوستاريكا', phone: '+506 6374 6666' },
  { id: 2, name: 'نور', email: 'esposa@familia-alawar.com', password: 'Esposa2024', emoji: '👩', role: 'الأم', birthday: '1985-05-15', location: 'كوستاريكا', phone: '' },
  { id: 3, name: 'جود', email: 'hijo@familia-alawar.com', password: 'Hijo2024', emoji: '👦', role: 'الابن', birthday: '2010-03-20', location: 'المدرسة', phone: '' },
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

function daysUntil(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  const next = new Date(today.getFullYear(), date.getMonth(), date.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.ceil((next - today) / (1000 * 60 * 60 * 24));
}

const NAV = [
  { id: 'home', label: 'الرئيسية', icon: '🏠' },
  { id: 'photos', label: 'الصور', icon: '📸' },
  { id: 'videos', label: 'الفيديو', icon: '🎥' },
  { id: 'posts', label: 'المنشورات', icon: '📝' },
  { id: 'chat', label: 'الدردشة', icon: '💬' },
  { id: 'call', label: 'الاتصال', icon: '📞' },
  { id: 'map', label: 'الخريطة', icon: '🗺️' },
  { id: 'calendar', label: 'التقويم', icon: '📅' },
  { id: 'notifications', label: 'الإشعارات', icon: '🔔' },
  { id: 'profile', label: 'ملفي', icon: '👤' },
  { id: 'sos', label: 'الطوارئ', icon: '🆘' },
];

const MEMBERS = [
  { name: 'رأفت', emoji: '👨', status: 'online', location: 'كوستاريكا' },
  { name: 'نور', emoji: '👩', status: 'online', location: 'كوستاريكا' },
  { name: 'جود', emoji: '👦', status: 'away', location: 'المدرسة' },
  { name: 'البنت', emoji: '👧', status: 'online', location: 'المنزل' },
];

const FAMILY_LOCATIONS = [
  { name: 'رأفت', emoji: '👨', position: [9.9281, -84.0907], place: 'كوستاريكا' },
  { name: 'نور', emoji: '👩', position: [9.9300, -84.0850], place: 'كوستاريكا' },
  { name: 'جود', emoji: '👦', position: [9.9250, -84.0950], place: 'المدرسة' },
  { name: 'البنت', emoji: '👧', position: [9.9281, -84.0907], place: 'المنزل' },
];

const INIT_NOTIFS = [
  { id: 1, type: 'message', icon: '💬', title: 'رسالة جديدة', body: 'نور: وصلت السوق 🛒', time: 'منذ 5 دقائق', read: false },
  { id: 2, type: 'birthday', icon: '🎂', title: 'عيد ميلاد قادم', body: 'عيد ميلاد رأفت بعد 5 أيام!', time: 'اليوم', read: false },
];

const INIT_EVENTS = [
  { id: 1, title: 'عيد ميلاد رأفت 🎂', date: '2026-01-01', type: 'birthday', emoji: '🎂', color: '#e74c3c' },
  { id: 2, title: 'عيد ميلاد نور 🎂', date: '2026-05-15', type: 'birthday', emoji: '🎂', color: '#e74c3c' },
  { id: 3, title: 'عيد ميلاد جود 🎂', date: '2026-03-20', type: 'birthday', emoji: '🎂', color: '#e74c3c' },
  { id: 4, title: 'ذكرى الزواج 💍', date: '2026-06-10', type: 'anniversary', emoji: '💍', color: '#9b59b6' },
  { id: 5, title: 'رحلة عائلية 🏖️', date: '2026-07-15', type: 'trip', emoji: '🏖️', color: '#2ecc71' },
];

// Custom GPS icon
const gpsIcon = new L.DivIcon({
  html: '<div style="width:20px;height:20px;background:#c0392b;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(192,57,43,0.8)"></div>',
  iconSize: [20, 20], iconAnchor: [10, 10], className: ''
});

export default function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [page, setPage] = useState('home');
  const [sosActive, setSosActive] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'نور', text: 'وصلت السوق 🛒', time: '10:30', room: 'group' },
    { id: 2, sender: 'رأفت', text: 'تمام، خذي اللي تحتاجين ✅', time: '10:31', room: 'group' },
    { id: 3, sender: 'جود', text: 'أنا في المدرسة 📚', time: '08:00', room: 'group' },
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
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [newPass, setNewPass] = useState({ current: '', new: '', confirm: '' });
  const [passMsg, setPassMsg] = useState('');
  const [notifications, setNotifications] = useState(INIT_NOTIFS);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [events, setEvents] = useState(INIT_EVENTS);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'event', emoji: '📅' });
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date());
  const [myLocation, setMyLocation] = useState(null);
  const [trackingGPS, setTrackingGPS] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const startGPS = () => {
    if (!navigator.geolocation) { alert('جهازك لا يدعم GPS'); return; }
    setTrackingGPS(true);
    navigator.geolocation.watchPosition(
      pos => {
        setMyLocation([pos.coords.latitude, pos.coords.longitude]);
        setGpsAccuracy(Math.round(pos.coords.accuracy));
      },
      err => { alert('لا يمكن الوصول للموقع — تأكد من إذن الموقع'); setTrackingGPS(false); },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
  };

  const stopGPS = () => { setTrackingGPS(false); setMyLocation(null); };

  const handleLogin = () => {
    const found = USERS.find(u => u.email === loginData.email && u.password === loginData.password);
    if (found) { setUser(found); setLoginError(''); }
    else setLoginError('❌ إيميل أو كلمة مرور غلط!');
  };

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: msg, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, replyTo: replyTo ? replyTo.text?.substring(0, 50) : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
    setNotifications(prev => [{ id: Date.now(), type: 'message', icon: '💬', title: 'رسالة جديدة', body: `${user.name}: ${msg.substring(0, 40)}`, time: 'الآن', read: false }, ...prev]);
    setMsg(''); setReplyTo(null);
  };

  const addPost = () => {
    if (!postText.trim()) return;
    setPosts([{ id: Date.now(), name: user.name, emoji: user.emoji, text: postText, time: 'الآن' }, ...posts]);
    setNotifications(prev => [{ id: Date.now(), type: 'post', icon: '📝', title: 'منشور جديد', body: `${user.name}: ${postText.substring(0, 40)}`, time: 'الآن', read: false }, ...prev]);
    setPostText('');
  };

  const handlePhotoUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setPhotos(prev => [...prev, { id: Date.now() + Math.random(), src: ev.target.result, uploader: user.name, time: 'الآن' }]);
        setNotifications(prev => [{ id: Date.now(), type: 'photo', icon: '📸', title: 'صورة جديدة', body: `${user.name} شارك صورة`, time: 'الآن', read: false }, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      setVideos(prev => [...prev, { id: Date.now() + Math.random(), src: URL.createObjectURL(file), uploader: user.name, time: 'الآن' }]);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: '', audio: url, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start(); setMediaRecorder(recorder); setIsRecording(true);
    } catch (e) { alert('لا يمكن الوصول للمايكروفون'); }
  };

  const stopRecording = () => { if (mediaRecorder) { mediaRecorder.stop(); setIsRecording(false); } };

  const filteredMessages = messages.filter(m =>
    chatRoom === 'group' ? m.room === 'group' || !m.room
      : (m.room === chatRoom || m.to === chatRoom) && (m.sender === user?.name || m.to === user?.name || m.room === chatRoom)
  );

  const handleChangePass = () => {
    if (newPass.current !== user.password) { setPassMsg('❌ كلمة المرور الحالية غلط!'); return; }
    if (newPass.new !== newPass.confirm) { setPassMsg('❌ كلمة المرور الجديدة غير متطابقة!'); return; }
    if (newPass.new.length < 6) { setPassMsg('❌ كلمة المرور يجب أن تكون 6 أحرف!'); return; }
    user.password = newPass.new;
    setPassMsg('✅ تم تغيير كلمة المرور بنجاح!');
    setNewPass({ current: '', new: '', confirm: '' });
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    const colors = { birthday: '#e74c3c', anniversary: '#9b59b6', trip: '#2ecc71', event: '#3498db', other: '#f39c12' };
    setEvents(prev => [...prev, { id: Date.now(), ...newEvent, color: colors[newEvent.type] || '#3498db' }]);
    setNotifications(prev => [{ id: Date.now(), type: 'calendar', icon: '📅', title: 'مناسبة جديدة', body: `${newEvent.title}`, time: 'الآن', read: false }, ...prev]);
    setNewEvent({ title: '', date: '', type: 'event', emoji: '📅' }); setShowAddEvent(false);
  };

  const sortedEvents = [...events].sort((a, b) => daysUntil(a.date) - daysUntil(b.date));
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const monthEvents = events.filter(e => { const d = new Date(e.date); return d.getMonth() === calMonth.getMonth() && d.getFullYear() === calMonth.getFullYear(); });

  const mapCenter = myLocation || [9.9281, -84.0907];

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

  return (
    <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>

      {sosActive && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#3d3d3d', border: '2px solid #c0392b', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 400, boxShadow: '0 0 60px rgba(192,57,43,0.5)' }}>
            <div style={{ fontSize: 60 }}>🆘</div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', color: '#c0392b', fontSize: 28, margin: '16px 0' }}>حالة طوارئ!</h2>
            {myLocation && <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#2ecc71', fontSize: 12, marginBottom: 8 }}>📍 موقعك: {myLocation[0].toFixed(4)}, {myLocation[1].toFixed(4)}</p>}
            <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>تم إرسال موقع {user.name} لجميع أفراد العائلة فوراً</p>
            <button onClick={() => { setSosActive(false); setNotifications(prev => [{ id: Date.now(), type: 'sos', icon: '🆘', title: 'تنبيه طوارئ', body: `${user.name} فعّل زر الطوارئ!`, time: 'الآن', read: false }, ...prev]); }} style={{ background: '#c0392b', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>إلغاء الطوارئ</button>
          </div>
        </div>
      )}

      {showNotifPanel && (
        <div style={{ position: 'fixed', top: 70, left: 20, width: 360, background: '#2d2d2d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', background: '#383838', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🔔 الإشعارات</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={markAllRead} style={{ background: 'transparent', border: 'none', color: '#c0392b', cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 12 }}>قراءة الكل</button>
              <button onClick={() => setShowNotifPanel(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
          </div>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {notifications.slice(0, 10).map(n => (
              <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: n.read ? 'transparent' : 'rgba(192,57,43,0.08)', cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.read ? '#444' : '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: n.read ? 400 : 700, fontSize: 13 }}>{n.title}</div>
                  <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{n.body}</div>
                  <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{n.time}</div>
                </div>
                {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c0392b', flexShrink: 0, marginTop: 4 }}></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <Clock />

      <div style={{ background: C.header, padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16 }}>Familia Alawar</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {trackingGPS && <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.3)', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontFamily: 'Tajawal, sans-serif', color: '#2ecc71' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ecc71', animation: 'blink 1s infinite' }}></div>
            GPS نشط
          </div>}
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, opacity: 0.9 }}>أهلاً {user.name} {user.emoji}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setShowNotifPanel(!showNotifPanel)} style={{ position: 'relative', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: 8, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🔔
            {unreadCount > 0 && <div style={{ position: 'absolute', top: -4, right: -4, background: '#e74c3c', color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #c0392b' }}>{unreadCount}</div>}
          </button>
          <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>خروج 🚪</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 200, background: '#2d2d2d', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '16px 0', flexShrink: 0 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setPage(n.id); setShowNotifPanel(false); if (n.id === 'sos') setSosActive(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', background: page === n.id ? 'rgba(192,57,43,0.2)' : 'transparent', border: 'none', borderRight: page === n.id ? '3px solid #c0392b' : '3px solid transparent', color: page === n.id ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: page === n.id ? 700 : 400, textAlign: 'right', width: '100%', position: 'relative' }}>
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.id === 'notifications' && unreadCount > 0 && <span style={{ marginRight: 'auto', background: '#c0392b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{unreadCount}</span>}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>

          {page === 'home' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🏠 الصفحة الرئيسية</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'أفراد العائلة', value: '4', icon: '👨‍👩‍👧‍👦' },
                  { label: 'متصلون الآن', value: '3', icon: '🟢' },
                  { label: 'صور مشتركة', value: photos.length.toString(), icon: '📸' },
                  { label: 'إشعارات جديدة', value: unreadCount.toString(), icon: '🔔' },
                ].map((stat, i) => (
                  <div key={i} style={{ ...s.card, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 28, fontWeight: 700, color: '#c0392b' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...s.card, marginBottom: 24 }}>
                <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🎂 أعياد الميلاد القادمة</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
                  {USERS.map((u, i) => {
                    const days = daysUntil(u.birthday);
                    return (
                      <div key={i} style={{ padding: '16px 20px', borderLeft: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', textAlign: 'center' }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{u.emoji}</div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                        <div style={{ background: days === 0 ? '#c0392b' : days <= 7 ? 'rgba(192,57,43,0.2)' : 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '4px 12px', display: 'inline-block', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13, color: days <= 7 ? '#ff6b6b' : '#fff', marginTop: 8 }}>
                          {days === 0 ? '🎉 اليوم!' : `${days} يوم`}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                  <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>📅 المناسبات القادمة</span></div>
                  {sortedEvents.slice(0, 4).map((e, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: e.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{e.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{e.title}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{e.date}</div>
                      </div>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: e.color }}>{daysUntil(e.date)} يوم</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🗺️ مواقع العائلة</span>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: '#2ecc71' }}>● مباشر</span>
                </div>
                <MapContainer center={mapCenter} zoom={12} style={{ height: 300, width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {FAMILY_LOCATIONS.map((loc, i) => (
                    <Marker key={i} position={loc.position}><Popup>{loc.emoji} {loc.name} — {loc.place}</Popup></Marker>
                  ))}
                  {myLocation && <Marker position={myLocation} icon={gpsIcon}><Popup>📍 موقعك الحالي</Popup></Marker>}
                  {myLocation && <Circle center={myLocation} radius={gpsAccuracy || 50} color="#c0392b" fillColor="#c0392b" fillOpacity={0.1} />}
                </MapContainer>
              </div>
            </div>
          )}

          {page === 'photos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📸 الصور</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="image/*" multiple id="photoUpload" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                <label htmlFor="photoUpload" style={{ display: 'inline-block', background: '#c0392b', color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>+ رفع صورة</label>
              </div>
              {photos.length === 0 ? (
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📸</div>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)' }}>لا توجد صور بعد!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {photos.map(p => (
                    <div key={p.id} style={s.card}>
                      <img src={p.src} alt="" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
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

          {page === 'videos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🎥 الفيديو</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="video/*" multiple id="videoUpload" style={{ display: 'none' }} onChange={handleVideoUpload} />
                <label htmlFor="videoUpload" style={{ display: 'inline-block', background: '#c0392b', color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>+ رفع فيديو</label>
              </div>
              {videos.length === 0 ? (
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>🎥</div>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)' }}>لا توجد فيديوهات بعد!</p>
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

          {page === 'chat' && (
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, height: 600 }}>
              <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
                <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>💬 المحادثات</span></div>
                <div onClick={() => setChatRoom('group')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: chatRoom === 'group' ? 'rgba(192,57,43,0.2)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: chatRoom === 'group' ? '3px solid #c0392b' : '3px solid transparent' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍👩‍👧‍👦</div>
                  <div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>المجموعة العائلية</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>الكل</div>
                  </div>
                </div>
                {MEMBERS.filter(m => m.name !== user.name).map((m, i) => (
                  <div key={i} onClick={() => setChatRoom(m.name)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: chatRoom === m.name ? 'rgba(192,57,43,0.2)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: chatRoom === m.name ? '3px solid #c0392b' : '3px solid transparent' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${m.status === 'online' ? '#2ecc71' : '#f39c12'}` }}>{m.emoji}</div>
                    <div>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{m.name}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: m.status === 'online' ? '#2ecc71' : '#f39c12' }}>{m.status === 'online' ? '● متصل' : '● بعيد'}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
                <div style={s.cardHeader}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{chatRoom === 'group' ? '👨‍👩‍👧‍👦 المجموعة العائلية' : `💬 ${chatRoom}`}</span>
                </div>
                <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {filteredMessages.map(m => (
                    <div key={m.id}>
                      <div style={{ display: 'flex', flexDirection: m.sender === user.name ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                          {MEMBERS.find(mb => mb.name === m.sender)?.emoji || '👤'}
                        </div>
                        <div style={{ maxWidth: '70%' }}>
                          {m.replyTo && <div style={{ background: 'rgba(255,255,255,0.05)', borderRight: '2px solid #c0392b', padding: '4px 8px', borderRadius: 6, marginBottom: 4, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Tajawal, sans-serif' }}>↩️ {m.replyTo}</div>}
                          <div style={{ background: m.sender === user.name ? 'rgba(192,57,43,0.25)' : '#444', border: `1px solid ${m.sender === user.name ? 'rgba(192,57,43,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 14, padding: '8px 14px', fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{m.sender} · {m.time}</div>
                            {m.image && <img src={m.image} alt="" style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 4 }} />}
                            {m.audio && <audio src={m.audio} controls style={{ width: '100%', marginTop: 4 }} />}
                            {m.text}
                          </div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 3, justifyContent: m.sender === user.name ? 'flex-start' : 'flex-end' }}>
                            <button onClick={() => setReplyTo(m)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, fontFamily: 'Tajawal, sans-serif', padding: '2px 6px' }}>↩️ رد</button>
                            {m.sender === user.name && <button onClick={() => setMessages(prev => prev.filter(x => x.id !== m.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, fontFamily: 'Tajawal, sans-serif', padding: '2px 6px' }}>🗑️ حذف</button>}
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '2px 6px' }}>✅</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {replyTo && (
                  <div style={{ padding: '8px 16px', background: 'rgba(192,57,43,0.1)', borderTop: '1px solid rgba(192,57,43,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>↩️ رد على: {replyTo.text?.substring(0, 30)}</span>
                    <button onClick={() => setReplyTo(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>✕</button>
                  </div>
                )}
                <div style={{ padding: '6px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6 }}>
                  {['😊','😂','❤️','👍','🎉','😢','😮','🙏','👋','🔥'].map(emoji => (
                    <button key={emoji} onClick={() => setMsg(prev => prev + emoji)} style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', padding: '3px' }}>{emoji}</button>
                  ))}
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="file" accept="image/*" id="chatImage" style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: '', image: ev.target.result, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
                      reader.readAsDataURL(file);
                    }}
                  />
                  <label htmlFor="chatImage" style={{ width: 38, height: 38, background: '#444', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>📎</label>
                  <button onMouseDown={startRecording} onMouseUp={stopRecording} onTouchStart={startRecording} onTouchEnd={stopRecording}
                    style={{ width: 38, height: 38, background: isRecording ? '#e74c3c' : '#444', border: 'none', borderRadius: 10, color: '#fff', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>🎤</button>
                  <input value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMsg()}
                    placeholder={chatRoom === 'group' ? 'اكتب للمجموعة...' : `اكتب لـ ${chatRoom}...`}
                    style={{ flex: 1, background: '#444', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 14, outline: 'none' }} />
                  <button onClick={sendMsg} style={{ width: 42, height: 42, background: '#c0392b', border: 'none', borderRadius: 10, color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
                </div>
              </div>
            </div>
          )}

          {page === 'call' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📞 الاتصال</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📞</div>
                  <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 12 }}>اتصال صوتي</h3>
                  <button onClick={() => window.open('https://meet.jit.si/FamiliaAlawar-Voice', '_blank')} style={{ ...s.btn, width: 'auto', padding: '12px 32px' }}>📞 ابدأ اتصال صوتي</button>
                </div>
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📹</div>
                  <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 12 }}>اتصال فيديو</h3>
                  <button onClick={() => window.open('https://meet.jit.si/FamiliaAlawar-Video', '_blank')} style={{ ...s.btn, width: 'auto', padding: '12px 32px' }}>📹 ابدأ اتصال فيديو</button>
                </div>
              </div>
            </div>
          )}

          {page === 'map' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🗺️ خريطة العائلة</h2>

              {/* GPS Controls */}
              <div style={{ ...s.card, padding: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>📍 موقعك الحقيقي</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                      {trackingGPS ? (myLocation ? `${myLocation[0].toFixed(5)}, ${myLocation[1].toFixed(5)} — دقة: ${gpsAccuracy}م` : 'جاري تحديد الموقع...') : 'GPS متوقف'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {!trackingGPS ? (
                      <button onClick={startGPS} style={{ ...s.btn, width: 'auto', padding: '10px 24px', background: '#2ecc71' }}>
                        📍 تفعيل GPS
                      </button>
                    ) : (
                      <button onClick={stopGPS} style={{ ...s.btn, width: 'auto', padding: '10px 24px', background: '#e74c3c' }}>
                        ⏹ إيقاف GPS
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>المواقع الحالية</span>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: '#2ecc71' }}>● مباشر</span>
                </div>
                <MapContainer center={mapCenter} zoom={13} style={{ height: 500, width: '100%' }}>
                  <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {FAMILY_LOCATIONS.map((loc, i) => (
                    <Marker key={i} position={loc.position}>
                      <Popup>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 24 }}>{loc.emoji}</div>
                          <div style={{ fontWeight: 700 }}>{loc.name}</div>
                          <div style={{ color: '#666', fontSize: 12 }}>📍 {loc.place}</div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {myLocation && (
                    <>
                      <Marker position={myLocation} icon={gpsIcon}>
                        <Popup>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 24 }}>{user.emoji}</div>
                            <div style={{ fontWeight: 700 }}>{user.name} — أنت</div>
                            <div style={{ color: '#666', fontSize: 12 }}>دقة: {gpsAccuracy}م</div>
                          </div>
                        </Popup>
                      </Marker>
                      <Circle center={myLocation} radius={gpsAccuracy || 50} color="#c0392b" fillColor="#c0392b" fillOpacity={0.1} />
                    </>
                  )}
                </MapContainer>
              </div>
            </div>
          )}

          {page === 'calendar' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📅 التقويم العائلي</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                <div style={s.card}>
                  <div style={s.cardHeader}>
                    <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>›</button>
                    <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{calMonth.toLocaleDateString('ar', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>‹</button>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                      {['أح','إث','ث','أر','خ','ج','س'].map((d, i) => (
                        <div key={i} style={{ textAlign: 'center', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', padding: '4px 0' }}>{d}</div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                      {Array.from({ length: getFirstDay(calMonth) }).map((_, i) => <div key={i} />)}
                      {Array.from({ length: getDaysInMonth(calMonth) }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const hasEvent = monthEvents.some(e => e.date === dateStr);
                        const isToday = new Date().toDateString() === new Date(calMonth.getFullYear(), calMonth.getMonth(), day).toDateString();
                        return (
                          <div key={i} style={{ textAlign: 'center', padding: '6px 2px', borderRadius: 8, background: isToday ? '#c0392b' : hasEvent ? 'rgba(192,57,43,0.2)' : 'transparent', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? '#fff' : hasEvent ? '#ff6b6b' : '#fff' }}>
                            {day}
                            {hasEvent && !isToday && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#c0392b', margin: '2px auto 0' }} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {monthEvents.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: 16 }}>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>مناسبات هذا الشهر:</div>
                      {monthEvents.map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < monthEvents.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span style={{ fontSize: 16 }}>{e.emoji}</span>
                          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, flex: 1 }}>{e.title}</span>
                          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{e.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={s.card}>
                    <div style={s.cardHeader}>
                      <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>📋 كل المناسبات</span>
                      <button onClick={() => setShowAddEvent(!showAddEvent)} style={{ background: '#c0392b', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>+ إضافة</button>
                    </div>
                    {showAddEvent && (
                      <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(192,57,43,0.05)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <input placeholder="اسم المناسبة..." value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} style={{ ...s.input, fontSize: 13, padding: '10px 14px' }} />
                          <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} style={{ ...s.input, fontSize: 13, padding: '10px 14px' }} />
                          <select value={newEvent.type} onChange={e => { const emojis = { birthday: '🎂', anniversary: '💍', trip: '🏖️', event: '📅', other: '⭐' }; setNewEvent({ ...newEvent, type: e.target.value, emoji: emojis[e.target.value] }); }} style={{ ...s.input, fontSize: 13, padding: '10px 14px' }}>
                            <option value="birthday">🎂 عيد ميلاد</option>
                            <option value="anniversary">💍 ذكرى سنوية</option>
                            <option value="trip">🏖️ رحلة</option>
                            <option value="event">📅 مناسبة</option>
                            <option value="other">⭐ أخرى</option>
                          </select>
                          <button onClick={addEvent} style={{ ...s.btn, padding: '10px', fontSize: 13 }}>حفظ ✓</button>
                        </div>
                      </div>
                    )}
                    <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                      {sortedEvents.map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: e.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{e.emoji}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{e.title}</div>
                            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{e.date}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16, color: e.color }}>{daysUntil(e.date)}</div>
                            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>يوم</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === 'notifications' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🔔 الإشعارات</h2>
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>كل الإشعارات ({notifications.length})</span>
                  <button onClick={markAllRead} style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#c0392b', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 13 }}>قراءة الكل ✓</button>
                </div>
                {notifications.map(n => (
                  <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                    style={{ display: 'flex', gap: 14, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: n.read ? 'transparent' : 'rgba(192,57,43,0.06)', cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: n.read ? '#444' : '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: n.read ? 400 : 700, fontSize: 14, marginBottom: 3 }}>{n.title}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{n.body}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{n.time}</div>
                    </div>
                    {!n.read && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#c0392b', flexShrink: 0, marginTop: 6 }}></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === 'profile' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>👤 ملفي الشخصي</h2>
              <div style={{ ...s.card, marginBottom: 20 }}>
                <div style={{ background: '#c0392b', padding: '40px 24px', textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 12px' }}>{user.emoji}</div>
                  <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 22, margin: '0 0 4px' }}>{user.name}</h2>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 14, opacity: 0.85, margin: 0 }}>{user.role} — Familia Alawar</p>
                </div>
                <div style={{ padding: 24 }}>
                  {[
                    { icon: '📧', label: 'الإيميل', value: user.email },
                    { icon: '📱', label: 'الهاتف', value: user.phone || 'غير محدد' },
                    { icon: '📍', label: 'الموقع', value: user.location || 'غير محدد' },
                    { icon: '🎂', label: 'تاريخ الميلاد', value: user.birthday || 'غير محدد' },
                    { icon: '📍', label: 'موقعي الحالي', value: myLocation ? `${myLocation[0].toFixed(4)}, ${myLocation[1].toFixed(4)}` : 'GPS متوقف' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 14 }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={s.card}>
                <div style={s.cardHeader}><span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🔑 تغيير كلمة المرور</span></div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input type="password" placeholder="كلمة المرور الحالية" value={newPass.current} onChange={e => setNewPass({ ...newPass, current: e.target.value })} style={s.input} />
                  <input type="password" placeholder="كلمة المرور الجديدة" value={newPass.new} onChange={e => setNewPass({ ...newPass, new: e.target.value })} style={s.input} />
                  <input type="password" placeholder="تأكيد كلمة المرور الجديدة" value={newPass.confirm} onChange={e => setNewPass({ ...newPass, confirm: e.target.value })} style={s.input} />
                  {passMsg && <div style={{ background: passMsg.includes('✅') ? 'rgba(46,204,113,0.1)' : 'rgba(192,57,43,0.1)', border: `1px solid ${passMsg.includes('✅') ? 'rgba(46,204,113,0.3)' : 'rgba(192,57,43,0.3)'}`, borderRadius: 10, padding: '10px', color: passMsg.includes('✅') ? '#2ecc71' : '#ff6b6b', fontSize: 13, fontFamily: 'Tajawal, sans-serif' }}>{passMsg}</div>}
                  <button onClick={handleChangePass} style={{ ...s.btn, width: 'auto', padding: '10px 24px' }}>حفظ التغييرات ✓</button>
                </div>
              </div>
            </div>
          )}

          {page === 'sos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🆘 الطوارئ</h2>
              <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                {myLocation && <div style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)', borderRadius: 10, padding: '10px 20px', marginBottom: 24, fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: '#2ecc71' }}>📍 موقعك الحالي: {myLocation[0].toFixed(5)}, {myLocation[1].toFixed(5)}</div>}
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 15 }}>في حالة الطوارئ اضغط الزر لإرسال موقعك فوراً لجميع أفراد العائلة</p>
                <button onClick={() => { if (!trackingGPS) startGPS(); setSosActive(true); }} style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, #e74c3c, #c0392b)', border: '4px solid rgba(192,57,43,0.4)', color: 'white', fontSize: 32, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 40px rgba(192,57,43,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
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
