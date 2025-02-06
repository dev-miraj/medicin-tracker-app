import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedicationHeader from '../../app-example/components/AddMedicationHeader'
import AddMedicationForm from '../../app-example/components/AddMedicationForm'

export default function AddNewMedication() {
  return (
    <ScrollView>
      <AddMedicationHeader/>
      <AddMedicationForm/>
    </ScrollView>
  )
}