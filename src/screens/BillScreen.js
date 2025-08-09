import React, { useCallback, useEffect, useState } from "react";
import Merchants from "../lib/Services/Merchants";
import Bill from "../components/Bill/Bill";
import { HelperFunctions } from "../components/helperFunctions";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";

const BillScreen = () => {
  const { userToken = "", user = {} } = useAuth() || {};
  const shopID = userToken;
  const { bankConnectionInfo = {} } = user;
  const [bills, setBills] = useState([]);
  const [tab, setTab] = useState("active");
  const [pastBills, setPastBills] = useState([]);
  const [filterTime, setFilterTime] = useState({
    startAt: dayjs().subtract(1, "day").toISOString(),
    endAt: dayjs().toISOString(),
  });
  const onGetActiveOrders = useCallback(async () => {
    const { orders } = await Merchants.GetRequests.GetShopOrders({
      shopID,
      ordersType: "active",
    });
    const processed = HelperFunctions.ProcessBill(orders);
    setBills(processed);
  }, [shopID]);

  const onGetPastOrders = useCallback(async () => {
    const { orders } = await Merchants.GetRequests.GetShopOrders({
      shopID,
      ordersType: "past",
      startAt: filterTime.startAt,
      endAt: filterTime.endAt,
    });
    const processed = HelperFunctions.ProcessBill(orders);
    setPastBills(processed);
  }, [shopID, filterTime]);

  useEffect(() => {
    if (tab === "active") {
      onGetActiveOrders();
    } else {
      onGetPastOrders();
    }
  }, [tab, onGetActiveOrders, onGetPastOrders]);

  return (
    <Bill
      activeTab={tab}
      setActiveTab={setTab}
      bills={bills}
      pastBills={pastBills}
      shopID={shopID}
      refetch={tab === "active" ? onGetActiveOrders : onGetPastOrders}
      bankConnectionInfo={bankConnectionInfo}
      filterTime={filterTime}
      setFilterTime={setFilterTime}
    />
  );
};

export default BillScreen;
