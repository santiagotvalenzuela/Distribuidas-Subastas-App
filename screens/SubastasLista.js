import React from 'react';
import { StyleSheet, Dimensions, ScrollView,View,TouchableOpacity } from 'react-native';
import { Block, theme,Text,Button } from 'galio-framework';
import { Header,Icon } from 'react-native-elements'
import { Card } from 'galio-framework';
import { AuthContext } from "../middleware/context";
const { width } = Dimensions.get('screen');

function SubastasLista (props) {
  const { checkSession } = React.useContext(AuthContext);
  const valor=checkSession()
    return (
      <Block flex center style={styles.home}>  
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          { valor===true ?
            <Button color="primary" style={styles.createButton}>
                  <Text bold size={14} color= '#FFFFFF'>
                    SOLICITAR PARTICIPACIÓN
                  </Text>
              </Button>:null}
        <View style={styles.sep}/>
        <Block flex>
        <TouchableOpacity onPress={()=>props.navigation.navigate("MuestraArticulo")}>
            <Card
                flex
                borderless
                caption="Nuevo"
                style={styles.card}
                title="Record Player Logitech"
                location="135$"
                avatar='https://pngimg.com/uploads/price_label/price_label_PNG77.png'
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                image="https://www.chartattack.com/wp-content/uploads/2019/10/record-1024x1024.jpg"
                />
                </TouchableOpacity>
            <View style={{height:20}}/>
          <Block flex >
            <TouchableOpacity onPress={()=>props.navigation.navigate("MuestraArticulo")}>
            <Card
            flex
            borderless
            caption="Usado"
            imageStyle={styles.cardImageRadius}
            title= "Macbook Air"
            location="555$"
            avatar="https://pngimg.com/uploads/price_label/price_label_PNG77.png"
            description="Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom."
            image="https://images.idgesg.net/images/article/2018/11/macbook-air-2108-hero2-100779122-orig.jpeg"
            
            />
            </TouchableOpacity>
          </Block>
          <View style={{height:20}}/>
          <Block flex>
          <TouchableOpacity onPress={()=>props.navigation.navigate("MuestraArticulo")}>
          <Card 
            flex
            borderless
            caption="Nuevo"
            title= "Producto 2"
            avatar="https://pngimg.com/uploads/price_label/price_label_PNG77.png"
            location="50$"
            description="Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom."
            image="https://2.bp.blogspot.com/-EnCq4Hh_7uA/UPbT8vU_guI/AAAAAAAAE2Q/aP0SQYVo6PE/s1600/sILVER.jpg"
            />
            </TouchableOpacity>
            </Block>
        </Block>
      </ScrollView>
      </Block>
      
    );
  }


const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  createButton: {
    width: width * 0.7,
    marginHorizontal:36,
  },
  sep:{
    height: 1,
    marginHorizontal:4,
    width: width*0.9,  
    backgroundColor: "#b8b6ba",
    marginBottom:20,
  }
});

export default SubastasLista;