import React,{useEffect} from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Image
} from "react-native";
import { Block,Card, Checkbox, Text, theme,Input,Button,DeckSwiper} from "galio-framework";
import { SliderBox } from "react-native-image-slider-box";
const { width } = Dimensions.get('screen');



export default function Subasta (){
  const [subastas,setSubs]=React.useState({});
  

  useEffect(()=>{
    fetch('https://subastas-spring-backend.herokuapp.com/items/3', {
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
        setSubs(response)
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  },[]);

        return(
        <Block flex center backgroundColor="#fff"> 
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{height:20}}/>
            <Block>
            <Text  center bold size={30} color="#000" >{subastas.title}</Text>
            <View style={{height:20}}/>
            </Block>
            <Image style={styles.logo} source= {{uri:"https://res.cloudinary.com/dr4i78wvu/image/upload/v1624488419/initial/zapatilla_2.jpg",}}/>
            <View style={{height:20}}/>
            <View style={{height:20}}/>
            <Text  center style={{fontSize:20}}>VALOR BASE: 4000$</Text>
            <View style={styles.sep}/>
            <View style={{height:20}}/>
            <Block style={styles.block}>
                <Text center bold>DESCRIPCIÓN</Text>
                <View style={{height:10}}/>
                <Text style={styles.texto}>{subastas.description}</Text>
                <View style={{height:62}}/>
                <Block middle>
                </Block>
                <View style={{height:170}}/>
            </Block>
        </ScrollView>
        </Block>
        )
        
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
      },
      logo: {
        width: 370,
        height: 200,
        
      },
      
});