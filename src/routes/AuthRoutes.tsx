import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Login } from '../pages/authPages/login/login'
import { ForgetPassword } from '../pages/authPages/forgetPassword/forgetPassword'
import { AuthenticationCode } from '../pages/authPages/authenticationCode/authenticationCode'

export function AuthRoutes() {

    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='SignIn' component={Login} options={{ headerShown: false }} />
            <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
            <AuthStack.Screen name='AuthenticationCode' component={AuthenticationCode} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}