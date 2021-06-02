import * as React from 'react';
import { StyleSheet, Text, View,ImageBackground,Button  } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute,getActionFromState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from "./screens/Registro";
import fondo from "./assets/wallApp.png";
import {Card} from "react-native-elements";
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegistroV from "./screens/RegistroV";
import RegistroF from "./screens/RegistroF";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Perfil from "./screens/Perfil"
import Subasta from "./screens/SubastaScreen"
import ListaSub from "./screens/SubastasLista"
import PujaScreen from "./screens/pujaScreen"


const navigationRef = React.createRef();

export function navigate(name) {
  navigationRef.current && navigationRef.current.navigate(name);
}
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator >
        <Stack.Screen name="Subastas Distribuidas" component={HomeScreen} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Registro" component={Registro} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="RegistroV" component={RegistroV} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="RegistroF" component={RegistroF} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Login" component={Login} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Home"  component={drawer} options={{headerShown:false}}/>
        <Stack.Screen name="SubastaScreen" component={Subasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="PUJAR" component={PujaScreen} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Subasta" component={ListaSub} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createStackNavigator();
function HomeScreen({ navigation }){
    return(
      <ImageBackground source={fondo} style={styles.image}>
        <Card>
          <Card.Title>BIENVENIDO</Card.Title>
          <Card.Divider/>
          <Button title="Registrarse" onPress={()=>navigation.navigate("Registro")}></Button>
          <View style={{height:20}}/>
          <Button title="Ingresar" onPress={()=>navigation.navigate("Login")}></Button>
          <View style={{height:20}}/>
          <Button title="Ingresar Como Invitado" onPress={()=>navigation.navigate("Home")} style={{width:100}}></Button>
          <View style={{height:20}}/>
          </Card>
      </ImageBackground>
    )
}
function drawer() {
    
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Perfil" component={Perfil} />
        <Drawer.Screen name="Subastar Artículo" component={Login} />
        <Drawer.Screen name="Mis Subastas" component={ListaSub} />
        <Drawer.Screen name="Ver Historial" component={Login} />
        <Drawer.Screen name="Medios de Pago" component={Login} />
        <Drawer.Screen name="Cerrar Sesión" component={Login} />
      </Drawer.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  nav:{
    backgroundColor:"black",
    color:"black"
  },
})