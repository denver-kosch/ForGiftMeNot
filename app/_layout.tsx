import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store.js';
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Index from "./index";
import NotFoundScreen from './+not-found';
import List from './list';
import ProfilePage from './profile';
import LoginPage from './login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ListIcon, ProfileIcon } from '@/hooks/icons';
import { useEffect, useState } from 'react';
import CreateList from './createList';
import ListDetail from './listDetail';


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
    const colorScheme = useColorScheme();
    const [token, setToken] = useState(store.getState().auth.token);

    // Subscribe to store updates for token changes
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newToken = store.getState().auth.token;
            setToken(newToken);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case 'Home':
                            return <HomeIcon color={color} size={size} />;
                        case 'List':
                            return <ListIcon color={color} size={size} />;
                        case 'Profile':
                            return <ProfileIcon color={color} size={size} />;
                    }
                },
                tabBarActiveTintColor: '#b8a96e',
                tabBarInactiveTintColor: '#a8a8a8',
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#333' : '#fff9e2',
                    borderTopColor: colorScheme === 'dark' ? '#444' : '#ddd',
                    borderTopWidth: 1,
                },
            })}
        >
            <Tabs.Screen name="Home" options={{ headerShown: false }} component={Index} />
            <Tabs.Screen name="List" options={{ headerShown: false }} component={List} />
            <Tabs.Screen
                name="Profile"
                options={{
                    headerShown: false,
                    tabBarLabel: token ? 'Profile' : 'Login', // Change label dynamically
                }}
                component={token ? ProfilePage : LoginPage} // Change component dynamically
            />
        </Tabs.Navigator>
    );
};


export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
  	<Provider store={store}>
  	  <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
    	  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<Stack.Navigator>
						<Stack.Screen name="Main" options={{ headerShown: false }} component={TabNavigator}/>
                        <Stack.Screen name="List" component={List} options={{ headerShown: false }}/>
                        <Stack.Screen name="CreateList" component={CreateList} options={{ headerShown: false }}/>
                        <Stack.Screen name="ListDetail" component={ListDetail} options={{ headerShown: false }}/>
						<Stack.Screen name="+not-found" component={NotFoundScreen}/>
					</Stack.Navigator>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}