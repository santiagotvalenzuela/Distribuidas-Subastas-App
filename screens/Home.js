import React, { useEffect } from 'react';
import { SafeAreaView, View,Button, FlatList, StyleSheet, Text, ActivityIndicator, Image,TouchableHighlight } from 'react-native';
import { Icon,Header } from 'react-native-elements'
import Label from "../assets/Label-256.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../middleware/context";
import { useState } from 'react';

export default function Home (props){
  const { setId } = React.useContext(AuthContext);
  const [subastas,setSubs]=React.useState([]);
  const [isLoading,setIsLoading] = React.useState(true)
  //let fecha = subastas.map(object=>(object.startTime))
  //console.log(fecha)


  useEffect(()=>{
    fetch('https://subastas-spring-backend.herokuapp.com/auctions?status=active,pending', {
        method:"GET",
        mode: 'cors',
        crossDomain:true,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        })
        .then(response =>response.json())
        .then(response => {if(response!=null){
        //console.log(response)
        setSubs(subastas.concat(response))
        setIsLoading(false)
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  },[]);
  
  function nav(key){
    setId(key)
    props.navigation.navigate("Subasta")
  }
  if(isLoading){
    return(
      <View>
        <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'SUBASTAS', style: { color: '#fff',fontWeight:"bold" } }}
            />
        <ActivityIndicator size="large" color="#7063ff" style={{marginTop:250}}/>
      </View>
    )
  }
  else{
  return (
    <SafeAreaView style={styles.container}>
      <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'SUBASTAS', style: { color: '#fff',fontWeight:"bold" } }}
            />
            <FlatList
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({ highlighted }) => (
                    <View
                      style={[
                        styles.separator,
                        highlighted && { marginLeft: 0 }
                      ]}
                    />
                  ))
                }
                data={subastas}
                renderItem={({ item, index, separators }) => {
                  let fecha=new Date(item.startTime+"Z")
                  let date=fecha.toLocaleDateString()
                  let tiempo=fecha.toLocaleTimeString()
                
                  return(
                  <TouchableHighlight
                    key={item.id}
                    onPress={() =>nav(item.id)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={styles.item}>
                      {item.category==="ORO"?
                      <Image source={require("../assets/Gold-Medal-High-Quality-PNG.png")}  style={{height:50, width:50}}/>:
                      item.category==="PLATA"?
                      <Image source={require("../assets/Silver-Medal-PNG-File.png")}  style={{height:60, width:50}}/>:
                      item.category==="COMUN"?
                      <Image source={require("../assets/favpng_bronze-medal-gold-medal.png")}  style={{height:60, width:50}}/>:null
                      }
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.title}>  | </Text>
                      <Text style={styles.desc}>{item.category}</Text>
                      <Text  style={{position:"absolute",top:70,left:70}}>Fecha de Inicio: {date+" "+tiempo}</Text>
                    </View>
                  </TouchableHighlight>
                )}}
              />
            </SafeAreaView>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    alignItems:"center",
    flexDirection:"row",
    backgroundColor:"#fff"
  },
  title: {
    fontSize: 20,
  },
  desc:{
    fontSize:20,
  },
  sep:{
    height: 1,
    marginHorizontal:30,
    width: "80%",  
    backgroundColor: "#b8b6ba",
  },
  separator:{
    backgroundColor:"#fff"
  }
});
