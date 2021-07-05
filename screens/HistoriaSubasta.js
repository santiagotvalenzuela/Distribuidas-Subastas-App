import React,{useEffect, useState} from "react"
import {View,Dimensions,StyleSheet,ImageBackground,FlatList} from "react-native"
import {Block,Text,theme} from "galio-framework"
import fondo from "../assets/wallApp.png";
import { AuthContext } from "../middleware/context";
const { width, height } = Dimensions.get("screen");


export default function HistoriaS (){
  const { checkItem } = React.useContext(AuthContext);
  const [bids,setBids]=useState([])
  const [article,setArticle] = useState([])
  const item=checkItem()
  //console.log(bids)

  useEffect(()=>{
    fetch('https://subastas-spring-backend.herokuapp.com/items/'+item+'/bids', {
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
        setBids(bids.concat(response))
        
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
      })
    fetch('https://subastas-spring-backend.herokuapp.com/items/'+item, {
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
        setArticle(response)
        
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
    },[]);

        return(
            <ImageBackground source={fondo} style={styles.image}>
            <Block safe flex middle>
                <Block style={styles.registerContainer}>
                <Text p style={{marginHorizontal:5,marginTop:10}}>ID de Articulo:{item}</Text>
                <View style={{height:60}}/>
                <Text h3  bold style={styles.text}>Historial De Pujas</Text>
                <Text h4 style={styles.text2}>{article.title}</Text>
                <View style={styles.sep}/>
                <View style={{height:40}}/>
                <Block style={styles.block}>
                    <Text center p>VALOR BASE: ${article.basePrice}</Text>
                    <View style={{height:10}}/>
                    {bids.map(object=>{
                      return(<Text key={object.id} center p>{object.bidderUsername}:${object.bid}</Text>)
                    })}
                    
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
    },
    text:{
        textAlign:"center",
        marginBottom:10,
    },
    text2:{
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