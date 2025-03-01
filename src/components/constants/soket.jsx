import { io } from 'socket.io-client';

// const socket = io('https://facebook-backend-production-110d.up.railway.app'); // تعديل الرابط حسب خادمك
// const socket = io(`https://facebook-backend-production-110d.up.railway.app`, {
//     transports: ["websocket", "polling"], // دعم النقل عبر Polling وWebSocket
//     withCredentials: true
// });

// const socket = io('http://localhost:3000', {
//     reconnection: true,        // السماح بإعادة الاتصال تلقائيًا
//     reconnectionAttempts: 5,  // عدد محاولات إعادة الاتصال
//     reconnectionDelay: 1000,  // مدة التأخير بين المحاولات
// });
// const socket = io('http://localhost:5000', {
//     transports: ['websocket', 'polling'],
//     reconnection: true,
//     withCredentials: true
// });
const socket = io('https://crm-back-production-32bf.up.railway.app', {
    transports: ['websocket', 'polling'],
    reconnection: true,
    withCredentials: true
});
export default socket;