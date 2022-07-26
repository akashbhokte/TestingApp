// In Navi.js in a new project

import * as React from 'react';
import { View, Text, Button, } from 'react-native';
import {
    NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Detail from './Detail';
const Stack = createNativeStackNavigator();

function Navig({ Navigation }) {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default Navig;

