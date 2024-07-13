// AuthenticatedScreen.js
import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

const AuthenticatedScreen = ({ navigation, user, fetchedData }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      {user ? (
        <>
          <Text style={styles.emailText}>{user.email}</Text>
          <Button
            title="Profile"
            onPress={() => navigation.navigate("Profile")}
            color="#3498db"
          />
          {fetchedData && (
            <ScrollView>
              {fetchedData.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Image
                    source={{ uri: item.imageUrl }} // Replace with your image URL field
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardText}>
                    First Name: {item.firstName}
                  </Text>
                  <Text style={styles.cardText}>
                    Last Name: {item.lastName}
                  </Text>
                  <Text style={styles.cardText}>
                    Full Name: {item.fullName}
                  </Text>
                  <Text style={styles.cardText}>Title: {item.title}</Text>
                  <Text style={styles.cardText}>Family: {item.family}</Text>
                </View>
              ))}
            </ScrollView>
          )}
          <Button
            title="Logout"
            onPress={handleAuthentication}
            color="#e74c3c"
          />
        </>
      ) : (
        <View style={styles.authContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.emailText}>Guest</Text>
          <Button
            title="Login"
            onPress={handleAuthentication}
            color="#3498db"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 4,
  },
});

export default AuthenticatedScreen;
