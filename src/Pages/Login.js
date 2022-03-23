import React from 'react';
import { Text, View, Button } from 'react-native';

const Login = () => {
  return (
    <View
      style={styles.main}>
      <Button>Email</Button>
      <Button>Password</Button>


      <Button>Register</Button>
      <Button>continue as a guest</Button>
      <Button>Forgot Password</Button>
    </View>
  )
}
export default Login;



const styles = StyleSheet.create({
    main: {
      flex: '1',
      justifyContent: 'space-evenly', 
      minHeight: '10%',
    }
  })