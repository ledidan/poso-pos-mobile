import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

const RevenueChart = ({ data, initialScrollIndex     }) => {
  const hasData = data && data.length > 0;
  
  const maxValue = hasData ? Math.max(...data.map(item => item.value)) : 100;
  const stepValue = Math.ceil(maxValue / 6 / 1000) * 1000;

  const formatAxisLabel = (value) => {
    if (value >= 1000000) {
      return `${value / 1000000}Tr`;
    }
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return value;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doanh thu</Text>
      <View style={styles.chartContainer}>
        {hasData ? (
          <BarChart
            data={data}
            scrollToIndex={initialScrollIndex}
            barWidth={30}
            initialSpacing={30}
            spacing={20}
            barBorderRadius={4}
            showGradient
            formatYLabel={formatAxisLabel}
            yAxisLabelWidth={60}
            yAxisLabelContainerStyle={{
              alignItems: 'center',
              justifyContent: 'start',
            }}
            yAxisThickness={0}
            xAxisType={'dashed'}
            xAxisColor={'#505e70'}
            yAxisTextStyle={{ color: '#505e70' }}
            stepValue={stepValue}
            maxValue={maxValue === 0 ? 200 : maxValue * 1.2} 
            noOfSections={6}
            xAxisLabelTextStyle={{ color: '#505e70', textAlign: 'center', fontSize: 10 }}
            showLine
            lineConfig={{
              color: "#F29C6E",
              thickness: 3,
              curved: true,
              hideDataPoints: true,
              shiftY: 20,
              initialSpacing: -20,
              shiftX: 10,
            }}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Ionicons name="bar-chart-outline" size={36} color="#006afc" />
            <Text style={styles.noDataText}>Chưa có dữ liệu</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 20,
    // backgroundColor: '#232B5D',
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  chartContainer: {
    paddingTop: 20,
  },
  noDataContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: 400,
    color: '#A9A9A9',
  },
});

export default RevenueChart;