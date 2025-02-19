import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeToDisplay } from "../service/ConvertDateTime";
import Colors from "../constant/Colors";
import moment from "moment";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { getLocalStorage } from "../service/Storage";
import MedicationCardItem from "./MedicationCardItem";
import EmptyState from "./EmptyState";
import { useRouter } from "expo-router";

export default function MedicationList() {
  const [medList, setMedList] = useState([]); // Default empty array
  const [dateRange, setDateRange] = useState([]);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
   const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetDateRangeList();
  }, []);

  useEffect(() => {
    GetMedicationList(selectedDate);
  }, [selectedDate]); // When selectedDate changes, fetch data

  const GetDateRangeList = () => {
    const dateRange = getDateRangeToDisplay();
    setDateRange(dateRange);
  };

  const GetMedicationList = async (selectedDate) => {
    setLoading(true)
    const user = await getLocalStorage("userDetail");
    setMedList([])
    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );
      const querySnapshot = await getDocs(q);

      let medications = []; // Temporary array
      querySnapshot.forEach((doc) => {
        console.log("docId:" + doc.id + " ==> ", doc.data());
        medications.push(doc.data());
      });

      setMedList(medications); 
      setLoading(false)
    } catch (e) {
      console.error("Error fetching medications: ", e);
      setLoading(false)
    }
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require("../assets/images/medication.jpeg")}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />

      {/* Date Selection Buttons */}
      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formattedDate == selectedDate
                    ? Colors.PRIMARY
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
                    onPress={() => {setSelectedDate(item.formattedDate);
                        GetMedicationList(item.formattedDate)
                    } }
          >
            <Text
              style={[
                styles.day,
                {
                  color: item.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color: item.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Medication List */}
    {medList?.length>0?  <FlatList
        data={medList} 
        onRefresh={()=>GetMedicationList(selectedDate)}
        refreshing={loading}
        renderItem={({item,index})=>(
            <TouchableOpacity onPress={()=>router.push({
               pathname:'/action-modal',
               params:{
                 ...item,
                 selectedDate:selectedDate 
               }
            })}
            >
            <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
        )}  
        />:<EmptyState/>}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.DARK_GRAY,
    marginTop: 20,
  },
});
