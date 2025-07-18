// screens/HomeScreen.tsx
// Update the import path to the correct relative path
import FlickerLight from "@/components/FlickerLight";
import React from "react";
import { View, StyleSheet } from "react-native";


const Home = () => {
  return (
    <View style={styles.container}>
      <FlickerLight />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
