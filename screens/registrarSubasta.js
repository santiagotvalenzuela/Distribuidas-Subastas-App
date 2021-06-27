import React, { useState, useEffect } from 'react';
import {View,Image,StyleSheet,Dimensions,Platform,Alert,SafeAreaView} from "react-native"
import { Block, Checkbox, Text, theme,Input,Button } from "galio-framework";
import { Icon,Header } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../middleware/context";


const { width, height } = Dimensions.get("screen");


export default function registrarSubasta(props){
    const { checkSession } = React.useContext(AuthContext);

        const valor=checkSession()

        if (valor===false){
            return(
                <View >
                    <Header
            backgroundColor="#7063ff"
            leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
            centerComponent={{ text: 'SUBASTAR ARTICULO', style: { color: '#fff' } }}
        />
                <Text center style={{marginTop:300}}>Necesita Iniciar Sesión Para Accerder a Esta Función</Text>
                </View>
            );
        }
        else{

     return(
         <View>
            <Header
            backgroundColor="#7063ff"
            leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
            centerComponent={{ text: 'SUBASTAR ARTICULO', style: { color: '#fff' } }}
        />
            <Content/>
        </View>
        );
     }
    }

    const Content=()=>{
        const [art, setText] = React.useState('');
        const [desc, setText2] = React.useState('');
        const [image, setImage] = useState(null);
        const [resultado,setRes] = useState(null);
        const [imagenesList,setImagenesList] = useState([]);

        useEffect(() => {
            (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            })();
        }, []);

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: true,
            aspect: [9, 16],
            quality: 1,
            base64:true,
            });


            if (!result.cancelled) {
            setImage(result.uri);
            setRes(result.base64);
            }
        };

        const cloudinaryUpload = (async) => {
            const data = new FormData()
            let dato="";
            data.append('file', "data:image/jpg;base64,"+resultado)
            data.append('upload_preset', 'santiAPI')
            data.append("cloud_name", "dr4i78wvu")
            fetch("https://api.cloudinary.com/v1_1/dr4i78wvu/image/upload", {
                method: "POST",
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                body: data
                }).then(res => res.json())
                .then(res=>{if(res!=null){
                    console.log(res.url)
                    setImagenesList(imagenesList.concat(res.url))
                    Alert.alert("Imagen Cargada")
                }
            })

                .catch(err => {
                    Alert.alert("An Error Occured While Uploading"),console.log(err)
                })
            }

    const  cargarSubasta=()=>{
        //console.log(imagenesList)
            fetch('https://subastas-spring-backend.herokuapp.com/items', {
            method:"POST",
            mode: 'cors',
            crossDomain:true,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body:JSON.stringify({
                "title":art,
                "description":desc,
                "image_urls":imagenesList
                })
            })
            .then(response =>response.json())
            .then(result => {if(result!=null){
            console.log(result)
            }})
            .catch(error=>{if(error){
            console.log(error)
            Alert.alert("ERROR")
            }
        })
    }
        return(
            <SafeAreaView >
            <Block style={styles.block}>
                <Input
                style={{borderColor:theme.COLORS.INFO}}
                placeholder="Ingrese Nombre del Articulo"
                placeholderTextColor="grey"
                onChangeText={art=>setText(art)}
                defaultValue={art}
                />
            </Block>
            <Block style={styles.block} height={100}>
                <Input
                placeholder="Ingrese Descripción"
                placeholderTextColor="grey"
                style={{borderColor:theme.COLORS.INFO}}
                onChangeText={desc=>setText2(desc)}
                defaultValue={desc}
                />
            </Block>

            <Text h4 bold style={{marginHorizontal:20}}>Agregar Imagenes</Text>
            <Text p style={{marginHorizontal:20, color:"grey"}}>Solo se puede añadir de a una (1)</Text>
            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal:20,marginTop:90 }}>
                <Button onlyIcon icon="plus" iconFamily="entypo" iconSize={20} color='primary' onPress={pickImage}>Pick an image from camera roll</Button>
                {image &&<Image source={{ uri: image }} style={{ width: 120, height: 120 }} />}
            </View>
            <View style={{height:140}}/>
            <Button style={styles.button} onPress={cloudinaryUpload}>Agregar Imagen</Button>
            <View style={{height:10}}/>
            <Button color="info" style={styles.button2} onPress={cargarSubasta}>REGISTRAR ARTICULO</Button>
            </SafeAreaView>

        )
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