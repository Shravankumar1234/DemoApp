import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const EmptyPage = () => {
  return (
    <View style={[styles.Container]}>
      <Text style={[styles.text]}>No Data Found</Text>

    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  }
});

export default EmptyPage;
