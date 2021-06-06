import React from "react";
import {View,SafeAreaView,TouchableOpacity,ScrollView,Image,FlatList,StyleSheet,Dimensions} from "react-native"
import { Icon,Header } from 'react-native-elements'
import {Block,Text,theme} from "galio-framework"
const { width, height } = Dimensions.get("screen");

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item | Plata | ',
      desc: "28/10/21",
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Subasta 2 | Oro | ',
      desc: "28/10/21",
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item | Plata | ',
      desc: "28/10/21",
    },
  ];

  const Item = ({ title, desc }) => (
    <ScrollView>
      <View style={styles.item}>
        <Image source={require("../assets/Label-256.png")}  style={{height:50, width:50}}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <View style={styles.sep}/>
    </ScrollView>
  );

export default class Historial extends React.Component{
    render(){
        const renderItem = ({ item }) => <Item title={item.title} desc={item.desc}/>;
        return(
        <SafeAreaView>
            <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>this.props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'HISTORIAL', style: { color: '#fff' } }}
        />
        <View style={{height:20}}/>
        <Block style={styles.block}>
            <Text center bold>ARTICULOS GANADOS:</Text>
            <View style={{height:10}}/>
            <Text center style={styles.text}>2</Text>
        </Block>
        <View style={{height:20}}/>
        <Block style={styles.block}>
            <Text center bold >ARTICULOS OFERTADOS:</Text>
            <View style={{height:10}}/>
            <Text center style={styles.text}>5</Text>
        </Block>
        <View style={{height:30}}/>
        <Text center bold>HISTORIAL DE PARTICIPACIONES:</Text>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    block:{
        
        borderTopLeftRadius: theme.SIZES.BASE * 2,
        borderTopRightRadius: theme.SIZES.BASE * 2,
        borderBottomLeftRadius:theme.SIZES.BASE * 2,
        borderBottomRightRadius:theme.SIZES.BASE * 2,
        height: 100,
        backgroundColor:"#e8e8e8",
        width:width*0.95,
        marginHorizontal:10,
        },
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
        },
        text:{
            fontWeight: "bold",
            color:"#7063ff",
            fontSize:30,
        }
})