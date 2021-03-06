import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme,Input,Button,Radio,ScrollView } from "galio-framework";
import fondo from "../assets/wallApp.png";
import { Icon,Header } from 'react-native-elements'
import { AuthContext } from "../middleware/context";

const { width, height } = Dimensions.get("screen");

export default function CBU (){
  const { checkUser } = React.useContext(AuthContext);
  const [alias,setAlias] = React.useState('');
  const [name,setName] = React.useState('');
  const [moneda,setMoneda] = React.useState('');
  console.log(moneda)


  const CargarDatos=()=>{
    let id= checkUser();
    fetch('https://subastas-spring-backend.herokuapp.com/users/'+id+'/payments',{
      method:"POST",
      mode: 'cors',
      crossDomain:true,
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "name":name,
        "type":"CBU",
        "currency":moneda,
        "data":{
          "alias":alias,
        }
      }),
      credentials: 'same-origin',
      })
      .then(response =>response.json())
      .then(res=>console.log(res))
      .then(Alert.alert('Datos Cargados Correctamente!'))
      .catch(error=>{if(error){
      console.log(error)
      Alert.alert("ERROR")
      }
  })
  }

    return (
      <ImageBackground source={fondo} style={styles.image}>
      <Block flex middle>
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              
              <Block flex>
                <Block flex={0.17} middle>
                  <Text bold color="#000000" size={22}>
                    CBU
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ padding:50 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Alias"
                        placeholderTextColor="grey"
                        onChangeText={alias=>setAlias(alias)}
                        defaultValue={alias}
                        iconContent={
                            <Icon
                                name='edit'
                                style={styles.inputIcons}
                            />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Nombre"
                        placeholderTextColor="grey"
                        onChangeText={name=>setName(name)}
                        defaultValue={name}
                        iconContent={
                            <Icon
                                name='edit'
                                style={styles.inputIcons}
                            />
                        }
                      />
                    </Block>
                    <Text center p bold style={{marginTop:7,marginBottom:5}}>Moneda Del Medio de Pago: </Text>
                    <Block style={{flexDirection:"row",marginHorizontal:10,marginTop:10}}>
                      <Radio  containerStyle={{paddingHorizontal:10,marginHorizontal:25}} label="D??lares" color="info" onChange={()=>setMoneda("DOLAR")}  />
                      <Radio  label="Pesos" color="info"  onChange={()=>setMoneda("PESO")}/>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={CargarDatos}>
                        <Text bold size={14} color= '#FFFFFF'>
                          ACEPTAR CAMBIOS
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block> 
      </Block>
         
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
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
  socialConnect: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor:'#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: '#5E72E4',
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});