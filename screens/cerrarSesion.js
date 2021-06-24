import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert,StyleSheet,View,Dimensions } from "react-native";
import { Icon,Header } from 'react-native-elements'
import { AuthContext } from "../middleware/context";
import {Button} from "galio-framework";
const { width, height } = Dimensions.get("screen");

export default function cerrar(props){
  const { signOut } = React.useContext(AuthContext); 

 const getData = async () => {
  try {
     await AsyncStorage.removeItem("@id")
     await AsyncStorage.removeItem("@user")
     const cookie = await AsyncStorage.getItem("@cookie")
     console.log(cookie)
     await AsyncStorage.removeItem("@cookie")
     .then(
       signOut(),
       logOut(cookie),
      props.navigation.navigate("AUCTION KING")
      )
  } catch(e) {
    console.log(e)
  }
}

const logOut=async(cookie)=>{
  fetch('https://subastas-spring-backend.herokuapp.com/logout', {
   method:"POST",
   mode: 'cors',
   crossDomain:true,
   headers: {
    'Set-Cookie':cookie,
  },
  credentials: 'same-origin',
  })
  .then(response =>console.log(response.status))
  .catch(error=>{if(error){
    console.log(error)
    Alert.alert("Error")
  }
})
}
return(
  <View>
    <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'CERRAR SESIÓN', style: { color: '#fff',fontWeight:"bold" } }}
            />
    <View style={styles.view}>
    <Button onPress={getData}>CERRAR SESIÓN</Button>
    </View>
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
    marginHorizontal:width/4,
    marginTop:height/2.5,
  }
})


