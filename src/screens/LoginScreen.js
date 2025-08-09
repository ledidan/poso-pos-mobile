import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleLogin = () => {
    if (email === "phu159123@gmail.com" && password === "1234") {
      navigation.replace("MainTabNavigator");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back to the app</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="hello@example.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordLabelWrapper}>
        <Text style={styles.label}>Password</Text>
        <Pressable onPress={() => {}} style={{ marginLeft: "auto" }}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="••••••••••••"
          secureTextEntry={secureText}
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxRow}>

      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.orWrapper}>
        <View style={styles.line} />
        <Text style={styles.orText}>or sign in with</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={20} color="#EA4335" />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.createAccount}>Create an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  label: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },
  passwordLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 6,
  },
  forgot: {
    fontSize: 13,
    color: "#3366FF",
    fontWeight: "500",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#3366FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 25,
  },
  googleText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  createAccount: {
    textAlign: "center",
    color: "#3366FF",
    fontWeight: "500",
    fontSize: 15,
  },
});
