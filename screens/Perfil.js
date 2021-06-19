import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Block, Checkbox, Text, theme,Input,Button } from "galio-framework";
import fondo from "../assets/wallApp.png";
import { Icon,Header } from 'react-native-elements'

const { width, height } = Dimensions.get("screen");

export default function Perfil (props) {
    return (
      <ImageBackground source={fondo} style={styles.image}>
      <Block flex middle>
      <Header
        backgroundColor="#7063ff"
        leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: 'PERFIL', style: { color: '#fff' } }}
        />
          <Block safe flex middle>
            <ScrollView>
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
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Nombre y Apellido"
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
                        placeholder="Email"
                        placeholderTextColor="grey"
                        type="email-address"
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
                        placeholder="Documento"
                        placeholderTextColor="grey"
                        type="number-pad"
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
                        placeholder="Telefono"
                        placeholderTextColor="grey"
                        type="number-pad"
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
                        placeholder="Domicilio"
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

