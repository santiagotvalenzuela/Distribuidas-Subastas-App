import React from 'react';
import { StyleSheet, Dimensions, ScrollView,View,Button } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Header,Icon } from 'react-native-elements'
import { Card } from 'galio-framework';
const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
            <Card
                flex
                borderless
                style={styles.card}
                title="Record Player Logitech"
                caption="139 minutes ago"
                location="135$"
                avatar="http://i.pravatar.cc/100?id=skater"
                imageStyle={styles.cardImageRadius}
                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                image="https://www.chartattack.com/wp-content/uploads/2019/10/record-1024x1024.jpg"
                />
            <View style={{height:20}}/>
          <Block flex >
            <Card 
            flex
            borderless
            imageStyle={styles.cardImageRadius}
            title= "Producto 1"
            location="95$"
            caption="90 minutes ago"
            avatar="https://pickaface.net/gallery/avatar/avi.dixit.1254cc06503d469.png"
            description="Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom."
            image="https://i.pinimg.com/originals/db/26/b4/db26b4a89a1af3ae8e59af7b547aa653.jpg"
            
            />
          </Block>
          <View style={{height:20}}/>
          <Block flex>
          <Card 
            flex
            borderless
            caption="3 minutes ago"
            title= "Producto 2"
            avatar="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
            location="50$"
            description="Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom."
            image="https://2.bp.blogspot.com/-EnCq4Hh_7uA/UPbT8vU_guI/AAAAAAAAE2Q/aP0SQYVo6PE/s1600/sILVER.jpg"
            />
            </Block>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>  
        <Header
        backgroundColor="#7063ff"
        leftComponent={<Icon name="menu" type="menu" color="#fff" onPress={()=>this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
        />
        {this.renderArticles()}
      </Block>
      
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
