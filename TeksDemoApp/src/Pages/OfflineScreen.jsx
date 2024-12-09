import {View, Text} from 'react-native';
import React from 'react';

const OfflineScreen = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontFamily:"Poppins-SemiBold"}}>Please Connect to Internet</Text>
    </View>
  );
};

export default OfflineScreen;
