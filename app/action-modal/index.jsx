import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import MedicationCardItem from '../../components/MedicationCardItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import moment from 'moment';
export default function MedicationActionModal() {
    const medicine=useLocalSearchParams();
    const router = useRouter();
    const UpdateActionStatus= async(status)=>{
         try {
            const docRef=doc(db,'medication',medicine?.docId);
            await updateDoc(docRef,{
                action:arrayUnion({
                    status:status,
                    time:moment().format('LT'),
                    date:medicine?.selectedDate
                })
            })
            Alert.alert(status,'Response Saved Successfully',[
                {
                    text:'OK',
                    onPress:()=>router.replace('(tabs)')
                }
            ]);
         } catch (error) {
            console.log(error);
            
         }
    }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/notification.gif')}
        style={{
            width:120,
            height:120,
        }}
      />
      <Text style={{fontSize:18}}>{medicine?.selectedDate}</Text>
      <Text style={{fontSize:38, fontWeight:'bold',color:Colors.PRIMARY}}>{medicine?.remainder}</Text>
      <Text style={{fontSize:18}}>it's time to take </Text>

      <MedicationCardItem medicine={medicine} />

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={()=>UpdateActionStatus('Missed!')} style={styles.closeBtn}>
        <Ionicons name="close-outline" size={24} color="red" />
            <Text style={{
                fontSize:20,
                color:'red'
                }}>Missed!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>UpdateActionStatus('Taken')} style={styles.successBtn}>
        <Ionicons name="checkmark-outline" size={24} color="white" />
            <Text style={{
                fontSize:20,
                color:'white'
                }}>Taken</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>router.back()} style={{
           position:'absolute',
           bottom:20,
      }}>
      <Ionicons name="close-circle" size={44} color={Colors.DARK_GRAY} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        height: '100%'
    },
    btnContainer:{
        flexDirection:'row',
        gap:10,
        marginTop:20
    },
    closeBtn:{
        padding:10,
        flexDirection:'row',
        gap:6,
        borderWidth:1,
        alignItems:'center',
        borderColor:'red',
        borderRadius:10,
        marginTop:15
    },
    successBtn:{
        padding:10,
        flexDirection:'row',
        gap:6,
        backgroundColor:Colors.GREEN,
        alignItems:'center',
        
        borderRadius:10,
        marginTop:15
    }
})