import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';

const Login = () => {
  return (
    <SafeAreaView>
      {/* insert mai symbol */}
    <View style = {styles.header}>
      <Text> Email</Text>
      {/* insert icon */}
      <TextInput  
      
      placeholder='Your Email'
      autoComplete = 'email'
      autoCapitalize='none'
      />
      {/* add text input style */}
      

      <Text> password</Text>
      {/* insert icon */}
      <TextInput  
      
      placeholder='Your Password'
      autoComplete = 'password'
      autoCapitalize='none'
      />
      {/* add text input style */}
    </View>
    <View style = {styles.footer}>
    <Text> register, , continue as guest, forgot password</Text>
  </View>


    </SafeAreaView>

    

  )
}
export default Login;



const styles = StyleSheet.create({
    header: {
      flex: '1',
      justifyContent: 'flex-end', 
      minHeight: '10%',
      backgroundColor: '#FAE479',

    },

    footer:{
        flex: '3',
        backgroundColor: '#fff',
        borderTopRadius: 24,



    }
  })