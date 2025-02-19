import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { TypeList, whenToTake } from "../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { FormatDate, formatDateForText, formatTime, getDateRange } from "../service/ConvertDateTime";
import { db } from "../config/FirebaseConfig"; // Ensure db is imported from FirebaseConfig
import { doc, setDoc } from "firebase/firestore";
import { getLocalStorage } from '../service/Storage'
import { router, useRouter } from "expo-router";
export default function AddMedicationForm() {
  const [formdata, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimepicker, setShowTimePicker] = useState(false);
  const [loading,setLoading]=useState(false)
  const router = useRouter()
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("Updated Form Data:", formdata);
  }, [formdata]);
  
  const SaveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");
  
    if (!(formdata?.name && formdata?.type && formdata?.dose && formdata?.startDate && formdata?.endDate && formdata?.remainder)) {
      Alert.alert("Enter All Fields");
      return;
    }
      const dates=getDateRange(formdata.startDate,formdata.endDate)
     setLoading(true)
    try {
      const medicationRef = doc(db, "medication", docId);
      await setDoc(medicationRef, {
        ...formdata,
        userEmail: user?.email,
        docId: docId,
        dates:dates
      });
  
      console.log("Data Saved Successfully!");
      Alert.alert("Great!", "Medication Added Successfully!",[
        {
           text:'ok',
           onPress:()=>router.push('(tabs)')
        }
      ]);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error saving medication:", error);
      Alert.alert("Error", "Failed to add medication.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Medication</Text>

      {/* Medicine Name Input */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="medkit-outline" size={24} />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>

      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        style={styles.typeList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                backgroundColor:
                  item.name === formdata?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typText,
                {
                  color: item.name === formdata?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dosage Input */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="eyedrop-outline" size={24} />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage (e.g., 2, 5ml)"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* Dropdown (When to Take) */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="time-outline" size={24} />
        <Picker
          selectedValue={formdata?.when || ""}
          onValueChange={(itemValue) => onHandleInputChange("when", itemValue)}
          style={{ flex: 1 }}
        >
          {whenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Date Selection */}
      <View style={styles.dateInputGroup}>
        {/* Start Date */}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons style={styles.icon} name="calendar-outline" size={24} />
          <Text style={styles.text}>
            {formdata?.startDate ? formatDateForText(formdata.startDate) : "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            mode="date"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                onHandleInputChange("startDate", FormatDate(selectedDate));
              }
              setShowStartDate(false);
            }}
            value={formdata?.startDate ? new Date(formdata.startDate) : new Date()}
          />
        )}

        {/* End Date */}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons style={styles.icon} name="calendar-outline" size={24} />
          <Text style={styles.text}>
            {formdata?.endDate ? formatDateForText(formdata.endDate) : "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            mode="date"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                onHandleInputChange("endDate", FormatDate(selectedDate));
              }
              setShowEndDate(false);
            }}
            value={formdata?.endDate ? new Date(formdata.endDate) : new Date()}
          />
        )}
      </View>

      {/* Set Reminder */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons style={styles.icon} name="timer-outline" size={24} />
          <Text style={styles.text}>
            {formdata?.remainder ? formdata.remainder : "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {showTimepicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              onHandleInputChange("remainder", formatTime(selectedTime));
            }
            setShowTimePicker(false);
          }}
          value={new Date()}
        />
      )}
      <TouchableOpacity style={styles.button}
       onPress={()=>SaveMedication(formdata)}
      >
       {loading? <ActivityIndicator size={'large'} color={'white'}/>:
        <Text style={styles.buttontext}>Add New Medication</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    paddingRight: 12,
    borderRightWidth: 1,
    borderColor: Colors.GRAY,
  },
  typeList: {
    marginTop: 10,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginRight: 10,
  },
  typText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderRadius:15,
    width:'100%',
    marginTop:20
  },
  buttontext:{
    fontSize:17,
    color:'white',
    textAlign:'center'
  }
});
