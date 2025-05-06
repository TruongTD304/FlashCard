import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kiểm tra người dùng đã đăng nhập chưa khi mở app
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        
        if (userData && token) {
          setUser(JSON.parse(userData));
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.log('Error checking user login:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Đăng nhập
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API đăng nhập
      const response = await api.post('/auth/login', { email, password });
      
      // Lưu thông tin người dùng và token vào AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('token', response.data.token);
      
      // Lưu token vào header của axios
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Cập nhật state
      setUser(response.data.user);
      
      showMessage({
        message: 'Đăng nhập thành công',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
      showMessage({
        message: error.response?.data?.message || 'Đăng nhập thất bại',
        type: 'danger',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API đăng ký
      const response = await api.post('/auth/register', { 
        username, 
        email, 
        password,
        role: 'user'
      });
      
      showMessage({
        message: 'Đăng ký thành công',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng ký thất bại');
      showMessage({
        message: error.response?.data?.message || 'Đăng ký thất bại',
        type: 'danger',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      // Xóa thông tin người dùng và token khỏi AsyncStorage
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      
      // Xóa token khỏi header của axios
      delete api.defaults.headers.common['Authorization'];
      
      // Cập nhật state
      setUser(null);
      
      showMessage({
        message: 'Đăng xuất thành công',
        type: 'success',
      });
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  // Quên mật khẩu
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API quên mật khẩu
      await api.post('/auth/forgot-password', { email });
      
      showMessage({
        message: 'Hãy kiểm tra email của bạn để đặt lại mật khẩu',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Không thể xử lý yêu cầu');
      showMessage({
        message: error.response?.data?.message || 'Không thể xử lý yêu cầu',
        type: 'danger',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật thông tin người dùng
  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API cập nhật thông tin người dùng
      const response = await api.put(`/users/${user._id}`, userData);
      
      // Cập nhật thông tin người dùng trong AsyncStorage
      const updatedUser = { ...user, ...response.data };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Cập nhật state
      setUser(updatedUser);
      
      showMessage({
        message: 'Cập nhật thông tin thành công',
        type: 'success',
      });
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Cập nhật thông tin thất bại');
      showMessage({
        message: error.response?.data?.message || 'Cập nhật thông tin thất bại',
        type: 'danger',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};