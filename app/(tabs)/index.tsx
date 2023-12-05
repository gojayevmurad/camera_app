import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Stack } from "expo-router";
import CameraHeader from "@/components/CameraHeader";
import { Camera, CameraType, FlashMode } from "expo-camera";

const Page = () => {
  const cameraRef = useRef<Camera>(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.auto);
  const [uri, setUri] = useState<string | null>(null);

  if (!permission) {
    return <View></View>;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Permission is not granted</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }
    const photo = await cameraRef.current.takePictureAsync();

    setUri(photo.uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => (
            <CameraHeader
              setCamera={setType}
              currentCamera={type}
              flashMode={flashMode}
              setFlashMode={setFlashMode}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flashMode}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          />
        </View>
        {uri && <Image width={400} height={400} source={{ uri: uri }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Page;
