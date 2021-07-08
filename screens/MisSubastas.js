import React,{useEffect,ComponentDidUpdate} from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar,TouchableHighlight, Image,RefreshControl } from 'react-native';
import { Text,Block } from 'galio-framework';
import { Icon,Header } from 'react-native-elements'
import { AuthContext } from "../middleware/context";
import Constants from 'expo-constants';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function misSubastas(props){
  const { setId } = React.useContext(AuthContext);
  const [subastas,setSubs]=React.useState([]);
  const [activas,setActive] = React.useState([]);
  const {checkUser} = React.useContext(AuthContext)
  const [refreshing, setRefreshing] = React.useState(false);
  const { checkSession } = React.useContext(AuthContext);


  useEffect(()=>{
    let id = checkUser()
    console.log(id)
    fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/auctions?status=pending', {
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
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
    fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/auctions?status=active', {
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
        setActive(activas.concat(response))
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  },[]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      let id = checkUser()
      console.log(id)
      fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/auctions?status=pending', {
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
      fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/auctions?status=active', {
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
        setActive(activas.concat(response))
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
    wait(1000).then(() => setRefreshing(false));
  }, []);

  
  function nav(key){
    setId(key)
    props.navigation.navigate("Participación")
  }
  const valor=checkSession()

        if (valor===false){
            return(
                <View >
                    <Header
            backgroundColor="#7063ff"
            leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
            centerComponent={{ text: 'SUBASTAR ARTICULO', style: { color: '#fff' } }}
        />
                <Text center style={{marginTop:300, marginLeft:10}}>Necesita Iniciar Sesión Para Accerder a Esta Función</Text>
                </View>
            );
        }
        else{
  return (
    <SafeAreaView style={styles.container}>
      <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'MIS SUBASTAS', style: { color: '#fff',fontWeight:"bold" } }}
            />
             <Block style={{backgroundColor:"#E1DEE1",marginLeft:5}} >
              <Text p bold>Subastas Activas</Text>
            </Block>
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
                data={activas}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                renderItem={({ item, index, separators }) => (
                  <TouchableHighlight
                    key={item.id}
                    onPress={() =>nav(item.id)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
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
                  </TouchableHighlight>
                )}
              />
            <Block style={{backgroundColor:"#E1DEE1",marginLeft:5}}>
              <Text p bold>Subastas Pendientes</Text>
            </Block>
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
            </SafeAreaView>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    alignItems:"center",
    flexDirection:"row",
    backgroundColor:"#fff"
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
  separator:{
    backgroundColor:"#fff"
  }
});
