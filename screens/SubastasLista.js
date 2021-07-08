import React,{useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView,View,TouchableOpacity,FlatList,Alert } from 'react-native';
import { Block, theme,Text,Button } from 'galio-framework';
import { Header,Icon } from 'react-native-elements'
import { Card } from 'galio-framework';
import { AuthContext } from "../middleware/context";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('screen');

function SubastasLista (props) {
  const { checkSession } = React.useContext(AuthContext);
  const { setId } = React.useContext(AuthContext);
  const { checkId } = React.useContext(AuthContext);
  const valor=checkSession()
  const [subastas,setSubs]=React.useState([]);
  console.log(subastas)
  const {checkUser} = React.useContext(AuthContext)
  
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

  /**const getData=async()=>{
    try{
      let auth=await AsyncStorage.getItem("@cookie")
      .then(Participar(auth))

    }
    catch(e) {
      console.log(e)
    }
  }**/

  const Participar=async(cookie)=>{
    let id=checkId()
      fetch('https://subastas-spring-backend.herokuapp.com/auctions/'+id, {
       method:"PUT",
       mode: 'cors',
       crossDomain:true,
       headers: {
        'Set-Cookie':cookie,
      },
      credentials: 'same-origin',
      })
      //.then(response =>console.log(response.status))
      .then(res => {if(res.status!="409"){
        Alert.alert("¡Participación Solicitada!")
      }
    else{
      Alert.alert("Su Categoría de Usuario No Es Compatible con esta Subasta")
    }})
      .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
      }
    })
  }

  function nav(key){
    setId(key)
    props.navigation.navigate("MuestraArticulo")
  }
    return (
      <Block flex center style={styles.home}>  
        <SafeAreaView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          { valor===true ?
            <Button color="primary" style={styles.createButton} onPress={Participar}>
                  <Text bold center size={14} color= '#FFFFFF'>
                    SOLICITAR PARTICIPACIÓN
                  </Text>
              </Button>:null}
        <View style={styles.sep}/>
        <Block flex>
          
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
                  <TouchableOpacity onPress={()=>nav(item.id)}>
                    <Card
                        flex
                        key={item.id}
                        borderless
                        caption={item.description}
                        style={styles.card}
                        title={item.title}
                        avatar='https://pngimg.com/uploads/price_label/price_label_PNG77.png'
                        imageStyle={styles.cardImageRadius}
                        imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                        image={item.image_urls.reduce((object)=>{return `${object}`})}
                        />
                    </TouchableOpacity>
                )}
                />
                <View style={{height:20}}/>
        </Block>
      </SafeAreaView>
      </Block>
      
    );
  }


const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  createButton: {
    width: width * 0.7,
    marginHorizontal:36,
  },
  sep:{
    height: 1,
    marginHorizontal:4,
    width: width*0.9,  
    backgroundColor: "#b8b6ba",
    marginBottom:20,
  }
});

export default SubastasLista;