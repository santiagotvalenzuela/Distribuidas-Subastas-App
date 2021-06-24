import React from "react"
import {View,StyleSheet,ImageBackground,Dimensions} from "react-native"
import {Block,theme,Text} from "galio-framework"
import {Icon} from "react-native-elements"
const { width, height } = Dimensions.get("screen");
import fondo from "../assets/wallApp.png";

export default function EliminarMedio(){
        return(
            <ImageBackground source={fondo} style={styles.image}>
            <Block safe flex middle>
                <Block style={styles.registerContainer}>
                    <Block style={styles.block}>
                        <Text p center bold>VISA</Text>
                        <Text p center>nro: 432423123</Text>
                        <Text p center>código de seguridad: ***</Text>
                        <View style={{height:5}}/>
                        <Icon name='delete' color="#e31212" style={styles.inputIcons}/>
                    </Block>
                    <Block style={styles.block}>
                        <Text p center bold>CBU</Text>
                        <Text p center>Alias:EJEMPLO.ARS</Text>
                        <Text p center>nro: 32122132332112</Text>
                        <View style={{height:5}}/>
                        <Icon name='delete' color="#e31212" style={styles.inputIcons}/>
                    </Block>
                </Block>
            </Block>
            </ImageBackground>
        )
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
        marginTop:20,
        padding:15,
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
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      
})