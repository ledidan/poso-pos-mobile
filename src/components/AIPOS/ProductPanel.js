import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HelperFunctions } from "../helperFunctions";
import { EXPO_PUBLIC_IMAGE_SOURCE } from "../../lib/Services/API_Paths";
import * as Haptics from "expo-haptics";
import ConfirmDialog from "../modals/ConfirmDialog";
import { useDismissAction } from "../../context/DismissActionContext";

const ProductPanel = ({
  visible,
  menus = {},
  onAddChip,
  onAddNew,
  onSubmitRemoveItem,
  ...rest
}) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState({});
  const { registerDismissAction, unregisterDismissAction } = useDismissAction();

  useEffect(() => {
    const closeDeleteModeAction = () => {
      if (isLongPress) {
        handlePressOut();
      }
    };
    registerDismissAction("productPanelDeleteMode", closeDeleteModeAction);
    return () => {
      unregisterDismissAction("productPanelDeleteMode");
    };
  }, [isLongPress, registerDismissAction, unregisterDismissAction]);
  // const allProducts = useMemo(() => {
  //   const products = [];
  //   if (!menus) return products;

  //   for (const menuKey in menus) {
  //     const menu = menus[menuKey];
  //     if (menu && menu.groups) {
  //       for (const groupKey in menu.groups) {
  //         const group = menu.groups[groupKey];
  //         if (group && group.items) {
  //           for (const itemKey in group.items) {
  //             products.push({
  //               ...group.items[itemKey],
  //               itemID: itemKey,
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return products;
  // }, [menus]);


  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsLongPress(true);
    });
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsLongPress(false);
    });
  };
  return (
    <View style={styles.panel}>
      <ConfirmDialog
        isVisible={!!selectedItem.itemID}
        onClose={() => setSelectedItem({})}
        onConfirm={() => {
          onSubmitRemoveItem(selectedItem.itemID);
          setSelectedItem({});
        }}
        title="Xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm ${selectedItem.itemName} không?`}
      />
      <ScrollView style={{ maxHeight: 300 }}>
      <TouchableWithoutFeedback
        onPress={handlePressOut}
        onLongPress={handleLongPress}
      >
        <View style={styles.list}>
          <TouchableOpacity style={styles.addBtn} onPress={onAddNew}>
            <Ionicons name="add-outline" size={30} color="#007AFF" />
            <Text style={styles.addTxt}>Thêm hàng</Text>
          </TouchableOpacity>
          {Object.entries(menus).map(([itemID, item]) => {
            const imageUrl = `${EXPO_PUBLIC_IMAGE_SOURCE}/${item.itemImage}`;
            return (
              <TouchableOpacity
                key={itemID}
                style={[styles.chip, isLongPress && styles.selectedChip]}
                onPress={() => {
                  onAddChip(item);
                }}
                onLongPress={handleLongPress}
                delayLongPress={100}
              >
                {isLongPress && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      setSelectedItem(item);
                      registerDismissAction("deleteItemAction", () => {
                        setSelectedItem({});
                      });
                    }}
                  >
                    <Ionicons name="close-circle" size={26} color="#FF3B30" />
                  </TouchableOpacity>
                )}

                {item.itemImage ? (
                  <Image
                    source={{
                      uri: imageUrl,
                    }}
                    style={styles.chipImage}
                  />
                ) : (
                  <View style={styles.chipCode}>
                    <Text style={styles.chipCodePlaceholder}>
                      {HelperFunctions.getShortCode(item.itemName)}
                    </Text>
                  </View>
                )}
                <Text style={styles.chipLabel}>{item.itemName}</Text>
              </TouchableOpacity>
            );
          })}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default ProductPanel;

const styles = StyleSheet.create({
  panel: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  deleteButton: {
    position: "absolute",
    top: -10,
    left: -5,
    zIndex: 1000,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 10,
    paddingTop: 10,
  },
  addBtn: { alignItems: "center", marginRight: 20 },
  addTxt: { fontSize: 14, fontWeight: "600", color: "#007AFF", marginTop: 18 },
  chip: { alignItems: "center", marginRight: 12, marginBottom: 12 },
  chipCode: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  chipCodePlaceholder: {
    fontSize: 13,
    color: "#333",
    fontWeight: "bold",
  },
  chipImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  chipLabel: { fontSize: 14, color: "#333" },
});
