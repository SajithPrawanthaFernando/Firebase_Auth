import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DashboardScreen = ({ user, handleLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.email}</Text>
      {/* Add your dashboard content here */}
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default DashboardScreen;
