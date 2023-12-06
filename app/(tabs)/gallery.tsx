import { View, StyleSheet, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { FileHelper } from "@/helpers/FileHelper";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GalleryDatabase, { IGalleryItem } from "@/helpers/DbHelper";

const { width, height } = Dimensions.get("window");

const Page = () => {
  const [images, setImages] = useState<IGalleryItem[]>();

  useFocusEffect(
    useCallback(() => {
      setImages(GalleryDatabase.gallery);
    }, [])
  );

  const deleteImageHandler = async (id: number) => {
    await GalleryDatabase.deleteMedia(id).then(() => {
      setImages(GalleryDatabase.gallery);
    });
  };

  return (
    <View>
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{
            flex: 1,
            gap: 20,
            padding: 10,
          }}
        >
          {images?.map((image, index) => (
            <View key={index}>
              <Image
                style={styles.galleryImage}
                source={{ uri: FileHelper.path + image.path }}
                height={300}
                width={width - 20}
              />
              <TouchableOpacity onPress={() => deleteImageHandler(image.id)}>
                <Ionicons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryImage: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.grey,
  },
});

export default Page;
