import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Modal, Text, StyleSheet } from "react-native";

interface SpinnerProps {
  loading: boolean;
}

export const Spinner = ({ loading }: SpinnerProps) => {
  if (!loading) return null;

  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.loaderContainer}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 10,
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },
  contentText: {
    fontSize: 18,
    color: "#333333",
  },
});
