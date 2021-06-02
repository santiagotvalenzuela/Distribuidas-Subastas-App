import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View
} from "react-native";
import { Block,Card, Checkbox, Text, theme,Input,Button,DeckSwiper,Accordion} from "galio-framework";
import { Icon,Header } from 'react-native-elements'
import Carrousel from "../components/carrousel"
import AppLoading from 'expo-app-loading';
const { width } = Dimensions.get('screen');
import Reloj from '../components/reloj'



export default class Subasta extends React.Component{
    renderArticles=()=>{
          
        return(
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={{height:20}}/>
            <Block style={styles.block}>
                <Block middle>
                <Button color="#8e38ff" style={styles.createButton}>
                    <Text color="#fff">PUJAR</Text>
                </Button>
                </Block>
                <View style={{height:315}}/>
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
        textAlign:"left",
        fontSize: 12,
        color:"#000",
        marginHorizontal:10,

      }
      
});