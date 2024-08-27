import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Home } from '../pages/appPages/home/home';
import { Platform } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { SaleDetails } from '../pages/appPages/saleDatails/SaleDatails';
import { Extract } from '../pages/appPages/extract/extract';
import { StartSale } from '../pages/appPages/startSale/startSale';
import { RegisteredProducts } from '../pages/appPages/registeredProducts/registeredProducts';
import { Users } from '../pages/appPages/users/users';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function TabRoutes() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#121214',
                    borderTopWidth: 1,
                    borderColor: '#ffffff1f',
                    elevation: 10,
                    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Ajuste para iOS
                    paddingTop: Platform.OS === 'ios' ? 10 : 0, // Ajuste para iOS
                    ...Platform.select({
                        android: {
                            height: 60, // Altura para Android
                        },
                        ios: {
                            height: 100, // Altura para iOS
                        },
                    }),
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon name="home" size={size} color={focused ? '#B66182' : color} />
                    ),

                }}
            />

            <Tab.Screen
                name="Extract"
                component={Extract}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon name="receipt" size={size} color={focused ? '#B66182' : color} />
                    ),

                }}
            />

            <Tab.Screen
                name="StarSale"
                component={StartSale}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon name="add" size={size} color={focused ? '#B66182' : color} />
                    ),

                }}
            />

            <Tab.Screen
                name="registeredProducts"
                component={RegisteredProducts}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon name="bag" size={size} color={focused ? '#B66182' : color} />
                    ),

                }}
            />

            <Tab.Screen
                name="Users"
                component={Users}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon name="shield-checkmark-sharp" size={size} color={focused ? '#B66182' : color} />
                    ),

                }}
            />

        </Tab.Navigator>
    );
}

export default function AppRoutes() {




    return (
        <Stack.Navigator screenOptions={{ animationEnabled: true }}>
            <Stack.Screen name="TabRoutes" component={TabRoutes} options={{ headerShown: false, animationEnabled: true }} />
            <Stack.Screen name="SaleDetails" component={SaleDetails} options={{ headerShown: false, animationEnabled: true }} />
        </Stack.Navigator>
    );
}
