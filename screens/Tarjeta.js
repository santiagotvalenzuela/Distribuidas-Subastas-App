import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Checkbox, Text, theme,Input,Button,ScrollView } from "galio-framework";
import fondo from "../assets/wallApp.png";
import { Icon,Header } from 'react-native-elements'
import Picker from "../components/picker"


const { width, height } = Dimensions.get("screen");

export default class Tarjeta extends React.Component {
  render(){
    return (
      <ImageBackground source={fondo} style={styles.image}>
      <Block flex middle>
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              
              <Block flex>
              <View style={{height:20}}/>
                <Block flex={0.17} middle>
                  <Text bold color="#000000" size={22}>
                    Tarjeta
                  </Text>
                  <View style={{height:20}}/>
                  <Picker center/>
                </Block>
                <View style={{height:20}}/>
                
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 2 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Nro de Tarjeta"
                        placeholderTextColor="grey"
                        iconContent={
                            <Icon
                                name='edit'
                                style={styles.inputIcons}
                            />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Vencimiento"
                        placeholderTextColor="grey"
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
                        placeholder="Código de Seguridad"
                        placeholderTextColor="grey"
                        iconContent={
                            <Icon
                                name='edit'
                                style={styles.inputIcons}
                            />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={()=>this.props.navigation.navigate("Home")}>
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