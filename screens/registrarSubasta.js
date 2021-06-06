import React,{useState} from "react";
import {View,Image,StyleSheet,Dimensions} from "react-native"
import { Block, Checkbox, Text, theme,Input,Button } from "galio-framework";
import { Icon,Header } from 'react-native-elements'
import Gallery from "../components/imageGallery"

const { width, height } = Dimensions.get("screen");


export default class registrarSubasta extends React.Component{
    
    render(){
        return(
            <View >
            <Header
                backgroundColor="#7063ff"
                leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>this.props.navigation.toggleDrawer()}/>}
                centerComponent={{ text: 'SUBASTAR ARTICULO', style: { color: '#fff' } }}
            />
            <Block style={styles.block}>
                <Input
                style={{borderColor:theme.COLORS.INFO}}
                placeholder="Ingrese Nombre del Articulo"
                placeholderTextColor="grey"
                />
            </Block>
            <Block style={styles.block} height={100}>
                <Input
                
                placeholder="Ingrese Nombre Descripción"
                placeholderTextColor="grey"
                style={{borderColor:theme.COLORS.INFO}}
                />
            </Block>
            <Text h4 bold style={{marginHorizontal:20}}>Agregar Imagenes</Text>
            <Text p style={{marginHorizontal:20, color:"grey"}}>Solo se puede añadir de a una(1)</Text>
            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal:20,marginTop:15 }}>
                <Gallery/>
            </View>
            <View style={{height:200}}/>
            <Button style={styles.button}>Agregar Imagen</Button>
            <View style={{height:10}}/>
            <Button color="info" style={styles.button2}>REGISTRAR ARTICULO</Button>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    block:{
        width:width*0.9,
        marginHorizontal:15,
        marginTop:20,
    },
    button:{
        marginTop:20,
        marginHorizontal:20,
    },
    button2:{
        marginTop:20,
        marginHorizontal:20,
        width:200,

    }
})