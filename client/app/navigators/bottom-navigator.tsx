import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddMessageScreen, MessagesScreen } from '../screens';

type Params = {
    addMessage: undefined;
    messages: undefined;
};

const Tab = createBottomTabNavigator<Params>();

export function BottomNavigator() {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Tab.Screen name="addMessage" component={AddMessageScreen} />
            <Tab.Screen name="messages" component={MessagesScreen} />
        </Tab.Navigator>
    );
}
