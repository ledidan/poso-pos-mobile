import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OtpInput from '@twotalltotems/react-native-otp-input';

const OtpScreen = ({ route, navigation }) => {
  const { phone } = route.params; // Nhận SĐT từ màn hình trước
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2 phút = 120 giây

  // useEffect(() => {
  //   if (timer === 0) return;
  //   const interval = setInterval(() => {
  //     setTimer((prev) => prev - 1);
  //   }, 1000);
  //   return () => clearInterval(interval); // Dọn dẹp khi component unmount
  // }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setTimer(120);
    // Thêm logic gửi lại OTP ở đây
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Body */}
      <View style={styles.body}>
        {/* <Text style={styles.title}>Xác thực số điện thoại</Text>
        <Text style={styles.subtitle}>
          OTP đã được gửi đến Zalo của số điện thoại
        </Text> */}
        <Text style={styles.title}>Xác thực mã PIN của cửa hàng</Text>
        {/* <Text style={styles.subtitle}>
          Mã PIN đã được gửi đến Zalo của số điện thoại
        </Text> */}
        <Text style={styles.phoneText}>{phone}</Text>

        <OtpInput
          style={styles.otpContainer}
          pinCount={6}
          code={otp}
          onCodeChanged={setOtp}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpInput}
        />

        {/* <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
          <Text style={styles.resendText}>
            {timer > 0 ? `Gửi lại OTP sau ${formatTime(timer)}` : 'Gửi lại OTP'}
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.button, !otp || otp.length < 6 ? styles.buttonDisabled : {}]}
          disabled={!otp || otp.length < 6}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { padding: 16 },
    body: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: '10%' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
    phoneText: { fontSize: 16, color: '#333', fontWeight: 'bold', marginVertical: 8 },
    otpContainer: { width: '100%', height: 100 },
    otpInput: { width: 45, height: 55, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, color: 'black', fontSize: 20 },
    resendText: { color: '#FF3B30', fontSize: 16, marginVertical: 24 },
    button: { backgroundColor: '#3B82F6', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 16 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    buttonDisabled: { backgroundColor: '#D1D5DB' }
});

export default OtpScreen;