import axios from 'axios';

// إنشاء مثيل جديد من Axios
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // تعديل هذا بناءً على عنوان الـ API الخاص بك
});

// إعداد التوكن في الهيدر بشكل افتراضي
const token = localStorage.getItem('authToken');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
