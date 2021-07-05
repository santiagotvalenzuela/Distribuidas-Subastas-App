import * as React from 'react';
import { StyleSheet, Text, View,ImageBackground,Button,Image,Dimensions,ActivityIndicator  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import MisSubastas from "./screens/MisSubastas"
import MuestraArticulo from "./screens/MuestraArticulo"
import participar from "./screens/Participacion"
import verArticulos from "./screens/verArticulos"
import { AuthContext } from './middleware/context';
const { width, height } = Dimensions.get("screen");
const navigationRef = React.createRef();



export function navigate(name) {
  navigationRef.current && navigationRef.current.navigate(name);
}
export default function App() {
  const [session, SetSession] = React.useState(false)
  const [id,setID]=React.useState('')
  const [userId,setUserID]=React.useState('')
  const [item,setItem] = React.useState('')

 const authContext = React.useMemo(()=>({
      signIn: ()=>{
        SetSession(true)
      },
      signOut: ()=>{
        SetSession(false)
      },
      checkSession: ()=>{
        return session;
      },
      setId:(value)=>{
        setID(value)
      },
      checkId:()=>{
        return id;
      },
      setUserId:(value)=>{
        setUserID(value)
      },
      checkUser:()=>{
        return userId;
      },
      setItem:(value)=>{
        setItem(value)
      },
      checkItem:()=>{
        return item;
      }
 }))
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="AUCTION KING" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Registro" component={Registro} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="RegistroV" component={RegistroV} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="RegistroF" component={RegistroF} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Login" component={Login} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
        <Stack.Screen name="Home"  component={drawer} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Sub = createStackNavigator();
const Pagos = createStackNavigator();
const Profile = createStackNavigator();
const MisSubs = createStackNavigator();

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
      <Drawer.Screen name="Home" component={SubastaStack} />
      <Drawer.Screen name="Perfil" component={PerfilStack} />
      <Drawer.Screen name="Mis Subastas" component={MisStack} />
      <Drawer.Screen name="Subastar Artículo" component={registrarSubasta} />
      <Drawer.Screen name="Registrar Medios de Pago" component={PagosStack} />
      <Drawer.Screen name="Cerrar Sesión / Salir" component={Cerrar} />
  </Drawer.Navigator>
  );
}
const SubastaStack =()=>{
  return(
  <Sub.Navigator>
    <Sub.Screen name="Home" component={Home} options={{headerShown:false}}/>
    <Sub.Screen name="MuestraArticulo" component={MuestraArticulo} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
    <Sub.Screen name="Subasta" component={ListaSub} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
  </Sub.Navigator>
  )
}

const PagosStack=()=>{
  return(
    <Pagos.Navigator>
      <Sub.Screen name="MediosPago" component={MediosPago} options={{headerShown:false}}/>
      <Pagos.Screen name="Tarjeta" component={Tarjeta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
      <Pagos.Screen name="CBU" component={CBU} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
    </Pagos.Navigator>
  )
}
const PerfilStack =()=>{
  return(
    <Profile.Navigator>
      <Sub.Screen name="Perfil" component={Perfil} options={{headerShown:false}}/>
      <Profile.Screen name="Eliminar Medio de Pago" component={EliminarMedio} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
    </Profile.Navigator>
  )
}

const MisStack=()=>{
  return(
    <MisSubs.Navigator>
      <MisSubs.Screen name="MisSubastas" component={MisSubastas} options={{headerShown:false}}/>
      <MisSubs.Screen name="SubastaScreen" component={Subasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
      <MisSubs.Screen name="PUJA" component={PujaScreen} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
      <MisSubs.Screen name="Historial" component={histSubasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
      <MisSubs.Screen name="Participación" component={participar} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
      <MisSubs.Screen name="verArticulos" component={verArticulos} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
    </MisSubs.Navigator>
  )
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
    marginTop:height/8,
    width:124,
    height:220,
    marginHorizontal:width/3,
    marginBottom:20,
  }
})