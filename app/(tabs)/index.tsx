import { ScrollView, StyleSheet, Text, View, } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const styles = createStyles();


  const IndexContents = () => {
    return (
      <View style={{ width: '100%' }}>
    	  <Text style={styles.header}>Welcome,</Text>

        <View style={styles.sharedListMiniBoard}>
          {/* This view contain (if any) shared lists with you, and underneath it as a subttitle, 
          will be a fading carousel, going through what you've currently marked as interested in buying and what new additions there are*/}
          <Text style={styles.text}>Shared Lists</Text>
          
        </View>

      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
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
      width: "100%",
    },
    header: {
      fontSize: 40,
      fontWeight: "bold",
      width: "100%",
      textAlign: "left", // Align text to the left
      paddingHorizontal: 20, // Optional: Add padding
      color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    text: {
      fontSize: 16,
      color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    sharedListMiniBoard: {
      width: "90%",
      alignSelf: "center",
      padding: 20,
      marginTop: 40,
      backgroundColor: colorScheme === 'dark' ? "#444" : "#EDEDED",
			borderRadius: 10,
		},
  });
};
