import React, { useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme,Input,Button } from "galio-framework";
import fondo from "../assets/wallApp.png";
import { Icon,Header } from 'react-native-elements'
import { AuthContext } from "../middleware/context";

const { width, height } = Dimensions.get("screen");

export default function Perfil (props) {
  const { checkSession } = React.useContext(AuthContext);
  const { checkUser } = React.useContext(AuthContext);
  const [perfil,setPerfil] = React.useState([])
  const valor=checkSession()
  const [pass, setPass] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [add, setAdd] = React.useState('');

  useEffect(()=>{
    let id= checkUser();
    fetch('https://subastas-spring-backend.herokuapp.com/users/'+id,{
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
      setPerfil(response)
      }})
      .catch(error=>{if(error){
      console.log(error)
      Alert.alert("ERROR")
      }
  })
},[]);

const modify=()=>{
  let id= checkUser();
  fetch('https://subastas-spring-backend.herokuapp.com/users/'+id,{
    method:"PUT",
    mode: 'cors',
    crossDomain:true,
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body:JSON.stringify({
      "address":add,
      "password":pass,
      "phone":tel
    })
   })
    .then(response =>response.json())
    .then(res=>console.log(res),Alert.alert("CAMBIOS EFECTUADOS SATISFACORIAMENTE!"))
    .catch(error=>{if(error){
    console.log(error)
    Alert.alert("ERROR")
    }
})
}

  if (valor===false){
      return(
          <View >
              <Header
      backgroundColor="#7063ff"
      leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: 'PERFIL', style: { color: '#fff' } }}
  />
          <Text center style={{marginTop:300}}>Necesita Iniciar Sesión Para Accerder a Esta Función</Text>
          </View>
      );
  }
  else{

  
      return(
        <ImageBackground source={fondo} style={styles.image}>
        <Block flex middle>
          <Header
           backgroundColor="#7063ff"
           leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
           centerComponent={{ text: 'PERFIL', style: { color: '#fff' } }}
       />
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.17} middle>
                <Text bold color="#000000" size={22}>
                  Perfil
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex:1 }}
                  behavior="padding"
                  enabled="false"
                >
                  <Block width={width * 0.8} style={{ marginBottom: 20,marginLeft:5 }}>
                    <Text
                      borderless
                      color="grey"
                      bold
                    >Nombre de Usuario</Text>
                    <Text bold center style={{marginTop:10,fontSize:17}}>{perfil.username}</Text>
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 17,marginLeft:5 }}>
                    <Text
                      color="grey"
                      bold
                    >Email</Text>
                    <Text bold center style={{marginTop:10,fontSize:17}}>{perfil.mail}</Text>
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 17,marginLeft:5 }}>
                    <Text color="grey" bold
                    >Categoría</Text>
                    <Text bold center style={{marginTop:10,fontSize:17}}>{perfil.category}</Text>
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      borderless
                      placeholder={"Telefono | "+perfil.phone}
                      placeholderTextColor="grey"
                      type="number-pad"
                      onChangeText={tel=>setTel(tel)}
                      defaultValue={tel}
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
                      placeholder={"Dirección | "+perfil.address}
                      placeholderTextColor="grey"
                      onChangeText={add=>setAdd(add)}
                      defaultValue={add}
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
                      password
                      borderless
                      placeholder="Password"
                      placeholderTextColor="grey"
                      onChangeText={pass=>setPass(pass)}
                      defaultValue={pass}
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
                      placeholder="Medios de Pago Registrados"
                      placeholderTextColor="grey"
                      iconContent={
                          <Icon
                              name='delete'
                              style={styles.inputIcons}
                              onPress={()=>props.navigation.navigate("Eliminar Medio de Pago")}
                          />
                      }
                    />
                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={modify}>
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

