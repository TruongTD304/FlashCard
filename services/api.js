import axios from 'axios';

// Tạo instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://localhost:5000', // Điều chỉnh URL của API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý các lỗi response
    if (error.response) {
      // Lỗi server trả về
      console.log('Error response:', error.response.data);
      
      // Kiểm tra nếu là lỗi unauthorized (401)
      if (error.response.status === 401) {
        // Có thể làm gì đó khi token hết hạn (ví dụ: đăng xuất)
        console.log('Unauthorized: Token expired or invalid');
      }
      
    } else if (error.request) {
      // Lỗi không nhận được response
      console.log('Error request:', error.request);
    } else {
      // Lỗi khác
      console.log('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;