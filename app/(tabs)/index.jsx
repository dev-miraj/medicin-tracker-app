import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import Header from '../../app-example/components/Header'
import EmptyState from '../../app-example/components/EmptyState'
import MedicationList from '../../app-example/components/MedicationList'

export default function HomeScreen() {
  return (
    <View style={{
      padding:25,
      backgroundColor:'white',
      height:'100%'
    }}>

      {/* <Button title='Logout' onPress={()=>signOut}/> */}
    <Header/>
     {/* <EmptyState/> */}
     <MedicationList/>
    </View>
  )
}