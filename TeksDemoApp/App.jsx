import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import RouteStack from './src/Routes/RouteStack';
import {addEventListener} from '@react-native-community/netinfo';
import OfflineScreen from './src/Pages/OfflineScreen';
import {StatusBar} from 'react-native';
import store from './src/Redux/store';


const App = () => {
  const [isConnected, setIsConnected] = useState(null);

  // To Check whether the Internet  is connected or not
  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'#505B8A'}
        barStyle={'light-content'}
        animated
      />
      <SafeAreaProvider>
        <NavigationContainer>
          <Provider store={store}>
            {isConnected ? (
              <RouteStack />
            ) : (
              <OfflineScreen setIsConnected={setIsConnected} />
            )}
          </Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
