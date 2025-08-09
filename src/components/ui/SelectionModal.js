import React, { useState, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SelectionModal = ({ visible, title, data, onClose, onSelect, searchPlaceholder = "Tìm kiếm..." }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return data;
    }
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onSelect(item);
        setSearchQuery(''); // Reset search
      }}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={() => {
              onClose();
              setSearchQuery(''); // Reset search
            }}>
            <Ionicons name="close-circle" size={30} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.code || item.id} // Dùng code cho tỉnh, id cho ngành nghề
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 44, fontSize: 16 },
  itemContainer: { padding: 16 },
  itemText: { fontSize: 16 },
  separator: { height: 1, backgroundColor: '#EEE', marginLeft: 16 },
});

export default SelectionModal;