import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserListScreen from '../Pages/UserListScreen';
import UserDetailScreen from '../Pages/UserDetailScreen';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import { CircleUser} from 'lucide-react-native';


const Stack = createNativeStackNavigator();

const RouteStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          title: 'User List',
          headerShadowVisible: true,
          headerTintColor: 'green',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: responsiveScreenFontSize(2.5),
            fontFamily: 'Poppins-Bold',
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#505B8A',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            shadowRadius: 0,
            shadowColor: '#dcdcdc',
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          contentStyle: {backgroundColor: '#505B8A'},
        }}>
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{headerLeft: () => <CircleUser color={'#fff'} size={38} />}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default RouteStack;
