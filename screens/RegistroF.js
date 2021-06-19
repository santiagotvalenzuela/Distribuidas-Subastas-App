import React,{useState} from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme,Icon,Input,Button } from "galio-framework";
import fondo from "../assets/wallApp.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  argonTheme } from "../constants/Theme";
import { ScrollView } from "react-native";


const { width, height } = Dimensions.get("screen");


export default function RegistroF(props){
  
  const [pass, setText] = useState('');
  const [pass2, setText2] = useState('');

  const registrar=async()=>{
    let id;
    try {
      const value = await AsyncStorage.getItem('@id')
      if(value !== null) {
        console.log(value)
        id=value;
      }
    } catch(e) {
      console.log(e)
    }
    let uri="https://subastas-spring-backend.herokuapp.com/users/"+id+"/password"

    if (pass===pass2){
    fetch(uri, {
     method:"PATCH",
     crossDomain:true,
     headers: {
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({
       "password":pass
     })
    })
    .then(response => response.json(),props.navigation.navigate("AUCTION KING"))
    .then(result => console.log(result))
    .catch(error=>{if(error){
      console.log(error)
      Alert.alert("Error al Cargar Constraseña")
    }
  }
  )
  }
  else{
    Alert.alert("CONSTRASEÑAS NO SON IGUALES")
  }
}

    return (
      <ImageBackground source={fondo} style={styles.image}>
      <Block flex middle>
          <Block safe flex middle>
              <ScrollView>
            <Block style={styles.registerContainer}>
              
              <Block flex>
                <Block flex={0.17} middle>
                  <Text bold  center color="#000000" size={22}>
                    VAMOS A MANTENERTE SEGURO!
                  </Text>
                </Block>
                <Block flex={0.09} middle>
                <Text center color="#34333b" size={14}>
                    Ingresa Una Constraseña Segura!
                  </Text>
                </Block>
                <View style={{height:20}}/>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        borderless
                        placeholder="Constraseña"
                        placeholderTextColor="grey"
                        onChangeText={pass=>setText(pass)}
                        defaultValue={pass}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        borderless
                        placeholder="Confirmar Contraseña"
                        placeholderTextColor="grey"
                        onChangeText={pass2=>setText2(pass2)}
                        defaultValue={pass2}
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={registrar}>
                        <Text bold size={14} color= '#FFFFFF'>
                          VALIDAR CUENTA
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
            </ScrollView>
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

