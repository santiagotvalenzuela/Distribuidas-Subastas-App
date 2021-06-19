import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View
} from "react-native";
import { Block,Card, Checkbox, Text, theme,Input,Button,DeckSwiper} from "galio-framework";
import Carrusel from "../components/carrusel"
import AppLoading from 'expo-app-loading';
const { width } = Dimensions.get('screen');


export default class Subasta extends React.Component{
    renderArticles=()=>{
        return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:20}}/>
            <Block>
            <Text  center bold size={30} color="#000" >Macbook Air</Text>
            </Block>
            <View style={{height:20}}/>
            <Carrusel center/>
            <View style={{height:20}}/>
            <Text  center style={{fontSize:20}}>VALOR BASE: 4000$</Text>
            <View style={styles.sep}/>
            <View style={{height:20}}/>
            <Block style={styles.block}>
                <Text center bold>DESCRIPCIÓN</Text>
                <View style={{height:10}}/>
                <Text style={styles.texto}>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí".</Text>
                <View style={{height:62}}/>
                <Block middle>
                </Block>
                <View style={{height:90}}/>
            </Block>
        </ScrollView>
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
        textAlign:"justify",
        fontSize: 15,
        color:"#000",
        marginHorizontal:10,

      },
      sep:{
        height: 1,
        marginHorizontal:15,
        width: width*0.9,  
        backgroundColor: "#b8b6ba",
        marginBottom:8,
      }
      
});