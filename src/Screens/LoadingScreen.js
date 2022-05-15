import React, { useState } from 'react';
import { View, Text, Image} from 'react-native';
import { globalStyles } from '../styles/global';

const LoadingPage = () => {
  const [align, setAlign] = useState('center');
  const [alignsecond, setAlignsecond] = useState(false);

  setTimeout(() => {
    setAlign('flex-start'), setAlignsecond(true);
  }, 3000);

  return (
    <View style={globalStyles.loading}>
      <Image
        source={require('../../assets/splash_icon.png')}
        style={{ width: '100%', height: '100%' }} resizeMode="fill"
      />
    </View>
  );
};

export default LoadingPage;