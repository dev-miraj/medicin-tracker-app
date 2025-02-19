import { FlatList, ScrollView, View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import MedicationList from '../../components/MedicationList';

export default function HomeScreen() {
  return (
    <FlatList
     data={[]} // Empty array
      ListHeaderComponent={
        <View
        style={{
          padding: 25,
          backgroundColor: 'white',
          flex: 1,
        }}
      >
        <Header/>
        <MedicationList />
      </View>
      }
    
    />
   
  );
}
