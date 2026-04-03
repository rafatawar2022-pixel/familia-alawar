import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const T = {
  ar: {
    home: 'الرئيسية', photos: 'الصور', videos: 'الفيديو', posts: 'المنشورات',
    chat: 'الدردشة', call: 'الاتصال', map: 'الخريطة', calendar: 'التقويم',
    notifications: 'الإشعارات', profile: 'ملفي', settings: 'الإعدادات', sos: 'الطوارئ',
    album: 'الألبوم', music: 'الموسيقى', reels: 'ريلز',
    welcome: 'أهلاً بكم في موقع عائلة Alawar',
    subtitle: 'منصة عائلية خاصة وآمنة',
    login: 'تسجيل الدخول', loginBtn: 'دخول ←',
    email: 'الإيميل', password: 'كلمة المرور',
    logout: 'خروج 🚪', hello: 'أهلاً',
    family: 'أفراد العائلة', online: 'متصلون الآن',
    newNotif: 'إشعارات جديدة', sharedPhotos: 'صور مشتركة',
    birthdays: 'أعياد الميلاد القادمة', today: '🎉 اليوم!', days: 'يوم',
    upcomingEvents: 'المناسبات القادمة', familyLocations: 'مواقع العائلة',
    connected: '● متصل', away: '● بعيد',
    uploadPhoto: '+ رفع صورة', uploadVideo: '+ رفع فيديو',
    noPhotos: 'لا توجد صور بعد!', noVideos: 'لا توجد فيديوهات بعد!',
    publish: 'نشر ✓', writeSomething: 'شارك شيئاً مع العائلة...',
    familyGroup: 'المجموعة العائلية', all: 'الكل',
    voiceCall: 'اتصال صوتي', videoCall: 'اتصال فيديو',
    startVoice: '📞 ابدأ', startVideo: '📹 ابدأ',
    gpsReal: '📍 موقعك الحقيقي', gpsActive: 'GPS نشط', gpsStopped: 'GPS متوقف',
    activateGPS: '📍 تفعيل GPS', stopGPS: '⏹ إيقاف',
    currentLocations: 'المواقع الحالية', live: '● مباشر',
    allNotifications: 'كل الإشعارات', readAll: 'قراءة الكل ✓',
    myProfile: 'ملفي الشخصي', changePass: 'تغيير كلمة المرور',
    currentPass: 'كلمة المرور الحالية', newPassLabel: 'كلمة المرور الجديدة',
    confirmPass: 'تأكيد كلمة المرور', saveChanges: 'حفظ ✓',
    settingsTitle: 'الإعدادات', profilePhoto: 'صورة الملف الشخصي',
    editInfo: 'تعديل المعلومات', themeColor: 'لون الموقع',
    notifSettings: 'الإشعارات', privacy: 'الخصوصية',
    saveAll: '💾 حفظ كل الإعدادات', saved: '✅ تم حفظ الإعدادات!',
    emergency: 'الطوارئ', emergencyMsg: 'في حالة الطوارئ اضغط الزر لإرسال موقعك فوراً',
    cancelSOS: 'إلغاء الطوارئ', emergencyAlert: 'حالة طوارئ!',
    sentLocation: 'تم إرسال الموقع فوراً!',
    familyAlbum: 'ألبوم العائلة', addPhoto: '+ إضافة صورة',
    musicShare: 'مشاركة الموسيقى', addMusic: '+ إضافة موسيقى',
    name: 'الاسم', phone: 'رقم الهاتف', location: 'الموقع',
    showLocation: 'إظهار موقعي', showBirthday: 'إظهار تاريخ ميلادي', showPhone: 'إظهار رقم هاتفي',
    like: 'إعجاب', comment: 'تعليق', likes: 'إعجاب', writeComment: 'اكتب تعليقاً...',
    addReels: '+ رفع ريلز', noReels: 'لا توجد ريلز بعد!',
  },
  es: {
    home: 'Inicio', photos: 'Fotos', videos: 'Videos', posts: 'Publicaciones',
    chat: 'Chat', call: 'Llamada', map: 'Mapa', calendar: 'Calendario',
    notifications: 'Notificaciones', profile: 'Mi Perfil', settings: 'Ajustes', sos: 'Emergencia',
    album: 'Álbum', music: 'Música', reels: 'Reels',
    welcome: 'Bienvenidos a Familia Alawar',
    subtitle: 'Plataforma familiar privada y segura',
    login: 'Iniciar Sesión', loginBtn: 'Entrar →',
    email: 'Correo', password: 'Contraseña',
    logout: 'Salir 🚪', hello: 'Hola',
    family: 'Miembros', online: 'En línea',
    newNotif: 'Notificaciones nuevas', sharedPhotos: 'Fotos compartidas',
    birthdays: 'Próximos cumpleaños', today: '🎉 ¡Hoy!', days: 'días',
    upcomingEvents: 'Próximos eventos', familyLocations: 'Ubicaciones',
    connected: '● Conectado', away: '● Ausente',
    uploadPhoto: '+ Subir foto', uploadVideo: '+ Subir video',
    noPhotos: '¡No hay fotos aún!', noVideos: '¡No hay videos aún!',
    publish: 'Publicar ✓', writeSomething: 'Comparte algo con la familia...',
    familyGroup: 'Grupo Familiar', all: 'Todos',
    voiceCall: 'Llamada de voz', videoCall: 'Videollamada',
    startVoice: '📞 Iniciar', startVideo: '📹 Iniciar',
    gpsReal: '📍 Tu ubicación', gpsActive: 'GPS activo', gpsStopped: 'GPS detenido',
    activateGPS: '📍 Activar GPS', stopGPS: '⏹ Detener',
    currentLocations: 'Ubicaciones actuales', live: '● En vivo',
    allNotifications: 'Todas las notificaciones', readAll: 'Leer todo ✓',
    myProfile: 'Mi Perfil', changePass: 'Cambiar contraseña',
    currentPass: 'Contraseña actual', newPassLabel: 'Nueva contraseña',
    confirmPass: 'Confirmar contraseña', saveChanges: 'Guardar ✓',
    settingsTitle: 'Ajustes', profilePhoto: 'Foto de perfil',
    editInfo: 'Editar información', themeColor: 'Color del sitio',
    notifSettings: 'Notificaciones', privacy: 'Privacidad',
    saveAll: '💾 Guardar todo', saved: '✅ ¡Ajustes guardados!',
    emergency: 'Emergencia', emergencyMsg: 'En emergencia presiona el botón',
    cancelSOS: 'Cancelar emergencia', emergencyAlert: '¡Emergencia!',
    sentLocation: '¡Ubicación enviada!',
    familyAlbum: 'Álbum Familiar', addPhoto: '+ Agregar foto',
    musicShare: 'Compartir música', addMusic: '+ Agregar música',
    name: 'Nombre', phone: 'Teléfono', location: 'Ubicación',
    showLocation: 'Mostrar ubicación', showBirthday: 'Mostrar cumpleaños', showPhone: 'Mostrar teléfono',
    like: 'Me gusta', comment: 'Comentar', likes: 'Me gusta', writeComment: 'Escribe un comentario...',
    addReels: '+ Subir Reels', noReels: '¡No hay Reels aún!',
  }
};

const USERS = [
  { id: 1, name: 'رأفت', email: 'rafat@familia-alawar.com', password: 'Rafat1983', emoji: '👨', role: 'الأب', birthday: '1983-01-01', location: 'كوستاريكا', phone: '+506 6374 6666' },
  { id: 2, name: 'نور', email: 'esposa@familia-alawar.com', password: 'Esposa2024', emoji: '👩', role: 'الأم', birthday: '1985-05-15', location: 'كوستاريكا', phone: '' },
  { id: 3, name: 'جود', email: 'hijo@familia-alawar.com', password: 'Hijo2024', emoji: '👦', role: 'الابن', birthday: '2010-03-20', location: 'المدرسة', phone: '' },
];

const C = { bg: '#333333', surface: '#3d3d3d' };

const s = {
  input: { background: '#444', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: (color) => ({ background: color, border: 'none', color: '#fff', padding: '13px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700, width: '100%' }),
  card: { background: '#3d3d3d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' },
  cardHeader: { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#383838' },
};

function Clock({ lang }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const syria = now.toLocaleTimeString(lang === 'ar' ? 'ar-SY' : 'es', { timeZone: 'Asia/Damascus', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const cr = now.toLocaleTimeString(lang === 'ar' ? 'ar' : 'es-CR', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString(lang === 'ar' ? 'ar' : 'es', { timeZone: 'Asia/Damascus', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div style={{ background: '#2a2a2a', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
        <span>🇸🇾</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Syria:</span><span style={{ color: '#fff', fontWeight: 600 }}>{syria}</span>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{date}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
        <span>🇨🇷</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Costa Rica:</span><span style={{ color: '#fff', fontWeight: 600 }}>{cr}</span>
      </div>
    </div>
  );
}

function Footer({ lang }) {
  return (
    <div style={{ background: '#2a2a2a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', textAlign: 'center', fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
      {lang === 'ar' ? 'جميع الحقوق محفوظة © 2026 — Familia Alawar 🏠' : '© 2026 Familia Alawar 🏠 — Todos los derechos reservados'}
    </div>
  );
}

function Toggle({ value, onChange, color }) {
  return (
    <div onClick={() => onChange(!value)} style={{ width: 48, height: 26, borderRadius: 13, background: value ? color : '#555', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: value ? 25 : 3, transition: 'left 0.3s' }} />
    </div>
  );
}

function Avatar({ photo, emoji, size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5, overflow: 'hidden', flexShrink: 0 }}>
      {photo ? <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{emoji}</span>}
    </div>
  );
}

function LikeComment({ item, user, color, t, onUpdate }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const liked = item.likes?.includes(user.name);

  const toggleLike = () => {
    const likes = item.likes || [];
    onUpdate({ ...item, likes: liked ? likes.filter(l => l !== user.name) : [...likes, user.name] });
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const comments = item.comments || [];
    onUpdate({ ...item, comments: [...comments, { id: Date.now(), author: user.name, text: commentText, time: 'الآن' }] });
    setCommentText('');
  };

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 14px' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: showComments ? 10 : 0 }}>
        <button onClick={toggleLike} style={{ background: 'transparent', border: 'none', color: liked ? color : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
          {liked ? '❤️' : '🤍'} {item.likes?.length || 0} {t.likes}
        </button>
        <button onClick={() => setShowComments(!showComments)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'Tajawal, sans-serif', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
          💬 {item.comments?.length || 0} {t.comment}
        </button>
      </div>
      {showComments && (
        <div>
          {(item.comments || []).map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: color }}>{c.author}:</div>
              <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{c.text}</div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyPress={e => e.key === 'Enter' && addComment()} placeholder={t.writeComment} style={{ flex: 1, background: '#444', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 13, outline: 'none' }} />
            <button onClick={addComment} style={{ background: color, border: 'none', borderRadius: 8, color: '#fff', padding: '0 14px', cursor: 'pointer', fontSize: 16 }}>←</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReelItem({ reel, user, color, t, onUpdate }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false); }
      else { videoRef.current.play(); setPlaying(true); }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', background: '#000', borderRadius: 16, overflow: 'hidden' }}>
      <video ref={videoRef} src={reel.src} loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={togglePlay} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 48, opacity: playing ? 0 : 0.8, transition: 'opacity 0.3s', pointerEvents: 'none' }}>▶️</div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Avatar photo={reel.uploaderPhoto} emoji={reel.uploaderEmoji || '👤'} size={36} />
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff' }}>{reel.uploader}</div>
            {reel.caption && <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{reel.caption}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => {
            const likes = reel.likes || [];
            const liked = likes.includes(user.name);
            onUpdate({ ...reel, likes: liked ? likes.filter(l => l !== user.name) : [...likes, user.name] });
          }} style={{ background: 'transparent', border: 'none', color: reel.likes?.includes(user.name) ? color : '#fff', cursor: 'pointer', fontSize: 20 }}>
            {reel.likes?.includes(user.name) ? '❤️' : '🤍'} {reel.likes?.length || 0}
          </button>
        </div>
      </div>
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

const INIT_EVENTS = [
  { id: 1, title: 'عيد ميلاد رأفت 🎂', date: '2026-01-01', type: 'birthday', emoji: '🎂', color: '#e74c3c' },
  { id: 2, title: 'عيد ميلاد نور 🎂', date: '2026-05-15', type: 'birthday', emoji: '🎂', color: '#e74c3c' },
  { id: 3, title: 'عيد ميلاد جود 🎂', date: '2026-03-20', type: 'birthday', emoji: '🎂', color: '#e74c3c' },
  { id: 4, title: 'ذكرى الزواج 💍', date: '2026-06-10', type: 'anniversary', emoji: '💍', color: '#9b59b6' },
  { id: 5, title: 'رحلة عائلية 🏖️', date: '2026-07-15', type: 'trip', emoji: '🏖️', color: '#2ecc71' },
];

const gpsIcon = new L.DivIcon({
  html: '<div style="width:20px;height:20px;background:#c0392b;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(192,57,43,0.8)"></div>',
  iconSize: [20, 20], iconAnchor: [10, 10], className: ''
});

const THEME_COLORS = [
  { name: 'أحمر', value: '#c0392b' }, { name: 'أزرق', value: '#2980b9' },
  { name: 'أخضر', value: '#27ae60' }, { name: 'بنفسجي', value: '#8e44ad' },
  { name: 'برتقالي', value: '#d35400' }, { name: 'وردي', value: '#e91e63' },
];

const INIT_NOTIFS = [
  { id: 1, icon: '💬', title: 'رسالة جديدة', body: 'نور: وصلت السوق 🛒', time: 'منذ 5 دقائق', read: false },
  { id: 2, icon: '🎂', title: 'عيد ميلاد قادم', body: 'عيد ميلاد رأفت قريباً!', time: 'اليوم', read: false },
];

export default function App() {
  const [lang, setLang] = useState('ar');
  const t = T[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [page, setPage] = useState('home');
  const [sosActive, setSosActive] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'نور', text: 'وصلت السوق 🛒', time: '10:30', room: 'group' },
    { id: 2, sender: 'رأفت', text: 'تمام ✅', time: '10:31', room: 'group' },
  ]);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, name: 'رأفت', emoji: '👨', text: 'أهلاً بالجميع! 🏠❤️', time: 'منذ ساعة', likes: [], comments: [] },
    { id: 2, name: 'نور', emoji: '👩', text: 'العشاء جاهز 🍽️', time: 'منذ ساعتين', likes: [], comments: [] },
  ]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [reels, setReels] = useState([]);
  const [currentReel, setCurrentReel] = useState(0);
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
  const [themeColor, setThemeColor] = useState('#c0392b');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsNotif, setSettingsNotif] = useState({ messages: true, photos: true, birthdays: true, sos: true });
  const [settingsPrivacy, setSettingsPrivacy] = useState({ showLocation: true, showBirthday: true, showPhone: false });
  const [editProfile, setEditProfile] = useState({ name: '', phone: '', location: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const H = themeColor;

  useEffect(() => { if (user) setEditProfile({ name: user.name, phone: user.phone || '', location: user.location || '' }); }, [user]);

  const NAV = [
    { id: 'home', label: t.home, icon: '🏠' },
    { id: 'reels', label: t.reels, icon: '🎬' },
    { id: 'photos', label: t.photos, icon: '📸' },
    { id: 'videos', label: t.videos, icon: '🎥' },
    { id: 'album', label: t.album, icon: '🖼️' },
    { id: 'music', label: t.music, icon: '🎵' },
    { id: 'posts', label: t.posts, icon: '📝' },
    { id: 'chat', label: t.chat, icon: '💬' },
    { id: 'call', label: t.call, icon: '📞' },
    { id: 'map', label: t.map, icon: '🗺️' },
    { id: 'calendar', label: t.calendar, icon: '📅' },
    { id: 'notifications', label: t.notifications, icon: '🔔' },
    { id: 'profile', label: t.profile, icon: '👤' },
    { id: 'settings', label: t.settings, icon: '⚙️' },
    { id: 'sos', label: t.sos, icon: '🆘' },
  ];

  const startGPS = () => {
    if (!navigator.geolocation) return;
    setTrackingGPS(true);
    navigator.geolocation.watchPosition(
      pos => { setMyLocation([pos.coords.latitude, pos.coords.longitude]); setGpsAccuracy(Math.round(pos.coords.accuracy)); },
      () => setTrackingGPS(false),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
  };
  const stopGPS = () => { setTrackingGPS(false); setMyLocation(null); };

  const handleLogin = () => {
    const found = USERS.find(u => u.email === loginData.email && u.password === loginData.password);
    if (found) { setUser(found); setLoginError(''); }
    else setLoginError('❌ ' + (lang === 'ar' ? 'إيميل أو كلمة مرور غلط!' : 'Correo o contraseña incorrectos!'));
  };

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: msg, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, replyTo: replyTo ? replyTo.text?.substring(0, 50) : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg(''); setReplyTo(null);
  };

  const addPost = () => {
    if (!postText.trim()) return;
    setPosts([{ id: Date.now(), name: user.name, emoji: user.emoji, photo: profilePhoto, text: postText, time: lang === 'ar' ? 'الآن' : 'Ahora', likes: [], comments: [] }, ...posts]);
    setPostText('');
  };

  const handlePhotoUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setPhotos(prev => [...prev, { id: Date.now() + Math.random(), src: ev.target.result, uploader: user.name, time: 'الآن', likes: [], comments: [] }]);
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      setVideos(prev => [...prev, { id: Date.now() + Math.random(), src: URL.createObjectURL(file), uploader: user.name, time: 'الآن', likes: [], comments: [] }]);
    });
  };

  const handleAlbumUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setAlbumPhotos(prev => [...prev, { id: Date.now() + Math.random(), src: ev.target.result, uploader: user.name, time: 'الآن', likes: [], comments: [] }]);
      reader.readAsDataURL(file);
    });
  };

  const handleMusicUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      setMusicList(prev => [...prev, { id: Date.now() + Math.random(), src: URL.createObjectURL(file), name: file.name.replace(/\.[^/.]+$/, ''), uploader: user.name }]);
    });
  };

  const handleReelsUpload = (e) => {
    Array.from(e.target.files).forEach(file => {
      setReels(prev => [...prev, { id: Date.now() + Math.random(), src: URL.createObjectURL(file), uploader: user.name, uploaderEmoji: user.emoji, uploaderPhoto: profilePhoto, caption: '', likes: [], comments: [] }]);
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
        setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: '', audio: URL.createObjectURL(blob), room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]);
        stream.getTracks().forEach(tr => tr.stop());
      };
      recorder.start(); setMediaRecorder(recorder); setIsRecording(true);
    } catch (e) { alert('Mic error'); }
  };
  const stopRecording = () => { if (mediaRecorder) { mediaRecorder.stop(); setIsRecording(false); } };

  const filteredMessages = messages.filter(m =>
    chatRoom === 'group' ? m.room === 'group' || !m.room
      : (m.room === chatRoom || m.to === chatRoom) && (m.sender === user?.name || m.to === user?.name || m.room === chatRoom)
  );

  const handleChangePass = () => {
    if (newPass.current !== user.password) { setPassMsg('❌'); return; }
    if (newPass.new !== newPass.confirm) { setPassMsg('❌'); return; }
    if (newPass.new.length < 6) { setPassMsg('❌'); return; }
    user.password = newPass.new;
    setPassMsg('✅');
    setNewPass({ current: '', new: '', confirm: '' });
  };

  const saveSettings = () => {
    if (editProfile.name.trim()) user.name = editProfile.name;
    if (editProfile.phone.trim()) user.phone = editProfile.phone;
    if (editProfile.location.trim()) user.location = editProfile.location;
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    const colors = { birthday: '#e74c3c', anniversary: '#9b59b6', trip: '#2ecc71', event: '#3498db', other: '#f39c12' };
    setEvents(prev => [...prev, { id: Date.now(), ...newEvent, color: colors[newEvent.type] || '#3498db' }]);
    setNewEvent({ title: '', date: '', type: 'event', emoji: '📅' }); setShowAddEvent(false);
  };

  const sortedEvents = [...events].sort((a, b) => daysUntil(a.date) - daysUntil(b.date));
  const getDaysInMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDay = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const monthEvents = events.filter(e => { const d = new Date(e.date); return d.getMonth() === calMonth.getMonth() && d.getFullYear() === calMonth.getFullYear(); });
  const mapCenter = myLocation || [9.9281, -84.0907];

  const CH = (left, right) => (
    <div style={s.cardHeader}>
      <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{left}</span>
      {right}
    </div>
  );

  if (!user) {
    return (
      <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: dir, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: H, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 20 }}>Familia Alawar</span>
          <button onClick={() => setLang(lang === 'ar' ? 'es' : 'ar')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>
            {lang === 'ar' ? '🇪🇸 Español' : '🇸🇾 عربي'}
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
          <img src="/logo.png" alt="Familia Alawar" style={{ width: 150, height: 150, borderRadius: 16, marginBottom: 20, objectFit: 'contain' }} />
          <h1 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 28, margin: '0 0 8px', textAlign: 'center' }}>{t.welcome}</h1>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 40, textAlign: 'center' }}>{t.subtitle}</p>
          <div style={{ width: '100%', maxWidth: 400, background: '#3d3d3d', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ background: H, padding: '16px 24px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 18, margin: 0 }}>{t.login}</h2>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>{t.email}</label>
                <input type="email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} style={s.input} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>{t.password}</label>
                <input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} onKeyPress={e => e.key === 'Enter' && handleLogin()} style={s.input} />
              </div>
              {loginError && <div style={{ background: 'rgba(192,57,43,0.2)', borderRadius: 10, padding: '10px', color: '#ff6b6b', fontSize: 13, textAlign: 'center', marginBottom: 16 }}>{loginError}</div>}
              <button onClick={handleLogin} style={s.btn(H)}>{t.loginBtn}</button>
            </div>
          </div>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Tajawal, sans-serif', background: C.bg, minHeight: '100vh', color: '#fff', direction: dir, display: 'flex', flexDirection: 'column' }}>

      {sosActive && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#3d3d3d', border: `2px solid ${H}`, borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 60 }}>🆘</div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', color: H, fontSize: 28, margin: '16px 0' }}>{t.emergencyAlert}</h2>
            {myLocation && <p style={{ color: '#2ecc71', fontSize: 12 }}>📍 {myLocation[0].toFixed(4)}, {myLocation[1].toFixed(4)}</p>}
            <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>{t.sentLocation}</p>
            <button onClick={() => setSosActive(false)} style={{ background: H, color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{t.cancelSOS}</button>
          </div>
        </div>
      )}

      {showNotifPanel && (
        <div style={{ position: 'fixed', top: 70, left: 20, width: 360, background: '#2d2d2d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', background: '#383838', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>🔔</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} style={{ background: 'transparent', border: 'none', color: H, cursor: 'pointer', fontSize: 12 }}>{t.readAll}</button>
              <button onClick={() => setShowNotifPanel(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
          </div>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {notifications.slice(0, 10).map(n => (
              <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: n.read ? 'transparent' : `${H}15`, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.read ? '#444' : H, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: n.read ? 400 : 700, fontSize: 13 }}>{n.title}</div>
                  <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{n.body}</div>
                </div>
                {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: H, flexShrink: 0, marginTop: 4 }}></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <Clock lang={lang} />

      <div style={{ background: H, padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16 }}>Familia Alawar</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {trackingGPS && <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(46,204,113,0.2)', padding: '4px 10px', borderRadius: 20, fontSize: 12, color: '#2ecc71' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ecc71' }}></div>GPS</div>}
          <Avatar photo={profilePhoto} emoji={user.emoji} size={32} />
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13 }}>{t.hello} {user.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setLang(lang === 'ar' ? 'es' : 'ar')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 20, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 12, fontWeight: 700 }}>
            {lang === 'ar' ? '🇪🇸 ES' : '🇸🇾 AR'}
          </button>
          <button onClick={() => setShowNotifPanel(!showNotifPanel)} style={{ position: 'relative', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 38, height: 38, borderRadius: 8, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🔔
            {unreadCount > 0 && <div style={{ position: 'absolute', top: -4, right: -4, background: '#e74c3c', color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${H}` }}>{unreadCount}</div>}
          </button>
          <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700 }}>{t.logout}</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 190, background: '#2d2d2d', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '12px 0', flexShrink: 0, overflowY: 'auto' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setPage(n.id); setShowNotifPanel(false); if (n.id === 'sos') setSosActive(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: page === n.id ? `${H}30` : 'transparent', border: 'none', borderRight: page === n.id ? `3px solid ${H}` : '3px solid transparent', color: page === n.id ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: page === n.id ? 700 : 400, textAlign: 'right', width: '100%' }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.id === 'notifications' && unreadCount > 0 && <span style={{ marginRight: 'auto', background: H, color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{unreadCount}</span>}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>

          {/* HOME */}
          {page === 'home' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🏠 {t.home}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { label: t.family, value: '4', icon: '👨‍👩‍👧‍👦' },
                  { label: t.online, value: '3', icon: '🟢' },
                  { label: t.sharedPhotos, value: photos.length.toString(), icon: '📸' },
                  { label: t.newNotif, value: unreadCount.toString(), icon: '🔔' },
                ].map((stat, i) => (
                  <div key={i} style={{ ...s.card, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 28, fontWeight: 700, color: H }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...s.card, marginBottom: 24 }}>
                {CH('🎂 ' + t.birthdays)}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {USERS.map((u, i) => {
                    const days = daysUntil(u.birthday);
                    return (
                      <div key={i} style={{ padding: '16px 20px', borderLeft: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', textAlign: 'center' }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{u.emoji}</div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                        <div style={{ background: days === 0 ? H : `${H}30`, borderRadius: 20, padding: '4px 12px', display: 'inline-block', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13, color: days <= 7 ? '#ff6b6b' : '#fff', marginTop: 8 }}>
                          {days === 0 ? t.today : `${days} ${t.days}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div style={s.card}>
                  {CH('👨‍👩‍👧‍👦 ' + t.family)}
                  {MEMBERS.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ position: 'relative' }}>
                        <Avatar photo={m.name === user.name ? profilePhoto : null} emoji={m.emoji} size={40} />
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: m.status === 'online' ? '#2ecc71' : '#f39c12', border: '2px solid #3d3d3d' }}></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📍 {m.location}</div>
                      </div>
                      <div style={{ fontSize: 12, color: m.status === 'online' ? '#2ecc71' : '#f39c12' }}>{m.status === 'online' ? t.connected : t.away}</div>
                    </div>
                  ))}
                </div>
                <div style={s.card}>
                  {CH('📅 ' + t.upcomingEvents)}
                  {sortedEvents.slice(0, 4).map((e, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: e.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{e.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{e.title}</div>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{e.date}</div>
                      </div>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: e.color }}>{daysUntil(e.date)} {t.days}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={s.card}>
                {CH('🗺️ ' + t.familyLocations, <span style={{ fontSize: 12, color: '#2ecc71' }}>{t.live}</span>)}
                <MapContainer center={mapCenter} zoom={12} style={{ height: 300, width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {FAMILY_LOCATIONS.map((loc, i) => (<Marker key={i} position={loc.position}><Popup>{loc.emoji} {loc.name}</Popup></Marker>))}
                  {myLocation && <><Marker position={myLocation} icon={gpsIcon}><Popup>📍 {user.name}</Popup></Marker><Circle center={myLocation} radius={gpsAccuracy || 50} color={H} fillColor={H} fillOpacity={0.1} /></>}
                </MapContainer>
              </div>
            </div>
          )}

          {/* REELS */}
          {page === 'reels' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🎬 {t.reels}</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="video/*" multiple id="reelsUpload" style={{ display: 'none' }} onChange={handleReelsUpload} />
                <label htmlFor="reelsUpload" style={{ display: 'inline-block', background: H, color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>{t.addReels}</label>
              </div>
              {reels.length === 0 ? (
                <div style={{ ...s.card, padding: 60, textAlign: 'center' }}>
                  <div style={{ fontSize: 70, marginBottom: 16 }}>🎬</div>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>{t.noReels}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 20 }}>
                  {/* مشغل الريلز */}
                  <div style={{ width: 360, height: 640, flexShrink: 0 }}>
                    <ReelItem
                      reel={reels[currentReel]}
                      user={user}
                      color={H}
                      t={t}
                      onUpdate={updated => setReels(prev => prev.map(r => r.id === updated.id ? updated : r))}
                    />
                  </div>
                  {/* قائمة الريلز */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {reels.map((r, i) => (
                      <div key={r.id} onClick={() => setCurrentReel(i)}
                        style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 12, padding: 12, cursor: 'pointer', border: i === currentReel ? `2px solid ${H}` : '1px solid rgba(255,255,255,0.08)' }}>
                        <video src={r.src} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                        <div>
                          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{r.uploader}</div>
                          <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>❤️ {r.likes?.length || 0}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PHOTOS */}
          {page === 'photos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📸 {t.photos}</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="image/*" multiple id="photoUpload" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                <label htmlFor="photoUpload" style={{ display: 'inline-block', background: H, color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>{t.uploadPhoto}</label>
              </div>
              {photos.length === 0 ? <div style={{ ...s.card, padding: 40, textAlign: 'center' }}><div style={{ fontSize: 60 }}>📸</div><p style={{ color: 'rgba(255,255,255,0.6)' }}>{t.noPhotos}</p></div>
                : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
                  {photos.map(p => (
                    <div key={p.id} style={s.card}>
                      <img src={p.src} alt="" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                      <div style={{ padding: '10px 14px' }}>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{p.uploader}</div>
                      </div>
                      <LikeComment item={p} user={user} color={H} t={t} onUpdate={updated => setPhotos(prev => prev.map(x => x.id === updated.id ? updated : x))} />
                    </div>
                  ))}
                </div>}
            </div>
          )}

          {/* VIDEOS */}
          {page === 'videos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🎥 {t.videos}</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="video/*" multiple id="videoUpload" style={{ display: 'none' }} onChange={handleVideoUpload} />
                <label htmlFor="videoUpload" style={{ display: 'inline-block', background: H, color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>{t.uploadVideo}</label>
              </div>
              {videos.length === 0 ? <div style={{ ...s.card, padding: 40, textAlign: 'center' }}><div style={{ fontSize: 60 }}>🎥</div><p style={{ color: 'rgba(255,255,255,0.6)' }}>{t.noVideos}</p></div>
                : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {videos.map(v => (
                    <div key={v.id} style={s.card}>
                      <video src={v.src} controls style={{ width: '100%', height: 200 }} />
                      <div style={{ padding: '10px 14px' }}><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{v.uploader}</div></div>
                      <LikeComment item={v} user={user} color={H} t={t} onUpdate={updated => setVideos(prev => prev.map(x => x.id === updated.id ? updated : x))} />
                    </div>
                  ))}
                </div>}
            </div>
          )}

          {/* ALBUM */}
          {page === 'album' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🖼️ {t.familyAlbum}</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="image/*" multiple id="albumUpload" style={{ display: 'none' }} onChange={handleAlbumUpload} />
                <label htmlFor="albumUpload" style={{ display: 'inline-block', background: H, color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>{t.addPhoto}</label>
              </div>
              {albumPhotos.length === 0 ? (
                <div style={{ ...s.card, padding: 60, textAlign: 'center' }}>
                  <div style={{ fontSize: 70, marginBottom: 16 }}>🖼️</div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>{lang === 'ar' ? 'الألبوم فارغ!' : '¡Álbum vacío!'}</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                  {albumPhotos.map(p => (
                    <div key={p.id} style={s.card}>
                      <img src={p.src} alt="" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                      <div style={{ padding: '10px 14px' }}><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{p.uploader}</div></div>
                      <LikeComment item={p} user={user} color={H} t={t} onUpdate={updated => setAlbumPhotos(prev => prev.map(x => x.id === updated.id ? updated : x))} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MUSIC */}
          {page === 'music' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🎵 {t.musicShare}</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <input type="file" accept="audio/*" multiple id="musicUpload" style={{ display: 'none' }} onChange={handleMusicUpload} />
                <label htmlFor="musicUpload" style={{ display: 'inline-block', background: H, color: '#fff', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700 }}>{t.addMusic}</label>
              </div>
              {musicList.length === 0 ? (
                <div style={{ ...s.card, padding: 60, textAlign: 'center' }}>
                  <div style={{ fontSize: 70, marginBottom: 16 }}>🎵</div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>{lang === 'ar' ? 'لا توجد موسيقى بعد!' : '¡No hay música aún!'}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {musicList.map(m => (
                    <div key={m.id} style={{ ...s.card, padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                        <div style={{ width: 50, height: 50, borderRadius: 12, background: `${H}30`, border: `2px solid ${H}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🎵</div>
                        <div>
                          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                          <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{m.uploader}</div>
                        </div>
                      </div>
                      <audio src={m.src} controls style={{ width: '100%' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* POSTS */}
          {page === 'posts' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📝 {t.posts}</h2>
              <div style={{ ...s.card, marginBottom: 16 }}>
                <div style={{ padding: 20 }}>
                  <textarea placeholder={t.writeSomething} value={postText} onChange={e => setPostText(e.target.value)} style={{ ...s.input, height: 100, resize: 'none', marginBottom: 12 }} />
                  <button onClick={addPost} style={{ ...s.btn(H), width: 'auto', padding: '10px 24px' }}>{t.publish}</button>
                </div>
              </div>
              {posts.map((p, i) => (
                <div key={i} style={{ ...s.card, marginBottom: 12 }}>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <Avatar photo={p.photo} emoji={p.emoji} size={40} />
                      <div><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{p.name}</div><div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{p.time}</div></div>
                    </div>
                    <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{p.text}</p>
                  </div>
                  <LikeComment item={p} user={user} color={H} t={t} onUpdate={updated => setPosts(prev => prev.map(x => x.id === updated.id ? updated : x))} />
                </div>
              ))}
            </div>
          )}

          {/* CHAT */}
          {page === 'chat' && (
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, height: 600 }}>
              <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
                {CH('💬 ' + t.chat)}
                <div onClick={() => setChatRoom('group')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: chatRoom === 'group' ? `${H}30` : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: chatRoom === 'group' ? `3px solid ${H}` : '3px solid transparent' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: H, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍👩‍👧‍👦</div>
                  <div><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{t.familyGroup}</div></div>
                </div>
                {MEMBERS.filter(m => m.name !== user.name).map((m, i) => (
                  <div key={i} onClick={() => setChatRoom(m.name)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', background: chatRoom === m.name ? `${H}30` : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRight: chatRoom === m.name ? `3px solid ${H}` : '3px solid transparent' }}>
                    <div style={{ position: 'relative' }}>
                      <Avatar photo={null} emoji={m.emoji} size={40} />
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: m.status === 'online' ? '#2ecc71' : '#f39c12', border: '2px solid #3d3d3d' }}></div>
                    </div>
                    <div><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{m.name}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
                {CH(chatRoom === 'group' ? '👨‍👩‍👧‍👦 ' + t.familyGroup : '💬 ' + chatRoom)}
                <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {filteredMessages.map(m => (
                    <div key={m.id}>
                      <div style={{ display: 'flex', flexDirection: m.sender === user.name ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end' }}>
                        <Avatar photo={m.sender === user.name ? profilePhoto : null} emoji={MEMBERS.find(mb => mb.name === m.sender)?.emoji || '👤'} size={30} />
                        <div style={{ maxWidth: '70%' }}>
                          {m.replyTo && <div style={{ background: 'rgba(255,255,255,0.05)', borderRight: `2px solid ${H}`, padding: '4px 8px', borderRadius: 6, marginBottom: 4, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>↩️ {m.replyTo}</div>}
                          <div style={{ background: m.sender === user.name ? `${H}30` : '#444', borderRadius: 14, padding: '8px 14px', fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{m.sender} · {m.time}</div>
                            {m.image && <img src={m.image} alt="" style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 4 }} />}
                            {m.audio && <audio src={m.audio} controls style={{ width: '100%', marginTop: 4 }} />}
                            {m.text}
                          </div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 3, justifyContent: m.sender === user.name ? 'flex-start' : 'flex-end' }}>
                            <button onClick={() => setReplyTo(m)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, padding: '2px 6px' }}>↩️</button>
                            {m.sender === user.name && <button onClick={() => setMessages(prev => prev.filter(x => x.id !== m.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 11, padding: '2px 6px' }}>🗑️</button>}
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>✅</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {replyTo && (
                  <div style={{ padding: '8px 16px', background: `${H}15`, borderTop: `1px solid ${H}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>↩️ {replyTo.text?.substring(0, 30)}</span>
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
                    onChange={e => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => setMessages(prev => [...prev, { id: Date.now(), sender: user.name, text: '', image: ev.target.result, room: chatRoom, to: chatRoom !== 'group' ? chatRoom : null, time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) }]); reader.readAsDataURL(file); }}
                  />
                  <label htmlFor="chatImage" style={{ width: 38, height: 38, background: '#444', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>📎</label>
                  <button onMouseDown={startRecording} onMouseUp={stopRecording} onTouchStart={startRecording} onTouchEnd={stopRecording} style={{ width: 38, height: 38, background: isRecording ? '#e74c3c' : '#444', border: 'none', borderRadius: 10, color: '#fff', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>🎤</button>
                  <input value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMsg()} placeholder="..." style={{ flex: 1, background: '#444', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontFamily: 'Tajawal, sans-serif', fontSize: 14, outline: 'none' }} />
                  <button onClick={sendMsg} style={{ width: 42, height: 42, background: H, border: 'none', borderRadius: 10, color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
                </div>
              </div>
            </div>
          )}

          {/* CALL */}
          {page === 'call' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📞 {t.call}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📞</div>
                  <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 12 }}>{t.voiceCall}</h3>
                  <button onClick={() => window.open('https://meet.jit.si/FamiliaAlawar-Voice', '_blank')} style={{ ...s.btn(H), width: 'auto', padding: '12px 32px' }}>{t.startVoice}</button>
                </div>
                <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📹</div>
                  <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 12 }}>{t.videoCall}</h3>
                  <button onClick={() => window.open('https://meet.jit.si/FamiliaAlawar-Video', '_blank')} style={{ ...s.btn(H), width: 'auto', padding: '12px 32px' }}>{t.startVideo}</button>
                </div>
              </div>
            </div>
          )}

          {/* MAP */}
          {page === 'map' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🗺️ {t.map}</h2>
              <div style={{ ...s.card, padding: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15 }}>{t.gpsReal}</div>
                    <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{trackingGPS ? (myLocation ? `${myLocation[0].toFixed(5)}, ${myLocation[1].toFixed(5)}` : '...') : t.gpsStopped}</div>
                  </div>
                  {!trackingGPS ? <button onClick={startGPS} style={{ ...s.btn('#2ecc71'), width: 'auto', padding: '10px 24px' }}>{t.activateGPS}</button>
                    : <button onClick={stopGPS} style={{ ...s.btn('#e74c3c'), width: 'auto', padding: '10px 24px' }}>{t.stopGPS}</button>}
                </div>
              </div>
              <div style={s.card}>
                {CH(t.currentLocations, <span style={{ fontSize: 12, color: '#2ecc71' }}>{t.live}</span>)}
                <MapContainer center={mapCenter} zoom={13} style={{ height: 500, width: '100%' }}>
                  <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {FAMILY_LOCATIONS.map((loc, i) => (<Marker key={i} position={loc.position}><Popup>{loc.emoji} {loc.name}</Popup></Marker>))}
                  {myLocation && (<><Marker position={myLocation} icon={gpsIcon}><Popup>{user.emoji} {user.name}</Popup></Marker><Circle center={myLocation} radius={gpsAccuracy || 50} color={H} fillColor={H} fillOpacity={0.1} /></>)}
                </MapContainer>
              </div>
            </div>
          )}

          {/* CALENDAR */}
          {page === 'calendar' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>📅 {t.calendar}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                <div style={s.card}>
                  <div style={s.cardHeader}>
                    <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>›</button>
                    <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{calMonth.toLocaleDateString(lang === 'ar' ? 'ar' : 'es', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>‹</button>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                      {['أح','إث','ث','أر','خ','ج','س'].map((d, i) => (<div key={i} style={{ textAlign: 'center', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{d}</div>))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                      {Array.from({ length: getFirstDay(calMonth) }).map((_, i) => <div key={i} />)}
                      {Array.from({ length: getDaysInMonth(calMonth) }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const hasEvent = monthEvents.some(e => e.date === dateStr);
                        const isToday = new Date().toDateString() === new Date(calMonth.getFullYear(), calMonth.getMonth(), day).toDateString();
                        return (<div key={i} style={{ textAlign: 'center', padding: '6px 2px', borderRadius: 8, background: isToday ? H : hasEvent ? `${H}30` : 'transparent', fontFamily: 'Cairo, sans-serif', fontSize: 13, color: '#fff' }}>{day}{hasEvent && !isToday && <div style={{ width: 4, height: 4, borderRadius: '50%', background: H, margin: '2px auto 0' }} />}</div>);
                      })}
                    </div>
                  </div>
                </div>
                <div style={s.card}>
                  {CH('📋', <button onClick={() => setShowAddEvent(!showAddEvent)} style={{ background: H, border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>+</button>)}
                  {showAddEvent && (
                    <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <input placeholder="..." value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} style={{ ...s.input, fontSize: 13, padding: '10px 14px' }} />
                        <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} style={{ ...s.input, fontSize: 13, padding: '10px 14px' }} />
                        <button onClick={addEvent} style={{ ...s.btn(H), padding: '10px', fontSize: 13 }}>✓</button>
                      </div>
                    </div>
                  )}
                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {sortedEvents.map((e, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: e.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{e.emoji}</div>
                        <div style={{ flex: 1 }}><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13 }}>{e.title}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{e.date}</div></div>
                        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16, color: e.color }}>{daysUntil(e.date)}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{t.days}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {page === 'notifications' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🔔 {t.notifications}</h2>
              <div style={s.card}>
                {CH(`${t.allNotifications} (${notifications.length})`,
                  <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} style={{ background: `${H}20`, border: `1px solid ${H}40`, color: H, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>{t.readAll}</button>
                )}
                {notifications.map(n => (
                  <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                    style={{ display: 'flex', gap: 14, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: n.read ? 'transparent' : `${H}10`, cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: n.read ? '#444' : H, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: n.read ? 400 : 700, fontSize: 14 }}>{n.title}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{n.body}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{n.time}</div>
                    </div>
                    {!n.read && <div style={{ width: 10, height: 10, borderRadius: '50%', background: H, flexShrink: 0, marginTop: 6 }}></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE */}
          {page === 'profile' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>👤 {t.myProfile}</h2>
              <div style={{ ...s.card, marginBottom: 20 }}>
                <div style={{ background: H, padding: '40px 24px', textAlign: 'center' }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, margin: '0 auto 12px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.3)' }}>
                    {profilePhoto ? <img src={profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{user.emoji}</span>}
                  </div>
                  <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 22, margin: '0 0 4px' }}>{user.name}</h2>
                  <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 14, opacity: 0.85, margin: 0 }}>{user.role}</p>
                </div>
                <div style={{ padding: 24 }}>
                  {[
                    { icon: '📧', label: t.email, value: user.email },
                    { icon: '📱', label: t.phone, value: settingsPrivacy.showPhone ? (user.phone || '-') : '••••••••' },
                    { icon: '📍', label: t.location, value: user.location || '-' },
                    { icon: '🎂', label: lang === 'ar' ? 'تاريخ الميلاد' : 'Cumpleaños', value: settingsPrivacy.showBirthday ? (user.birthday || '-') : '••••••••' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.label}</div>
                        <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 14 }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={s.card}>
                {CH('🔑 ' + t.changePass)}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input type="password" placeholder={t.currentPass} value={newPass.current} onChange={e => setNewPass({ ...newPass, current: e.target.value })} style={s.input} />
                  <input type="password" placeholder={t.newPassLabel} value={newPass.new} onChange={e => setNewPass({ ...newPass, new: e.target.value })} style={s.input} />
                  <input type="password" placeholder={t.confirmPass} value={newPass.confirm} onChange={e => setNewPass({ ...newPass, confirm: e.target.value })} style={s.input} />
                  {passMsg && <div style={{ background: passMsg.includes('✅') ? 'rgba(46,204,113,0.1)' : 'rgba(192,57,43,0.1)', borderRadius: 10, padding: '10px', color: passMsg.includes('✅') ? '#2ecc71' : '#ff6b6b', fontSize: 13 }}>{passMsg}</div>}
                  <button onClick={handleChangePass} style={{ ...s.btn(H), width: 'auto', padding: '10px 24px' }}>{t.saveChanges}</button>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {page === 'settings' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>⚙️ {t.settingsTitle}</h2>
              {settingsSaved && <div style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)', borderRadius: 12, padding: '12px 20px', marginBottom: 20, color: '#2ecc71', fontSize: 14 }}>{t.saved}</div>}

              <div style={{ ...s.card, marginBottom: 20 }}>
                {CH('📷 ' + t.profilePhoto)}
                <div style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#444', border: `3px solid ${H}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, overflow: 'hidden' }}>
                      {profilePhoto ? <img src={profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{user.emoji}</span>}
                    </div>
                    <label htmlFor="profilePhotoUpload" style={{ position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, background: H, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, border: '2px solid #3d3d3d' }}>📷</label>
                    <input type="file" accept="image/*" id="profilePhotoUpload" style={{ display: 'none' }}
                      onChange={e => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => setProfilePhoto(ev.target.result); reader.readAsDataURL(file); }}
                    />
                  </div>
                  {profilePhoto && <button onClick={() => setProfilePhoto(null)} style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#ff6b6b', padding: '6px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>🗑️</button>}
                </div>
              </div>

              <div style={{ ...s.card, marginBottom: 20 }}>
                {CH('🌍 ' + (lang === 'ar' ? 'اللغة' : 'Idioma'))}
                <div style={{ padding: 20, display: 'flex', gap: 12 }}>
                  <button onClick={() => setLang('ar')} style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${lang === 'ar' ? H : 'rgba(255,255,255,0.1)'}`, background: lang === 'ar' ? `${H}20` : 'transparent', color: '#fff', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15 }}>🇸🇾 عربي</button>
                  <button onClick={() => setLang('es')} style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${lang === 'es' ? H : 'rgba(255,255,255,0.1)'}`, background: lang === 'es' ? `${H}20` : 'transparent', color: '#fff', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15 }}>🇪🇸 Español</button>
                </div>
              </div>

              <div style={{ ...s.card, marginBottom: 20 }}>
                {CH('🎨 ' + t.themeColor)}
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
                    {THEME_COLORS.map((c, i) => (
                      <div key={i} onClick={() => setThemeColor(c.value)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.value, margin: '0 auto 6px', border: themeColor === c.value ? '3px solid #fff' : '3px solid transparent', boxShadow: themeColor === c.value ? `0 0 12px ${c.value}` : 'none' }} />
                        <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ ...s.card, marginBottom: 20 }}>
                {CH('👤 ' + t.editInfo)}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { key: 'name', label: t.name, placeholder: user.name },
                    { key: 'phone', label: t.phone, placeholder: user.phone || '+506...' },
                    { key: 'location', label: t.location, placeholder: user.location || 'Costa Rica' },
                  ].map((item, i) => (
                    <div key={i}>
                      <label style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6, display: 'block' }}>{item.label}</label>
                      <input value={editProfile[item.key]} onChange={e => setEditProfile({ ...editProfile, [item.key]: e.target.value })} placeholder={item.placeholder} style={s.input} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...s.card, marginBottom: 20 }}>
                {CH('🔒 ' + t.privacy)}
                <div style={{ padding: 20 }}>
                  {[
                    { key: 'showLocation', label: t.showLocation, icon: '📍' },
                    { key: 'showBirthday', label: t.showBirthday, icon: '🎂' },
                    { key: 'showPhone', label: t.showPhone, icon: '📱' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 14 }}>{item.label}</span>
                      </div>
                      <Toggle value={settingsPrivacy[item.key]} onChange={v => setSettingsPrivacy({ ...settingsPrivacy, [item.key]: v })} color={H} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...s.card, marginBottom: 20 }}>
                {CH('📍 GPS')}
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14 }}>{lang === 'ar' ? 'تتبع الموقع' : 'Rastreo'}</div>
                      <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{trackingGPS ? t.gpsActive : t.gpsStopped}</div>
                    </div>
                    <Toggle value={trackingGPS} onChange={v => v ? startGPS() : stopGPS()} color={H} />
                  </div>
                  {myLocation && <div style={{ marginTop: 12, background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.2)', borderRadius: 10, padding: '10px 14px', color: '#2ecc71', fontSize: 13 }}>📍 {myLocation[0].toFixed(5)}, {myLocation[1].toFixed(5)}</div>}
                </div>
              </div>

              <button onClick={saveSettings} style={{ ...s.btn(H), fontSize: 16 }}>{t.saveAll}</button>
            </div>
          )}

          {/* SOS */}
          {page === 'sos' && (
            <div>
              <h2 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: 20, fontSize: 22 }}>🆘 {t.emergency}</h2>
              <div style={{ ...s.card, padding: 40, textAlign: 'center' }}>
                {myLocation && <div style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)', borderRadius: 10, padding: '10px 20px', marginBottom: 24, color: '#2ecc71', fontSize: 13 }}>📍 {myLocation[0].toFixed(5)}, {myLocation[1].toFixed(5)}</div>}
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 15 }}>{t.emergencyMsg}</p>
                <button onClick={() => { if (!trackingGPS) startGPS(); setSosActive(true); }} style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, #e74c3c, #c0392b)', border: '4px solid rgba(192,57,43,0.4)', color: 'white', fontSize: 32, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 40px rgba(192,57,43,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
                  <span>SOS</span>
                </button>
                <p style={{ fontFamily: 'Tajawal, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 24 }}>⚠️</p>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}