import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../Home';
import Login from '../Login/login';
import Register from '../Register';
import ForgotPassword from '../Login/forgot';
import Profile from '../Profile';
import EditProfile from '../Profile/edit';
import SettingsPage from '../Settings';
import Products from '../Products';
import ProductDetail from '../Products/ProductDetail';
import Logout from '../Login/logout';

export { 
    Home, Login, Register, ForgotPassword, EditProfile, Profile, 
    SettingsPage, Products, ProductDetail, Logout 
};

import styles from "./styles";
export { styles };

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };
  
    return (
        <View style={styles.viewHeader}>
            <View style={styles.headerStyle}>
                <TouchableOpacity transparent onPress={() => toggleDrawer()}
                    style={[styles.headerButtonStyle, styles.boxFlexStart]}>
                    <Ionicons name="home" style={[styles.headerIcon, styles.boxFlexStart]} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    switch (routeName) {
        case 'Home':
            return 'Home';
        case 'Products':
            return 'Products';
        case 'ProductDetail':
            return 'ProductDetail';
        case 'Profile':
            return 'Profile';
        case 'EditProfile':
            return 'EditProfile';
        case 'Login':
            return 'Login';
        case 'Register':
            return 'Register';
        case 'ForgotPassword':
            return 'ForgotPassword';
        case 'SettingsPage':
            return 'SettingsPage';
        case 'TabStack':
            return 'SettingsPage';
        case 'Logout':
            return 'Logout';
    }
};

const TabStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="SettingsPage"
            tabBarOptions={{
                activeTintColor: '#000',
                inactiveTintColor: '#000',
                style: {
                    backgroundColor: '#FFF',
                },
                labelStyle: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                },
                indicatorStyle: {
                    borderBottomColor: '#000',
                    borderBottomWidth: 2,
                },
            }}>
            <Tab.Screen
                name="Settings"
                component={SettingsPage}
                options={{
                    tabBarLabel: 'Settings',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

const MyStack = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#0F707F',
                    itemStyle: {
                        marginVertical: 5,
                    },
                }}>
                <Drawer.Screen name="HomeStack" 
                    component={HomeStack} 
                    options={{drawerLabel: 'Home'}}/>
                
                <Drawer.Screen name="ProductStack" 
                    component={ProductStack} 
                    options={{ drawerLabel: 'Products' }} 
                />
                <Drawer.Screen name="ProductDetailStack" 
                    component={ProductDetailStack} 
                    options={{ drawerLabel: 'Product Detail' }} 
                />
                <Drawer.Screen name="ProfileStack" 
                    component={ProfileStack} 
                    options={{ drawerLabel: 'Profile' }} 
                />
                <Drawer.Screen name="EditProfileStack" 
                    component={EditProfileStack} 
                    options={{ drawerLabel: 'Edit Profile' }} 
                />
                <Drawer.Screen name="LoginStack" 
                    component={LoginStack} 
                    options={{ drawerLabel: 'Login' }} 
                />
                <Drawer.Screen name="RegisterStack" 
                    component={RegisterStack} 
                    options={{ drawerLabel: 'Register' }} 
                />
                <Drawer.Screen name="ForgotPasswordStack" 
                    component={ForgotPasswordStack} 
                    options={{ drawerLabel: 'Forgot Password' }} 
                />
                <Drawer.Screen name="SettingsStack" 
                    component={SettingsStack} 
                    options={{ drawerLabel: 'Settings' }} 
                />
                <Drawer.Screen name="LogoutStack" 
                    component={LogoutStack} 
                    options={{ drawerLabel: 'Logout' }} 
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;

const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
                name="Home"
                component={Home}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            />
        </Stack.Navigator>
    );
};

const ProductStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Products">
            <Stack.Screen name="Product Detail" component={ProductDetail} />
            <Stack.Screen
                name="Products"
                component={Products}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const ProductDetailStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="ProductDetail">
            <Stack.Screen
                name="Product Detail"
                component={ProductDetail}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const ProfileStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const EditProfileStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="EditProfile">
            <Stack.Screen
                name="Edit Profile"
                component={EditProfile}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const LoginStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
                name="Login"
                component={Login}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const RegisterStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
                name="Register"
                component={Register}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const ForgotPasswordStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="ForgotPassword">
            <Stack.Screen
                name="Forgot Password"
                component={ForgotPassword}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const SettingsStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="SettingsPage">
            <Stack.Screen
                name="Settings"
                component={TabStack}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#4CA5B3',
                        borderBottomColor: '#DDD',
                        borderBottomWidth: 1,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            />
        </Stack.Navigator>
    );
};

const LogoutStack = () => {
    return (
        <Stack.Navigator initialRouteName="Logout">
            <Stack.Screen name="Logout" component={Logout} />
        </Stack.Navigator>
    );
};
