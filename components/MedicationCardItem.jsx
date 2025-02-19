import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const MedicationCardItem = ({ medicine, selectedDate = '' }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const CheckStatus = () => {
      // Ensure medicine.action is an array before using find()
      if (!Array.isArray(medicine?.action)) {
        console.warn('medicine.action is not an array:', medicine?.action);
        return;
      }

      const data = medicine.action.find((item) => item.date === selectedDate);
      setStatus(data?.status || '');
    };

    if (medicine?.action) {
      CheckStatus();
    }
  }, [medicine, selectedDate]); // Ensure it updates when dependencies change

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          {medicine?.type?.icon ? (
            <Image
              source={{ uri: medicine.type.icon }}
              style={{ width: 60, height: 60 }}
            />
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: 18 }}>{medicine?.when}</Text>
          <Text style={{ color: 'white' }}>
            {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>
      <View style={styles.remainderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {medicine?.remainder}
        </Text>
      </View>
      {status && (
        <View style={styles.statusContainer}>
          {status === 'Taken' ? (
            <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
          ) : status === 'Missed!' ? (
            <Ionicons name="close-circle" size={24} color={'red'} />
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  remainderContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  statusContainer: {
    position: 'absolute',
    top: 5,
    padding: 7,
  },
});

export default MedicationCardItem;
