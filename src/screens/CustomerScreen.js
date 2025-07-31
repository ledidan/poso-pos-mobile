import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { customers } from '../data/mockData';

export default function CustomerScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Danh sách khách hàng</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 5 }}>{item.name} - {item.phone}</Text>
        )}
      />
    </View>
  );
}
