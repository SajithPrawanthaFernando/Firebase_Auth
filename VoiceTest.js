import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";

class VoiceTest extends Component {
  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  componentWillUnmount() {
    // Clean up voice recognition listeners
    Voice.removeAllListeners();
  }

  onSpeechStartHandler(e) {
    console.log("Speech started");
    // Handle speech start event
  }

  onSpeechEndHandler(e) {
    console.log("Speech ended");
    // Handle speech end event
  }

  onSpeechResultsHandler(e) {
    console.log("Speech results:", e.value);
    // Handle speech results, e.value is an array of recognized words
  }

  onStartButtonPress() {
    try {
      Voice.start("en-US");
    } catch (e) {
      console.error("Error starting voice recognition:", e);
    }
  }

  onStopButtonPress() {
    try {
      Voice.stop();
    } catch (e) {
      console.error("Error stopping voice recognition:", e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Voice Recognition Test</Text>
        <Button title="Start" onPress={this.onStartButtonPress} />
        <Button title="Stop" onPress={this.onStopButtonPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default VoiceTest;
