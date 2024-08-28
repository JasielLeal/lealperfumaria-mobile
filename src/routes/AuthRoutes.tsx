import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login } from '../pages/authPages/login/login';
import { ForgetPassword } from '../pages/authPages/forgetPassword/forgetPassword';
import { AuthenticationCode } from '../pages/authPages/authenticationCode/authenticationCode';

const AuthStack = createStackNavigator();

export function AuthRoutes() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                gestureEnabled: true, // Habilita o gesto para voltar
                cardStyleInterpolator: ({ current, next, layouts }) => {
                    return {
                        cardStyle: {
                            opacity: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                                extrapolate: 'clamp',
                            }),
                        },
                        containerStyle: {
                            transform: [
                                {
                                    translateX: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.width, 0],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    };
                },
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 300 } },
                    close: { animation: 'timing', config: { duration: 300 } },
                },
            }}
        >
            <AuthStack.Screen name='SignIn' component={Login} options={{ headerShown: false }} />
            <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
            <AuthStack.Screen name='AuthenticationCode' component={AuthenticationCode} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
}
