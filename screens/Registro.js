import React,{useState} from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme,Icon,Input,Button } from "galio-framework";
import fondo from "../assets/wallApp.png";
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get("screen");

export default function Registro(props) {
  const [user, setText] = useState('');
  const [mail, setText2] = useState('');
  const [flag,setFlag] = useState(false);

  const registrar=()=>{
    console.log(user,mail)
    fetch('https://subastas-spring-backend.herokuapp.com/users', {
     method:"POST",
     crossDomain:true,
     headers: {
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({
       "username":user,
       "mail":mail
     })
    })
    .then(response => response.json())
    .then(result => {if(result.status==="CONFLICT"){
      Alert.alert("Usuario o Mail Ya Existen")
      }
      else{
        console.log(result)
        props.navigation.navigate("RegistroV")
      }
  })
}

    return (
      <ImageBackground source={fondo} style={styles.image}>
      <Block flex middle>
          <Block safe flex middle>
            <ScrollView>
            <Block style={styles.registerContainer}>
              
              <Block flex>
                <Block flex={0.17} middle>
                  <Text bold color="#000000" size={22}>
                    REGISTRATE
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 2 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Nombre de Usuario"
                        placeholderTextColor="grey"
                        onChangeText={user=>setText(user)}
                        defaultValue={user}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        placeholderTextColor="grey"
                        onChangeText={mail=>setText2(mail)}
                        defaultValue={mail}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Documento"
                        placeholderTextColor="grey"
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Telefono"
                        placeholderTextColor="grey"
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Domicilio"
                        placeholderTextColor="grey"
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color='#5E72E4'
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color:'#5E72E4',
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={registrar} >
                        <Text bold size={14} color= '#FFFFFF'>
                          CREAR CUENTA
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

