import React,{useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


 export const authContext = function(){
  const [isLoading,setIsLoading] = React.useState(true);
  const [cookie, setCookie] = React.useState(null);
  setCookie("valor")
  
  if (cookie!=null){
    return true
  }
  else{
    return false
  }

  /**React.useMemo(()=>({
    signIn:()=>{
      setCookie("valor")
      setIsLoading(false)
    },
    signOut:()=>{
      setCookie(null)
      setIsLoading(false)
    },
    checkSession:()=>{
      if (cookie!=null){
        return true
      }
      else{
        return false
      }
    }
  }))*/
}



/**export default getData = async() => {
    try {
      const user = await AsyncStorage.getItem('@user')
      const pass = await AsyncStorage.getItem('@password')
      if(user && pass!== null) {
        let value=true
        return value
      }
      else{
        let value=false
        return value
      }
    } catch(e) {
      // error reading value
    }
  }**/
  