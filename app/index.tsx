import { ScrollView, Text, View, } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useHomeStyles } from "@/styles"
import { store } from "@/store";
import apiCall from "@/services/apiCall";

export default function Index() {
  const token = store.getState().auth.token;
  const styles = useHomeStyles();
  const [name, setName] = useState(null);



  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const user = await apiCall('getUser', {include:['firstName', '']}, { Authorization: `Bearer ${token}` });
        if (user.success) setName(user.firstName);

      }
      if (token) fetchUser();
    }, [token])
  );


  const notLoggedInScreen = () => {
    
  };




  const IndexContents = () => {
    return ( 
      <View style={{ width: '100%' }}>
    	  <Text style={styles.header}>Welcome, </Text>

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