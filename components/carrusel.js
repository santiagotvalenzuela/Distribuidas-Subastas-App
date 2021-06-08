import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
 
import { SliderBox } from "react-native-image-slider-box";
 
export default class Carrusel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://images.idgesg.net/images/article/2018/11/macbook-air-2108-hero2-100779122-orig.jpeg",
        "https://http2.mlstatic.com/D_NQ_NP_898967-MLA44961685671_022021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_866807-MLA44961685673_022021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_928404-MLA44988459427_022021-O.webp",
       
      ]
    };
  }
 
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});