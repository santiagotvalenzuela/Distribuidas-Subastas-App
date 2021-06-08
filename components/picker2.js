import React,{useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import {
    Dimensions
  } from "react-native";
const { width } = Dimensions.get('screen');



export default function Picker(){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Visa', value: '2131-3232-5453-1233'},
      {label: 'MasterCard', value: '32121321331232'},
      {label: 'American', value: '3312312'}
    ]);
  
    return(
    <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{height: 40,width:300}}
    />
    );
}