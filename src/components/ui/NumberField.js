import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Functions from "../../lib/Functions";

const NumberField = ({
  label,
  value,
  onValueChange,
  step,
  minValue = 0,
  type = "number",
}) => {
  const finalStep = step !== undefined ? step : type === "price" ? 1000 : 1;

  const handleIncrease = () => {
    onValueChange(Number(value) + finalStep);
  };

  const handleDecrease = () => {
    const newValue = Number(value) - finalStep;
    onValueChange(Math.max(minValue, newValue));
  };

  const handleTextChange = (text) => {
    if (type === "price") {
      onValueChange(Functions.Math.parseVND(text));
    } else {
      const intValue = parseInt(text, 10);
      onValueChange(isNaN(intValue) ? 0 : intValue);
    }
  };
  const displayValue =
    type === "price" ? Functions.Math.formatVND(value) : String(value);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.labelHorizontalContainer,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDecrease}>
            <Ionicons name="remove" size={22} style={styles.buttonText} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={displayValue}
            onChangeText={handleTextChange}
            keyboardType="number-pad"
            textAlign="center"
            placeholder="0"
          />

          <TouchableOpacity style={styles.button} onPress={handleIncrease}>
            <Ionicons name="add" size={22} style={styles.buttonText} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NumberField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    color: "#000",
    fontWeight: "500",
    width: 160,
  },
});
