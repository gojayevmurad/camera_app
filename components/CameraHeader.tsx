import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { CameraType, FlashMode } from "expo-camera";

type Props = {
  flashMode: FlashMode;
  setCamera: (cameraType: CameraType) => void;
  currentCamera: CameraType;
  setFlashMode: (flashMode: FlashMode) => void;
};

const CameraHeader = ({
  setFlashMode,
  flashMode,
  setCamera,
  currentCamera,
}: Props) => {
  function toggleCameraType() {
    setCamera(
      currentCamera === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const changeFlashMode = () => {
    const newFlashMode = {
      [FlashMode.on]: FlashMode.off,
      [FlashMode.off]: FlashMode.auto,
      [FlashMode.auto]: FlashMode.torch,
      [FlashMode.torch]: FlashMode.on,
    }[flashMode];
    setFlashMode(newFlashMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={changeFlashMode}>
          <Ionicons
            name={
              flashMode === FlashMode.on || flashMode === FlashMode.torch
                ? "ios-flash-outline"
                : flashMode === FlashMode.off
                ? "ios-flash-off-outline"
                : "infinite"
            }
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType}>
          <Ionicons name="camera-reverse-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 70,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default CameraHeader;
