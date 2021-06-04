import React from "react";
import {View,Dimensions,StyleSheet} from "react-native";
import {Button,Text,Block,theme } from "galio-framework";
import { Icon,Header } from 'react-native-elements'
import * as RootNavigation from '../App.js';

const { width, height } = Dimensions.get("screen");
export default class  Medios extends React.Component{
    render(){
    return(
        <View>
            <Header
        backgroundColor="#7063ff"
        leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: 'MEDIOS DE PAGO', style: { color: '#fff' } }}
            />
            <Button color="primary" style={styles.createButton} onPress={()=>RootNavigation.navigate("Tarjeta")}>
                <Text bold size={14} color= '#FFFFFF'>
                    TARJETA
                </Text>
            </Button>
            <Button color="primary" style={styles.createButton2} onPress={()=>RootNavigation.navigate("CBU")}>
                <Text bold size={14} color= '#FFFFFF'>
                    CBU
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