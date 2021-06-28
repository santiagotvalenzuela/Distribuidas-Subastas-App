import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Block, Checkbox, Text, theme,Input,Button,ScrollView } from "galio-framework";
import fondo from "../assets/wallApp.png";
import { Icon,Header } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from "../middleware/context";


const { width, height } = Dimensions.get("screen");

export default function Tarjeta () {
  const { checkUser } = React.useContext(AuthContext);
  const [nro,setNro] = React.useState('');
  const [cod,setCod] = React.useState('');
  const [fecha,setFecha] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Visa', value: 'Visa'},
    {label: 'MasterCard', value: 'MasterCard'},
    {label: 'American', value: 'American'}
  ])


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
        "name":value,
        "type":"CREDIT_CARD",
        "data":{
          "primeros_4":cod,
          "ultimos_6":nro,
          "fecha_vencimiento":fecha,
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
              <View style={{height:20}}/>
                <Block flex={0.17} middle>
                  <Text bold color="#000000" size={22}>
                    Tarjeta
                  </Text>
                  <View style={{height:20}}/>
                  <DropDownPicker
                      center
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      containerStyle={{height: 40,width:300}}
                  />
                </Block>
                <View style={{height:20}}/>
                
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ padding: 30 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Nro de Tarjeta"
                        placeholderTextColor="grey"
                        type="number-pad"
                        onChangeText={nro=>setNro(nro)}
                        defaultValue={nro}
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
                        placeholder="Vencimiento"
                        placeholderTextColor="grey"
                        onChangeText={fecha=>setFecha(fecha)}
                        defaultValue={fecha}
                        iconContent={
                            <Icon
                                name='edit'
                                style={styles.inputIcons}
                            />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        password
                        placeholder="Código de Seguridad"
                        placeholderTextColor="grey"
                        type="number-pad"
                        onChangeText={cod=>setCod(cod)}
                        defaultValue={cod}
                        iconContent={
                            <Icon
                                name='edit'
                                style={styles.inputIcons}
                            />
                        }
                      />
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