import * as React from 'react';
import { StyleSheet, Text, View,ImageBackground,Button,Image  } from 'react-native';
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
import Cerrar from "./screens/cerrarSesion"
import CBU from "./screens/CBU"
import Tarjeta from "./screens/Tarjeta"
import MediosPago from "./screens/MediosPago"
import Historial from "./screens/Historial"
import registrarSubasta from "./screens/registrarSubasta"
import histSubasta from "./screens/HistoriaSubasta"
import EliminarMedio from "./screens/EliminarMedio"
import logo from "./assets/Logo.png"


const navigationRef = React.createRef();

export function navigate(name) {
  navigationRef.current && navigationRef.current.navigate(name);
}
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator >
        <Stack.Screen name="AUCTION KING" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Registro" component={Registro} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="RegistroV" component={RegistroV} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="RegistroF" component={RegistroF} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Login" component={Login} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Home"  component={drawer} options={{headerShown:false}}/>
        <Stack.Screen name="SubastaScreen" component={Subasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="PUJA" component={PujaScreen} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Subasta" component={ListaSub} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Tarjeta" component={Tarjeta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="CBU" component={CBU} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Historial" component={histSubasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Eliminar Medio de Pago" component={EliminarMedio} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createStackNavigator();
function HomeScreen({ navigation }){
    return(
      <ImageBackground source={fondo} style={styles.image}>
        <Image source={logo} style={styles.logo}/>
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
        <Drawer.Screen name="Subastar Artículo" component={registrarSubasta} />
        <Drawer.Screen name="Ver Historial" component={Historial} />
        <Drawer.Screen name="Registrar Medios de Pago" component={MediosPago} />
        <Drawer.Screen name="Cerrar Sesión" component={HomeScreen} />
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
  logo:{
    marginTop:20,
    width:124,
    height:220,
    marginHorizontal:120,
    marginBottom:20,
  }
})