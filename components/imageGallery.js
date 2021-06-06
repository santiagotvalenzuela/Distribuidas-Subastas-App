import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import {Icon} from "react-native-elements"
import {Button} from "galio-framework"
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const imagenes=[];
  

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
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function subirImf(){ 
    console.log(JSON.stringify(image));
    imagenes.push(image);
    console.log(imagenes)

  }

  return (
    <View >
      <Button onlyIcon icon="plus" iconFamily="entypo" iconSize={20} color='primary' onPress={pickImage}>Pick an image from camera roll</Button>
      {image &&<Image source={{ uri: image }} style={{ width: 120, height: 120 }} />}
    </View>
  );
}