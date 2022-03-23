import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {firestore} from './src/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';


export default function App() {

  const ref=collection(firestore,'users');
  setDoc(doc(ref),
  {
    name: "Yaniv",
    Email: "yanivank@gmail.com"
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
