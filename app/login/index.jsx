import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import Colors from '../../constant/Colors'
import { router, useRouter } from "expo-router";

export default function LoginScreen() {
  const router =useRouter()
  return (
    <View>
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
      }}>
        <Image
          source={require("./../../assets/images/login.png")} // Corrected path
          style={styles?.image}
        />
      </View>
      <View style={{
        padding:25,
        backgroundColor:Colors.PRIMARY,
        height:'100%',
        borderRadius:50
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        }}> Stay On Track, Stay healthy!</Text>

        <Text style={{
          color: "white",
          textAlign: "center",
          marginTop: 20,
          fontSize: 17,
        }}>
        Track your meds, take control of your health. stay conitent, stay confident
        </Text>

       <TouchableOpacity style={styles?.button}
       onPress={() =>router.push('login/signIn')}
       >
         <Text style={{
            color:Colors.PRIMARY,
            textAlign:'center',
            fontSize:16,
            color:Colors.PRIMARY
            }}>Continue</Text>
       </TouchableOpacity>
       
       <Text style={{
          color: "white",
          textAlign: "center",
          marginTop: 4,
       }}>Note: By Clicking Continue button, you will agree to our terms and condition</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 image:{
    width: 210,
    height: 440
 },
 button:{
   padding:15,
   backgroundColor:'white',
    borderRadius:99,
    marginTop: 20
 }
})