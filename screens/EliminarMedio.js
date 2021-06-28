import React,{useEffect} from "react"
import {View,StyleSheet,ImageBackground,Dimensions,FlatList,TouchableOpacity,Alert} from "react-native"
import {Block,theme,Text} from "galio-framework"
import {Icon} from "react-native-elements"
const { width, height } = Dimensions.get("screen");
import fondo from "../assets/wallApp.png";
import { AuthContext } from "../middleware/context";


export default function EliminarMedio(){
    const { checkUser } = React.useContext(AuthContext);
    const [medios,setMedios] = React.useState([]);

    useEffect(()=>{
        let id= checkUser();
        fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/payments',{
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
          setMedios(response)
          }})
          .catch(error=>{if(error){
          console.log(error)
          Alert.alert("ERROR")
          }
      })
    },[]);
    
    const Eliminar=(cod)=>{
        let id= checkUser();
        fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/payments/'+cod,{
          method:"DELETE",
          mode: 'cors',
          crossDomain:true,
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          })
          .then(Alert.alert("Medio Eliminado"))
          .catch(error=>{if(error){
          console.log(error)
          Alert.alert("ERROR")
          }
      })
    } 
        return(
            <ImageBackground source={fondo} style={styles.image}>
            <Block safe flex middle>
                <Block style={styles.registerContainer}>
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
                data={medios}
                renderItem={({ item, index, separators }) => (
                    <Block style={styles.block}>
                        <Text p center bold>{item.type}</Text>
                        <Text p center>{item.name}</Text>
                        <Text p center>Nro:{item.data.ultimos_6}</Text>
                        <View style={{height:5}}/>
                        <TouchableOpacity onPress={()=>Eliminar(item.id)}>
                            <Icon name='delete' color="#e31212" style={styles.inputIcons} />
                        </TouchableOpacity>
                    </Block>
                )}
              />
                    
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
        marginTop:20,
        padding:15,
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
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      
})