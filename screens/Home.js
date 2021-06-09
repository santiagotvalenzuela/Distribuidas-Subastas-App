import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image,TouchableOpacity,ScrollView } from 'react-native';
import { Icon,Header } from 'react-native-elements'
import * as RootNavigation from '../App.js';
import Label from "../assets/Label-256.png"

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Subasta 1 | Plata | ',
    desc: "15/5/21",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Subasta 2 | Oro | ',
    desc: "5/5/21",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Subasta 3 | Plata | ',
    desc: "3/6/21",
  },
];

const Item = ({ title, desc }) => (
  <ScrollView>
    <TouchableOpacity onPress={()=>RootNavigation.navigate("Subasta")}>
    <View style={styles.item}>
      <Image source={require("../assets/Label-256.png")}  style={{height:50, width:50}}/>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
    </TouchableOpacity>
    <View style={styles.sep}/>
  </ScrollView>
);

export default class SubastasLista extends React.Component {
  render(){
  const renderItem = ({ item }) => <Item title={item.title} desc={item.desc} />;
  return (
    <SafeAreaView style={styles.container}>
      <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>this.props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'SUBASTAS', style: { color: '#fff',fontWeight:"bold" } }}
            />
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
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
  }
});
