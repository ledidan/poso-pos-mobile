import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceInput = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = () => console.log('Speech started');
    Voice.onSpeechResults = (event) => {
      const speechText = event.value?.[0] || '';
      setText(speechText);
      onResult(speechText);
    };
    Voice.onSpeechError = (err) => console.log('Speech error:', err);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    try {
      await Voice.start('vi-VN'); // Tiếng Việt
      setIsListening(true);
    } catch (e) {
      console.error('start error', e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error('stop error', e);
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <TouchableOpacity onPress={isListening ? stopRecognizing : startRecognizing}>
        <Text style={{ fontSize: 24 }}>{isListening ? '🛑' : '🎤'}</Text>
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  );
};

export default VoiceInput;
