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
const { width, height } = Dimensions.get("screen");

export default function RegistroV (props) {
  const [code, setText] = useState('');
  const [mail, setText2] = useState('');

  const registrar=async()=>{
    console.log(code)
    console.log(mail)
    console.log(code,mail)
    fetch('https://subastas-spring-backend.herokuapp.com/validate', {
     method:"POST",
     crossDomain:true,
     headers: {
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({
       "mail":mail,
       "validationCode":code
     })
    })
    .then(response => response.json())
    .then(result => {if(result!=null){
      storeData(result.user_id)
      props.navigation.navigate("RegistroF")}})
    .catch(error=>{if(error){
      console.log(error)
      Alert.alert("Email o Código Invalido")
    }
  })
}
const storeData = async (result) => {
  try {
    const jsonValue = JSON.stringify(result)
    await AsyncStorage.setItem('@id', jsonValue)
  } catch (e) {
    console.log(e)
  }
}

    return (
      <ImageBackground source={fondo} style={styles.image}>
      <ScrollView>
      <Block flex middle>
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              
              <Block flex>
                <Block flex={0.17} middle>
                  <Text bold color="#000000" size={22}>
                    REGISTRATE
                  </Text>
                </Block>
                <Block flex={0.08} middle>
                <Text center color="#34333b" size={13}>
                    Ingresa El Código de Verificación que enviamos a tu mail!
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
                        borderless
                        type="email-address"
                        placeholder="Email"
                        placeholderTextColor="grey"
                        onChangeText={mail=>setText2(mail)}
                        defaultValue={mail}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        type="email-address"
                        placeholder="Código"
                        placeholderTextColor="grey"
                        onChangeText={code=>setText(code)}
                        defaultValue={code}
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
          </Block>
      </Block>
      </ScrollView>    
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

