
import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import CountDown from 'react-native-countdown-component';

export default class Reloj extends React.Component{
    render() {
        return (
        <CountDown
            until={60 * 10 + 30}
            size={30}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#8e38ff'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
        />
        )
    }
}