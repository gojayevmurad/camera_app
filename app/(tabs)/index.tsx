import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import CameraHeader from "@/components/CameraHeader";
import { AutoFocus, Camera, CameraType, FlashMode } from "expo-camera";
import { useAppDispatch } from "@/redux/store";
import { addImage } from "@/redux/cameraSlice";
import { FileHelper } from "@/helpers/FileHelper";
import * as FileSystem from "expo-file-system";
import Paths from "@/constants/Paths";
import GalleryDatabase from "@/helpers/DbHelper";
import Slider from "@react-native-community/slider";

const Page = () => {
  const cameraRef = useRef<Camera>(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.auto);
  const [focusDepth, setFocusDepth] = useState(0);

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

    const fileName = `image-${Date.now()}.jpeg`;

    FileHelper.saveFile(photo.uri, fileName);
    GalleryDatabase.addMedia(fileName);
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
          autoFocus={AutoFocus.off}
          focusDepth={focusDepth}
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
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            onValueChange={(value) => setFocusDepth(value)}
            step={0.05}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
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
