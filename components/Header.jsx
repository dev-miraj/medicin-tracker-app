

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../service/Storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function Header() {
  const [user, setUser] = useState(null); // Default state null রাখুন
  const router = useRouter();
  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    try {
      const userInfo = await getLocalStorage("userDetail");
      console.log("Fetched User:", userInfo);

      // Check user data structure
      if (userInfo) {
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={require("../assets/images/smiley.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Hello {user?.displayname || user?.displayName || "User"} 👋
          </Text>
        </View>
        <TouchableOpacity onPress={()=> router.push('add-new-medication')}>
        <Ionicons name="medkit-outline" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
