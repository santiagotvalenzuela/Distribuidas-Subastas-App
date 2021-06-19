import React from "react";
import {View,Dimensions,StyleSheet} from "react-native";
import {Button,Text,Block,theme } from "galio-framework";
import { Icon,Header } from 'react-native-elements'

const { width, height } = Dimensions.get("screen");
export default class  Medios extends React.Component{
    render(){
    return(
        <View>
            <Button color="primary" style={styles.createButton} onPress={()=>this.props.navigation.navigate("SubastaScreen")}>
                <Text bold size={14} color= '#FFFFFF'>
                    PARTICIPAR
                </Text>
            </Button>
            <Button color="primary" style={styles.createButton2} onPress={()=>this.props.navigation.navigate("verArticulos")}>
                <Text bold size={14} color= '#FFFFFF'>
                    VER ARTÍCULOS
                </Text>
            </Button>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    createButton: {
        width: width * 0.7,
        marginTop:250,
        marginHorizontal:53,
      },
      createButton2: {
        width: width * 0.7,
        marginTop:20,
        marginHorizontal:53,
      },
      block:{
        backgroundColor:"#cbc8cf",
        borderTopLeftRadius: theme.SIZES.BASE * 2,
        borderTopRightRadius: theme.SIZES.BASE * 2,
        borderBottomLeftRadius:theme.SIZES.BASE * 2,
        borderBottomRightRadius:theme.SIZES.BASE * 2,
        height: 100,
        },
})