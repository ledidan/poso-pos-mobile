import React, { useEffect, useState } from "react";
import Merchants from "../lib/Services/Merchants";
import Bill from "../components/Bill/Bill";
import { HelperFunctions } from "../components/helperFunctions";

const BillScreen = () => {
  const shopID = "109879f";
  const [bills, setBills] = useState([]);
  const onGetActiveOrders = async () => {
    const { orders } = await Merchants.GetRequests.GetShopOrders({
      shopID,
      ordersType: "active",
    });
    const processed = HelperFunctions.ProcessBill(orders);
    setBills(processed);
  };
  useEffect(() => {
    onGetActiveOrders();
  }, []);

  return <Bill bills={bills} />;
};

export default BillScreen;
