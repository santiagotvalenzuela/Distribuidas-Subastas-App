import React, { Component, useEffect } from 'react';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight,Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';

export default function Reloj (props){
    let date = new Date(props.valor + "Z");
    let val= new Date(Date.now())
    //let fecha = new Date(date.getTime()+(date.getTimezoneOffset()-10850000))
    let diff = new Date(date.getTime()-val.getTime());// probar con la variable date
    console.log(diff)
    const [winner,setWinner] = React.useState([])
    //console.log(winner[0])

    useEffect(()=>{
        fetch('https://subastas-spring-backend.herokuapp.com/items/'+props.id+'/bids', {
            method:"GET",
            mode: 'cors',
            crossDomain:true,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            })
            .then(response =>response.json())
            .then((response => {if(response!=null){
            setWinner(response.map(object=>(object.bidderUsername)))
            }}))
            .catch(error=>{if(error){
            console.log(error)
            Alert.alert("ERROR")
            }
          })
    },[]);
           
        return (
        <CountDown
            until={diff.getMinutes()*60+(diff.getSeconds())}
            size={30}
            onFinish={() =>Alert.alert("!SUBASTA FINALIZADA!","El Ganador Es: "+winner[0])}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#8e38ff'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
        />
        )
}