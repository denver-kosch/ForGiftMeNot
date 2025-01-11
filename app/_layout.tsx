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


const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabNavigator = () =>{
	let colorScheme = useColorScheme();
	let token = store.getState().auth.token;

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
						case 'Login':
							return <ProfileIcon color={color} size={size} />;
					}
        },
        tabBarActiveTintColor: '#b8a96e',
        tabBarInactiveTintColor: '#a8a8a8',
		tabBarStyle: {
			backgroundColor: colorScheme === 'dark' ? "#333" : "#fff9e2",
			borderTopColor: colorScheme === 'dark' ? "#444" : "#ddd",
			borderTopWidth: 1,
		}
      })}
    >
      <Tabs.Screen name="Home" options={{headerShown: false}} component={Index} />
      <Tabs.Screen name="List" options={{headerShown: false}} component={List} />
      {token ? <Tabs.Screen name="Profile" options={{headerShown: false}} component={ProfilePage} /> :
				<Tabs.Screen name="Login" options={{headerShown: false}} component={LoginPage} />}
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
						<Stack.Screen name="+not-found" component={NotFoundScreen}/>
					</Stack.Navigator>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}