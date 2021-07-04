import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import CountDown from 'react-native-countdown-component';

export default function Reloj (props){
    let date = new Date(props.valor + "Z");
    let val= new Date(Date.now())
    //let fecha = new Date(date.getTime()+(date.getTimezoneOffset()-10850000))
    let diff = new Date(date.getTime()-val.getTime());// probar con la variable date
    console.log(diff)
    
        return (
        <CountDown
            until={diff.getMinutes()*60+(diff.getSeconds())}
            size={30}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#8e38ff'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
        />
        )
}