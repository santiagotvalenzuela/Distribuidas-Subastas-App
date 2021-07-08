import React,{useEffect,useState} from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Alert
} from "react-native";
import { Block, Text, theme,Button,Icon,Input} from "galio-framework";
import DropDownPicker from 'react-native-dropdown-picker';
const { width } = Dimensions.get('screen');
import { AuthContext } from "../middleware/context";
import { SafeAreaView } from "react-native";


export default function Subasta (){
  const { checkId } = React.useContext(AuthContext);
  const [subastas,setSubs]=React.useState([]);
  const { checkUser } = React.useContext(AuthContext);
  const [medios,setMedios] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [puja, setPuja] = useState(null);
  //const [moneda, setMoneda] = useState(null);



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
    let id2= checkUser();
        fetch('https://subastas-spring-backend.herokuapp.com/users/'+id2+'/payments?status=approved',{
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

    function prueba(){
      console.log(value)

    }
    const Puja=(id)=>{
      if(value!=null){
      fetch('https://subastas-spring-backend.herokuapp.com/items/'+id+'/bids',{
        method:"POST",
        mode: 'cors',
        crossDomain:true,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body:JSON.stringify({
          "bid":puja,
          "payment_method":value
        })
        })
        .then(response =>response.json())
        .then(response => {if (response.status==="ACTIVE"){
          Alert.alert("Puja Realizada")
        }
        else{
          Alert.alert("Error","Monto Insuficiente, Demasiado Alto o Moneda No Compatible con la Subasta")
        }})
        .catch(error=>{if(error){
        console.log(error)
        Alert.alert("ERROR")
        }
    })
  }
  else{
    Alert.alert("Debe Elegir Un Método de Pago")
  }
    }
  
      return(
            <Block flex center backgroundColor="#fff">
        {subastas.map((object)=>{if(object.status==="ACTIVE"){
          return(
        <SafeAreaView showsVerticalScrollIndicator={false}>
            <Block style={styles.home}>
            <Text   style={styles.texto} >{object.title}</Text>
            <Text   style={styles.texto} >ID: {object.id}</Text>
            </Block>
            <Text  center bold style={{fontSize:20,marginTop:20}}>VALOR ACTUAL: ${object.currentPrice}</Text>

            <Input style={{width:300,marginHorizontal:28,borderColor:theme.COLORS.INFO}}
             placeholder="Ingrese Valor A Pujar" 
             type="number-pad"  
             placeholderTextColor="grey"
             icon="credit"
             family="Entypo"
             onChangeText={puja=>setPuja(puja)}
             defaultValue={puja}
             />
             
            <View style={styles.sep}/>
            <Text  center bold style={{fontSize:20,marginBottom:1}}>Elegir Medio de Pago</Text>  
            <Block flex middle>
            <DropDownPicker
              open={open}
              itemKey="value"
              items={medios.map((object)=>({label: object.name,value:object.id}))}
              value={value}
              setOpen={setOpen}
              setValue={setValue}
              containerStyle={{height: 40,width:300}}
          />
            </Block>
            <Block style={styles.block}>
                <Block middle>
                <Button color="#8e38ff" style={styles.createButton} onPress={()=>Puja(object.id)}>
                    <Text color="#fff">PUJAR</Text>
                </Button>
                </Block>
            </Block>
        </SafeAreaView>
          )}})}
            </Block>
        )
      }


const styles = StyleSheet.create({
    home: {
        width: width,
        flex:1,
        marginTop:20,
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
        marginTop:50,
        height:170,
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

      },
      sep:{
        height: 1,
        marginHorizontal:35,
        width: width*0.8,  
        backgroundColor: "#b8b6ba",
        marginBottom:20,
        marginTop:10,
      }
      
});