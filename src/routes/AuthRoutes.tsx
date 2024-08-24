import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Login } from '../pages/authPages/login/login'

export function AuthRoutes() {

    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='SignIn' component={Login} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}