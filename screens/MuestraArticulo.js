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
import { AuthContext } from "../middleware/context";


export default function Subasta (){
  const [subastas,setSubs] = React.useState([]);
  const [images,setImages] = React.useState([])
  const { checkId } = React.useContext(AuthContext);
  const { checkSession } = React.useContext(AuthContext);
  const valor=checkSession()

  useEffect(()=>{
    let id = checkId();
    fetch('https://subastas-spring-backend.herokuapp.com/items/'+id, {
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
        setImages(images.concat(response.image_urls))
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  },[]);
  const Carrusel=()=>{
    return(
    <SliderBox
          images={images}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />
    );
  }

        return(
        <Block flex center backgroundColor="#fff"> 
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:20}}/>
            <Block>
            <Text  center bold size={30} color="#000" >{subastas.title}</Text>
            <View style={{height:20}}/>
            </Block>
            <Carrusel/>
            <View style={{height:20}}/>
            <View style={{height:20}}/>
            {valor===true?
            <Text  center  size={20} color="#000" >PRECIO BASE: ${subastas.basePrice}</Text>:null}
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