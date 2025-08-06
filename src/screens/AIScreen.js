import React, { useEffect, useState } from "react";
import AIPOS from "../components/AIPOS";
import Merchants from "../lib/Services/Merchants";
import { HelperFunctions } from "../components/helperFunctions";
import { DismissActionProvider } from "../context/DismissActionContext";

const AIScreen = () => {
  const { GetShopAllItems } = Merchants.GetRequests;
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopID = "109879f";
  const getMenusForShop = async () => {
    try {
      const { allItems = {} } = await GetShopAllItems({
        shopID,
      });
      if (allItems) {
        const converted = HelperFunctions._convertFlatMenu(allItems);
        setMenus(converted);
      }
    } catch (e) {
      setError(e);
      console.error("Failed to fetch menus:", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMenusForShop();
  }, []);

  // if (loading) {
  //   return <LoadingDialog isVisible={loading} />;
  // }

  // if (error) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>Không thể tải dữ liệu. Vui lòng thử lại.</Text>
  //     </View>
  //   );
  // }
  
  return (
    <DismissActionProvider>
      <AIPOS
        menus={menus}
        refetch={getMenusForShop}
        shopID={shopID}
        loading={loading}
        error={error}
      />
    </DismissActionProvider>
  );
};

export default AIScreen;
