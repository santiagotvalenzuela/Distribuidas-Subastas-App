import React,{useState} from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View
} from "react-native";
import { Block, Text, theme,Button} from "galio-framework";
import Picker from "../components/picker"
const { width } = Dimensions.get('screen');
import Reloj from '../components/reloj'
import { SafeAreaView } from "react-native";


export default class Subasta extends React.Component{
    renderArticles=()=>{
        return(
        <SafeAreaView showsVerticalScrollIndicator={false}>
            <View style={{height:20}}/>
            <Block style={styles.home}>
            <Text   style={styles.texto} >Macbook Air</Text>
            <Text   style={styles.texto} >ID: 04</Text>
            </Block>
            <View style={{height:20}}/>
            <Text  center style={{fontSize:20}}>VALOR ACTUAL: 4500$</Text>
            <View style={{height:20}}/>
            <Text  center bold style={{fontSize:20}}>TIEMPO RESTANTE</Text>
            <Reloj/>
            <View style={{height:10}}/>
            <View style={styles.sep}/>
            <Text  center bold style={{fontSize:20}}>Elegir Medio de Pago</Text>
            <View style={{height:4}}/>
            <Block flex middle>
              <Picker/>
            </Block>
            <View style={{height:50}}/>
            <Block style={styles.block}>
                <Block middle>
                <Button color="#8e38ff" style={styles.createButton}>
                    <Text color="#fff">PUJAR</Text>
                </Button>
                </Block>
                <View style={{height:100}}/>
            </Block>
        </SafeAreaView>
        )
        
    }


    render(){
        return(
            <Block flex center backgroundColor="#fff"> 
            {this.renderArticles()}
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
        flex:1,
      },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      articles: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
      },
      block:{
        backgroundColor:"#ededed",
        borderTopLeftRadius: theme.SIZES.BASE * 2,
        borderTopRightRadius: theme.SIZES.BASE * 2,
      },
      createButton: {
        width: width * 0.5,
        marginTop: 25
      },
      texto:{
        textAlign:"left",
        fontSize: 12,
        color:"#000",
        marginHorizontal:10,

      },
      sep:{
        height: 1,
        marginHorizontal:35,
        width: width*0.8,  
        backgroundColor: "#b8b6ba",
        marginBottom:20,
      }
      
});