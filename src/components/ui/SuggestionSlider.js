import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SuggestionSlider = ({ data = [], onSelect }) => {
  if (data.length === 0) return null;

  return (
    <View style={styles.chipContainer}>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(item)}
            style={styles.chip}
          >
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#d4d3d6",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 16,
    color: "black",
  },
});

export default SuggestionSlider;
