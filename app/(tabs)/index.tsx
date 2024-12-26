import { ScrollView, StyleSheet, Text, View, } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const styles = createStyles();

  const IndexContents = () => {
    return (
      <View>
        <Text style={styles.header}>Welcome!</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <IndexContents/>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const createStyles = () => {
  const colorScheme = useColorScheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorScheme === 'dark' ? "#333" : "#fff9e2",

    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      color: colorScheme === 'dark' ? "#fff" : "#000",
      // put at top of screen
      position: 'absolute',
      top: 50,

    },
    text: {
      fontSize: 16,
      color: colorScheme === 'dark' ? "#fff" : "#000",
    }
  });
};