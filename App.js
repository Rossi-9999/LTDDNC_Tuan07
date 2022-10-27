import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, SafeAreaView, View, Text, Image, TouchableOpacity, Button, TextInput, Modal } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screen/Home';
import Detail from './Screen/Detail';


function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen   name='Home' component={Home} />
        <Stack.Screen name='Detail' component={Detail}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;