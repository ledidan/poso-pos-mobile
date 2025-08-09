import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Header from "../components/Home/Header";
import RevenueChart from "../components/Home/RevenueChart";
import TopSelling from "../components/Home/TopSelling";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import CardOverview from "../components/Home/CardOverview";
import TrialBanner from "../components/Home/TrialBanner";
import Merchants from "../lib/Services/Merchants";
import { HelperFunctions } from "../components/helperFunctions";
import dayjs from "dayjs";
import {
  _getTimeRangeFromSelected,
  DATE_RANGES,
  filterBillsByTime,
  getCartOverview,
  getRevenueData,
  getTopSellingItems,
} from "../components/Home/ReportAnalysis/functions";
import { useAuth } from "../context/AuthContext";
const HomeScreen = () => {
  const { userToken = "" } = useAuth() || {};
  const shopID = userToken;
  const [selectedRange, setSelectedRange] = useState("Hôm nay");
  const [refreshing, setRefreshing] = useState(false);
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const bottomSheetRef = useRef(null);
  const [bills, setBills] = useState([]);
  const [time, setTime] = useState({
    startAt: dayjs().startOf("day").toISOString(),
    endAt: dayjs().endOf("day").toISOString(),
  });
  const onGetPastOrders = async () => {
    const { orders = {} } = await Merchants.GetRequests.GetShopOrders({
      shopID,
      ordersType: "past",
      startAt: time.startAt,
      endAt: time.endAt,
    });
    const processed = HelperFunctions.ProcessBill(orders);
    setBills(processed);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onGetPastOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    onGetPastOrders();
  }, [time]);

  useEffect(() => {
    const { startAt, endAt } = _getTimeRangeFromSelected(selectedRange);
    setTime({ startAt, endAt });
  }, [selectedRange]);
  const filteredBills = useMemo(
    () => filterBillsByTime(bills, time.startAt, time.endAt),
    [bills, time]
  );

  const { chartData, initialScrollIndex } = useMemo(
    () => getRevenueData(bills, selectedRange),
    [bills, selectedRange]
  );

  const topItems = useMemo(
    () => getTopSellingItems(filteredBills),
    [filteredBills]
  );
  const cartOverview = useMemo(
    () => getCartOverview(filteredBills),
    [filteredBills]
  );

  const snapPoints = useMemo(() => ["45%"], []);

  const handleOpenFilter = () => bottomSheetRef.current?.expand();

  const handleSelectRange = (range) => {
    setSelectedRange(range);
    bottomSheetRef.current?.close();
  };
  return (
    <View style={styles.container}>
      <Header selectedRange={selectedRange} onPressFilter={handleOpenFilter} />
      {showTrialBanner && (
        <TrialBanner onClose={() => setShowTrialBanner(false)} />
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CardOverview data={cartOverview} />
        <RevenueChart
          data={chartData}
          initialScrollIndex={initialScrollIndex}
        />
        <TopSelling topItems={topItems} />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        )}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Chọn thời gian</Text>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
              <Ionicons name="close-outline" size={30} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }}>
            {DATE_RANGES.map((range) => (
              <TouchableOpacity
                key={range}
                style={styles.rangeOption}
                onPress={() => handleSelectRange(range)}
              >
                <Text style={styles.rangeText}>{range}</Text>
                {selectedRange === range && (
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color="#007AFF"
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1, backgroundColor: "#EAF5FF" },
  scrollViewContent: { paddingHorizontal: 16, paddingBottom: 30 },

  // bottom sheet
  // ...
  bottomSheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rangeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rangeText: {
    fontSize: 16,
  },
});

export default HomeScreen;
