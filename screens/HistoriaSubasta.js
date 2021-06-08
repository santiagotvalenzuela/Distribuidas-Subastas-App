import React from "react"
import {View,Dimensions,StyleSheet,ImageBackground} from "react-native"
import {Block,Text,theme} from "galio-framework"
import fondo from "../assets/wallApp.png";
const { width, height } = Dimensions.get("screen");


export default class HistoriaS extends React.Component{
    render(){
        return(
            <ImageBackground source={fondo} style={styles.image}>
            <Block safe flex middle>
                <Block style={styles.registerContainer}>
                <Text p style={{marginHorizontal:5}}>Articulo 3 - Subasta 1</Text>
                <View style={{height:60}}/>
                <Text h3 style={styles.text}>Valor Actual</Text>
                <Text h2 style={styles.text}>$4500</Text>
                <View style={styles.sep}/>
                <View style={{height:40}}/>
                <Block style={styles.block}>
                    <Text center p>VALOR BASE: $4000</Text>
                    <View style={{height:10}}/>
                    <Text center p>ID 01:$4040</Text>
                    <Text center p>ID 02:$4200</Text>
                    <Text center p>ID 03:$4300</Text>
                    <Text center p>ID 04:$4500</Text>
                </Block>
            </Block>
            </Block>
            </ImageBackground>
        )
    }
}

const styles=StyleSheet.create({
    block:{
        borderTopLeftRadius: theme.SIZES.BASE * 2,
        borderTopRightRadius: theme.SIZES.BASE * 2,
        borderBottomLeftRadius:theme.SIZES.BASE * 2,
        borderBottomRightRadius:theme.SIZES.BASE * 2,
        backgroundColor:"#e8e8e8",
        width:width*0.85,
        marginHorizontal:10,
    },
    text:{
        textAlign:"center",
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      registerContainer: {
        width: width * 0.9,
        height: height * 0.875,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
      },
      sep:{
        height: 1,
        marginHorizontal:17,
        width: width*0.8,  
        backgroundColor: "#b8b6ba",
        marginBottom:8,
        marginTop:10,
      }
})