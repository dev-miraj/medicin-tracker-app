import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../config/FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setLocalStorage } from '../../service/Storage'

export default function SignUp() {
    const router =useRouter()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [userName,setUsername] = useState()
    const OncreateAccount=()=>{
        if(!email||!password||!userName){
            ToastAndroid.show('All Fill Required',ToastAndroid.BOTTOM)
            Alert.alert('Please Enter email & Password')
        }
   createUserWithEmailAndPassword(auth, email, password)
   .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    
    await updateProfile(user,{
        displayName:userName
    })

   await setLocalStorage('userDetail',user)
    router.push('(tabs)')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode=='auth/email-already-in-use'){
       ToastAndroid.show('Email already Exist',ToastAndroid.BOTTOM) 
       Alert.alert('Email already Exist')
    }
  });
    }
  return (
     <View style={{
            padding: 25,
        }}>
          <Text style={styles.textHeader}>Create New Account</Text>
    
          <View style={{marginTop:25
    
          }}>
            <Text style={{marginTop:30}}>Email</Text>
            <TextInput placeholder='Email' style={styles.textInput}
             onChangeText={(value)=>setEmail(value)}

            />
            <Text style={{marginTop:30}}>Full Name</Text>
            <TextInput placeholder='Full Name' style={styles.textInput}
             onChangeText={(value)=>setUsername(value)}
            />
            <Text style={{marginTop:30}}>Password</Text>
            <TextInput placeholder='Password'

             onChangeText={(value)=>setPassword(value)}

            secureTextEntry={true}
            style={styles.textInput}/>

          </View>
          <TouchableOpacity style={styles.button}
          onPress={OncreateAccount}
          
          >
           <Text style={{
            fontSize:17,
            color:'white',
            textAlign:'center'
    
           }}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCreate}
          onPress={() =>router.push('login/signIn')}
          >
           <Text style={{
            fontSize:17,
            color:Colors.PRIMARY,
            textAlign:'center'
    
           }}>Already account? Sign In</Text>
          </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
  textHeader:{
     fontSize:30,
     fontWeight:'bold',
     marginTop:15
  },
  subText:{
     fontSize:30,
     fontWeight:'bold',
     marginTop:10,
     color:Colors.GRAY,
  },
  textInput:{
    padding:10,
    borderWidth:1,
    fontSize:17,
    borderRadius:10,
    marginTop:5
  },
  button:{
    padding:20,
    backgroundColor:Colors.PRIMARY,
    borderRadius:10,
    marginTop:35
  },
  buttonCreate:{
    padding:20,
    backgroundColor:'white',
    borderRadius:10,
    marginTop:20,
    borderWidth:1,
    borderColor:Colors.PRIMARY
  }
   })