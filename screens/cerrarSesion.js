import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert,Button,StyleSheet,View } from "react-native";

export default function cerrar(){

 const getData = async () => {
  try {
     await AsyncStorage.removeItem("@id")
     await AsyncStorage.removeItem("@user")
     await AsyncStorage.removeItem("@password").then(Alert.alert("Se Cerró Sesión"))
     
  } catch(e) {
    console.log(e)
  }
}
return(
  <View style={styles.view}>
    <Button  title="CERRAR SESIÓN" onPress={getData}></Button>
    </View>
)
}

const styles= StyleSheet.create({
  button:{
    marginTop:20,
  },
  view:{
    flex:1,
    justifyContent: 'center',
    marginHorizontal:20,
    marginTop:90 
  }
})


