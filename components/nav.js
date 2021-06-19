import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Subasta from "../screens/SubastaScreen"
import ListaSub from "../screens/SubastasLista"
import PujaScreen from "../screens/pujaScreen"
import CBU from "../screens/CBU"
import Tarjeta from "../screens/Tarjeta"
import histSubasta from "../screens/HistoriaSubasta"
import EliminarMedio from "../screens/EliminarMedio"
import MuestraArticulo from "../screens/MuestraArticulo"
import participar from "../screens/Participacion"
import verArticulos from "../screens/verArticulos"

const navigationRef = React.createRef();
export function navigate(name) {
  navigationRef.current && navigationRef.current.navigate(name);
}
const Stack = createStackNavigator();

export default function nav(){
    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="SubastaScreen" component={Subasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="PUJA" component={PujaScreen} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="Subasta" component={ListaSub} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="Tarjeta" component={Tarjeta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="CBU" component={CBU} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="Historial" component={histSubasta} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="MuestraArticulo" component={MuestraArticulo} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="Eliminar Medio de Pago" component={EliminarMedio} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="Participación" component={participar} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
                <Stack.Screen name="verArticulos" component={verArticulos} options={{headerStyle: {backgroundColor: '#7063ff'},headerTintColor:"white"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}