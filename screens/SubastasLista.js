import React,{useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView,View,TouchableOpacity,FlatList } from 'react-native';
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
  const valor=checkSession()
  const [subastas,setSubs]=React.useState([]);

  

  useEffect(()=>{
    let id=setId()
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
        //console.log(response)
        setSubs(subastas.concat(response))
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  },[]);
    return (
      <Block flex center style={styles.home}>  
        <SafeAreaView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          { valor===true ?
            <Button color="primary" style={styles.createButton}>
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
                  <TouchableOpacity onPress={()=>props.navigation.navigate("MuestraArticulo")}>
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