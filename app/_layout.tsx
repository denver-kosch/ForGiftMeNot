import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Stack } from "expo-router";
import { store, persistor } from '@/store.js';
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}

