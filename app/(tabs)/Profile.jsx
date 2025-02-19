// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";

// const ProfileScreen = ({ navigation }) => {
//   const router = useRouter();
//   const user = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   };

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("userToken");
//       navigation.replace("Login");
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//                 <Image
//                   source={require("../../assets/images/smiley.png")}
//                   style={{ width: 45, height: 45 }}
//                 />
//                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>
//                   Hello {user?.displayname || user?.displayName || "User"} 👋
//                 </Text>
//               </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={()=> router.push('login')}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   email: {
//     fontSize: 16,
//     color: "gray",
//     marginBottom: 20,
//   },
//   logoutButton: {
//     backgroundColor: "#ff4757",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   logoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ProfileScreen;

import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const router = useRouter();
  // const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
        avatar: currentUser.photoURL || "https://i.pravatar.cc/150",
      });
    }
  }, [auth.currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.header}>Profile</Text>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={()=> router.push('add-new-medication')}>
            <Ionicons name="add-circle-outline" size={24} color="#007bff" />
            <Text style={styles.menuText}>Add New Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={()=>router.back()}>
            <Ionicons name="briefcase-outline" size={24} color="#007bff" />
            <Text style={styles.menuText}>My Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={()=> router.push('History')}>
            <Ionicons name="time-outline" size={24} color="#007bff" />
            <Text style={styles.menuText}>History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton} onPress={()=> router.push('login')}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f0ff",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    marginVertical: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4757",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
