import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Merchants from "../lib/Services/Merchants";
import { useNavigation } from "@react-navigation/native";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const getShopBasicInfo = useCallback(async (shopID) => {
    const { shopBasicInfo = {} } = await Merchants.GetRequests.GetShopBasicInfo(
      { shopID }
    );
    return shopBasicInfo;
  }, []);

  const getPersonnelInfo = useCallback(async (personalID, shopID) => {
    const { personnel = {} } = await Merchants.GetRequests.GetShopPersonnelInfo(
      { personnelID: personalID, shopID }
    );
    return personnel;
  }, []);

  const getSubscriptionInfo = useCallback(async (shopID) => {
    const data = await Merchants.GetRequests.GetShopSubscriptionInfo({
      shopID,
    });
    return data;
  }, []);
  const bootstrapAsync = async () => {
    try {
      const personalID = await AsyncStorage.getItem("personalID");
      const shopID = await AsyncStorage.getItem("shopID");
      if (!shopID || !personalID) {
        setIsLoading(false);
        return;
      }
      const shopBasicInfo = await getShopBasicInfo(shopID);
      const personnelInfo = await getPersonnelInfo(personalID, shopID);
      const subscriptionInfo = await getSubscriptionInfo(shopID);
      setUser({
        ...shopBasicInfo,
        ...personnelInfo,
        personalID,
        subscriptionInfo,
      });
      setUserToken(shopID);
    } catch (e) {
      console.error("Restoring token failed", e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    bootstrapAsync();
  }, [getShopBasicInfo, getPersonnelInfo, getSubscriptionInfo]);

  useEffect(() => {
    if (userToken) {
      setTimeout(() => {
        navigation.navigate("MainTabNavigator", {
          screen: "Home",
        });
      }, 0);
    }
  }, [userToken]);

  const refetchUserInfo = async () => {
    await bootstrapAsync();
  };

  const signIn = async ({ shopID, userData }) => {
    const { personalID } = userData;
    setUserToken(shopID);
    setUser(userData);
    await AsyncStorage.setItem("personalID", personalID);
    await AsyncStorage.setItem("shopID", shopID);
  };

  const signOut = async () => {
    setUserToken(null);
    setUser(null);
    await AsyncStorage.removeItem("personalID");
    await AsyncStorage.removeItem("shopID");
    navigation.navigate("Login");
  };

  const value = {
    userToken,
    user,
    isLoading,
    signIn,
    signOut,
    refetch: refetchUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
