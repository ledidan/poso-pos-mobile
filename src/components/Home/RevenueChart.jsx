// components/RevenueChart.jsx
import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const RevenueChart = () => {
  const chartData = {
    labels: ["", "", "", "1", "", "", ""],
    datasets: [
      {
        data: [0, 20, 60, 100, 80, 40, 0],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    fillShadowGradient: "#007AFF",
    fillShadowGradientOpacity: 0.4,
    propsForDots: { r: "0" },
    propsForLabels: { fontSize: 12, fontWeight: "500" },
  };

  return (
    <View style={styles.contentCard}>
      <Text style={styles.sectionTitle}>Biểu đồ doanh thu</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 64}
        height={220}
        chartConfig={chartConfig}
        bezier
        withVerticalLines={false}
        withHorizontalLines={true}
        withInnerLines={false}
        withShadow={false}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix="N"
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1C1C1E",
  },
  chart: {
    borderRadius: 16,
    marginLeft: -10,
  },
});

export default RevenueChart;
