import React,{useEffect,useState} from "react";
import {View,SafeAreaView,TouchableOpacity,ScrollView,Image,FlatList,StyleSheet,Dimensions,RefreshControl} from "react-native"
import { Icon,Header } from 'react-native-elements'
import {Block,Text,theme} from "galio-framework"
const { width, height } = Dimensions.get("screen");
import { AuthContext } from "../middleware/context";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Historial (props){
  const {checkUser} = React.useContext(AuthContext)
  const [subastas,setSubs]=useState([])
  const [data,setData] = useState([])
  const { checkSession } = React.useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const valor=checkSession()
  console.log(data)

  useEffect(()=>{
    let id = checkUser()
    console.log(id)
    fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/auctions?status=finished', {
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
        //console.log(response)
        setSubs(subastas.concat(response))
        }})
      fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/analytics', {
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
        //console.log(response)
        setData(response)
        }})   
      },[])
      
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        let id = checkUser()
        console.log(id)
        fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/auctions?status=finished', {
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
            //console.log(response)
            setSubs(subastas.concat(response))
            }})
          fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/analytics', {
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
            //console.log(response)
            setData(response)
            }})
        wait(1000).then(() => setRefreshing(false));
      }, []);


      if(valor===false){
        return(
          <View >
                <Header
        backgroundColor="#7063ff"
        leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
        centerComponent={{ text:'HISTORIAL', style: { color: '#fff' } }}
      />
      <Text center style={{marginTop:300}}>Necesita Iniciar Sesión Para Accerder a Esta Función</Text>
      </View>
        );
      }
      else{
        return(
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'HISTORIAL', style: { color: '#fff' } }}
        />
        <View style={{height:20}}/>
        <Block style={styles.block}>
            <Text center bold>ARTICULOS GANADOS:</Text>
            <View style={{height:10}}/>
            <Text center style={styles.text}>{data.items_won}</Text>
        </Block>
        <View style={{height:20}}/>
        <Block style={styles.block}>
            <Text center bold >PARTICIPACIONES EN SUBASTAS:</Text>
            <View style={{height:10}}/>
            <Text center style={styles.text}>{data.auctions_participated}</Text>
        </Block>
        <View style={{height:20}}/>
        <Block style={styles.block}>
            <Text center bold >PARTICIPACIONES EN ARTICULOS:</Text>
            <View style={{height:10}}/>
            <Text center style={styles.text}>{data.items_participated}</Text>
        </Block>
        <View style={{height:20}}/>
        <Block style={styles.block}>
            <Text center bold >TOTAL DE PUJAS:</Text>
            <View style={{height:10}}/>
            <Text center style={styles.text}>{data.total_bids}</Text>
        </Block>
        <View style={{height:30}}/>
        <Text center bold>HISTORIAL DE PARTICIPACIONES:</Text>
        <FlatList
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({ highlighted }) => (
                    <View
                      style={[
                        styles.separator,
                        highlighted && { marginLeft: 0 }
                      ]}
                    />
                  ))
                }
                data={subastas}
                
                renderItem={({ item, index, separators }) => (
                    <View style={styles.item}>
                    {item.category==="ORO"?
                      <Image source={require("../assets/Gold-Medal-High-Quality-PNG.png")}  style={{height:50, width:50}}/>:
                      item.category==="PLATA"?
                      <Image source={require("../assets/Silver-Medal-PNG-File.png")}  style={{height:60, width:50}}/>:
                      item.category==="COMUN"?
                      <Image source={require("../assets/favpng_bronze-medal-gold-medal.png")}  style={{height:60, width:50}}/>:null
                      }
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.title}>  | </Text>
                      <Text style={styles.desc}>{item.category}</Text>
                    </View>
                )}
              />
        </ScrollView>
        );
    }
  }


const styles = StyleSheet.create({
    block:{
        
        borderTopLeftRadius: theme.SIZES.BASE * 2,
        borderTopRightRadius: theme.SIZES.BASE * 2,
        borderBottomLeftRadius:theme.SIZES.BASE * 2,
        borderBottomRightRadius:theme.SIZES.BASE * 2,
        height: 100,
        backgroundColor:"#e8e8e8",
        width:width*0.95,
        marginHorizontal:10,
        },
    container: {
        flex: 1,
        },
        item: {
        padding: 20,
        alignItems:"center",
        flexDirection:"row",
        },
        title: {
        fontSize: 20,
        },
        desc:{
        fontSize:20,
        },
        sep:{
        height: 1,
        marginHorizontal:30,
        width: "80%",  
        backgroundColor: "#b8b6ba",
        },
        text:{
            fontWeight: "bold",
            color:"#7063ff",
            fontSize:30,
        }
})