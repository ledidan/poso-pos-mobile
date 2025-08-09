import React, { useEffect, useState } from "react";
import {
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import Voice from "@react-native-voice/voice";
import { Image } from "expo-image";
import Ripple from "./Ripple";
import NotificationToast from "../../utils/NotificationToast";
const VoiceInput = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => console.log("Speech started");
    Voice.onSpeechResults = (event) => {
      const speechText = event.value?.[0] || "";
      onResult(speechText);
    };
    Voice.onSpeechError = (err) => {
      console.log("err", err);
      setIsListening(false);
      if (err.error?.code === "recognition_fail") {
        NotificationToast.info("Không thể nhận dạng", "Vui lòng thử lại trong môi trường yên tĩnh hơn.");
      } else {
        NotificationToast.error("Đã có lỗi xảy ra", "Vui lòng thử lại sau.");
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    try {
      await Voice.start("vi-VN"); 
      setIsListening(true);
    } catch (e) {
      console.error("start error", e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error("stop error", e);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        position: "absolute",
        right: 15,
        bottom: 150,
      }}
    >
      {isListening && (
        <>
          <Ripple delay={0} />
          <Ripple delay={1000} />
        </>
      )}
      <TouchableOpacity
        onPress={isListening ? stopRecognizing : startRecognizing}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 100,
            backgroundColor: "#fff",
            shadowColor: "#007AFF",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Image
            source={require("../../../assets/icons/voice-ai.png")}
            style={{ width: 28, height: 28, tintColor: "#007AFF" }}
            contentFit="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceInput;
