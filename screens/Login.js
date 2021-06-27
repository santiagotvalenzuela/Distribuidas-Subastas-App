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
import { ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios').default;
const { width, height } = Dimensions.get("screen");
import { AuthContext } from "../middleware/context";


export default function Login (props) {
  const [user, setText] = React.useState('');
  const [pass, setText2] = React.useState('');
  const { signIn } = React.useContext(AuthContext);
  const { setUserId } = React.useContext(AuthContext);

  const login=async()=>{
    fetch('https://subastas-spring-backend.herokuapp.com/login', {
     method:"POST",
     mode: 'cors',
     crossDomain:true,
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
     body:JSON.stringify({
       "username":user,
       "password":pass
     })
    })
    .then(response =>response.json())
    .then(result => {if(result!=null){
      console.log(result)
      storeData(result.user.username,result.session)
      signIn()
      setUserId(result.user.user_id)
      props.navigation.navigate("Home")
    }})
    .catch(error=>{if(error){
      console.log(error)
      Alert.alert("Email o Constraseña Invalidos")
    }
  })
}
const storeData = async (usuario,cookie) => {
  try {
    const jsonValue = JSON.stringify(usuario)
    await AsyncStorage.setItem('@user', jsonValue)
    const jsonValue2 = JSON.stringify(cookie)
    await AsyncStorage.setItem('@cookie', jsonValue2)
  } catch (e) {
    console.log(e)
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
                    INGRESA A TU CUENTA
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        type="email-address"
                        placeholder="Usuario"
                        placeholderTextColor="grey"
                        onChangeText={user=>setText(user)}
                        defaultValue={user}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        password
                        borderless
                        placeholder="Contraseña"
                        placeholderTextColor="grey"
                        onChangeText={pass=>setText2(pass)}
                        defaultValue={pass}
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={login}>
                        <Text bold size={14} color= '#FFFFFF'>
                          INGRESAR
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

