import React,{useEffect} from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  SafeAreaView,
  RefreshControl
} from "react-native";
import { Block,Card, Checkbox, Text, theme,Input,Button,DeckSwiper} from "galio-framework";
const { width } = Dimensions.get('screen');
import Reloj from '../components/reloj'
import { AuthContext } from "../middleware/context";
import { SliderBox } from "react-native-image-slider-box";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Subasta (props){
  const { checkId } = React.useContext(AuthContext);
  const { setItem } = React.useContext(AuthContext);
  const [subastas,setSubs]=React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  
  useEffect(()=>{
    let id=checkId()
    fetch('https://subastas-spring-backend.herokuapp.com/auctions/'+id+'/items', {
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
        setSubs(subastas.concat(response))
        
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  },[]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let id=checkId()
    fetch('https://subastas-spring-backend.herokuapp.com/auctions/'+id+'/items', {
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
        setSubs(subastas.concat(response))
        
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
    wait(1000).then(() => setRefreshing(false));
  }, []);
  
  function nav(key){
    setItem(key)
    props.navigation.navigate("Historial")
  }

        return(
            <Block flex center backgroundColor="#fff"> 
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{height:20}}/>
            {subastas.map((object)=>{if(object.status==="ACTIVE"){
              return(
              <SafeAreaView>
              <Block>
              <Text  center bold size={30} color="#000" >{object.title}</Text>
              </Block>
              <View style={{height:20}}/>
              <SliderBox center
                images={object.image_urls}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
              />
              <View style={{height:20}}/>
              <Text  center style={{fontSize:20}}>VALOR ACTUAL: ${object.currentPrice}</Text>
              <View style={styles.sep}/>
              <View style={{height:20}}/>
              <Text  center bold style={{fontSize:20}}>TIEMPO RESTANTE</Text>
              <Reloj valor={object.active_until} id={object.id}/>
              <View style={{height:20}}/>
              <Block style={styles.block}>
                  <Text center bold>DESCRIPCIÓN</Text>
                  <View style={{height:10}}/>
                  <Text style={styles.texto}>{object.description}</Text>
                  <View style={{height:20}}/>
              </Block>
              <Block style={styles.block2} middle>
                  <Button color="#8e38ff" style={styles.createButton} onPress={()=>props.navigation.navigate("PUJA")}>
                    <Text color="#fff">PUJAR</Text>
                </Button>
                <Button color="#8e38ff" style={styles.createButton} onPress={()=>nav(object.id)}>
                    <Text color="#fff">HISTORIAL</Text>
                </Button>
                <View style={{height:90}}/>
                </Block>          
          </SafeAreaView>
            )}})}
           
                
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
      block2:{
        backgroundColor:"#ededed",
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