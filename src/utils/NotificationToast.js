import Toast from 'react-native-toast-message';

/**
 * Hiển thị thông báo thành công.
 * @param {string} title - Dòng tiêu đề.
 * @param {string} message - Dòng thông điệp chi tiết.
 */
const success = (title, message) => {   
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    visibilityTime: 1000,
  });
};

/**
 * Hiển thị thông báo lỗi.
 * @param {string} title - Dòng tiêu đề.
 * @param {string} message - Dòng thông điệp chi tiết.
 */
const error = (title, message) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: 2000,
  });
};

/**
 * Hiển thị thông báo thông tin.
 * @param {string} title - Dòng tiêu đề.
 * @param {string} message - Dòng thông điệp chi tiết.
 */
const info = (title, message) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    visibilityTime: 2000,
  });
};

const NotificationToast = {  
  success,
  error,
  info,
};

export default NotificationToast;