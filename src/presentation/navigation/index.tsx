import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Screens, HomeScreen, CartScreen, ConfirmationScreen} from '../screens';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Home}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Screens.Home} component={HomeScreen} />
        <Stack.Screen name={Screens.Cart} component={CartScreen} />
        <Stack.Screen
          name={Screens.Confirmation}
          component={ConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(Navigation);
