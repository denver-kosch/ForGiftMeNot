import { ScrollView, Text, View, } from "react-native";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "@/styles"
import { store } from "@/store";

export default function Index() {
  const token = store.getState().auth.token;
  const styles = homeStyles();


  useEffect(() => {
    
  }, [token]);


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