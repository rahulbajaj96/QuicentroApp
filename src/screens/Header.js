import React from "react";
import { Text, View, StyleSheet } from "react-native";
export default function Header() {
  return (
    <View style={styles.container}>
      <Text>Hello from Header Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
