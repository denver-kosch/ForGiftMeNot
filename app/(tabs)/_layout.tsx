import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HomeIcon, ListIcon } from '@/hooks/icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24}/>,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Your Lists',
          tabBarIcon: ({ color }) => <ListIcon color={color} size={24}/>,
        }}
      />

    </Tabs>
  );
}
