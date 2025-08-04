import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomTabIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AIScreen")}
      activeOpacity={0.7}
      style={{
        top: -20,
        zIndex: 1000,
        backgroundColor: "#007AFF",
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Ionicons name="bag-handle-outline" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

export default CustomTabIcon;
