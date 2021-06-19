import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "../components/VideoPlayer";
import { Storage, DataStore, Auth } from "aws-amplify";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useNavigation } from "@react-navigation/core";

import { Video, User } from "../src/models";

export default function VideoUploadScreen() {
  const [video, setVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setVideo(result.uri);
      setDuration(Math.floor(result.duration / 100));
    }
  };

  const generateThumbnail = async (): Promise<string | null> => {
    if (!video) {
      return null;
    }
    const { uri } = await VideoThumbnails.getThumbnailAsync(video, {
      time: 1000,
    });

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileKey = `${uuidv4()}.jpg`;
      await Storage.put(fileKey, blob);
      return fileKey;
    } catch (err) {
      console.log("Error uploading file:", err);
      return null;
    }
  };

  const uploadVideo = async (): Promise<string | null> => {
    if (!video) {
      return null;
    }
    try {
      const response = await fetch(video);
      const blob = await response.blob();
      const fileKey = `${uuidv4()}.mp4`;
      await Storage.put(fileKey, blob, {
        progressCallback: (p) => {
          console.log(p);
          setProgress(p.loaded / p.total);
        },
      });
      return fileKey;
    } catch (err) {
      console.log("Error uploading file:", err);
      return null;
    }
  };

  const uploadPost = async () => {
    if (!video) {
      return;
    }
    const fileKey = await uploadVideo();
    const thumbnailKey = await generateThumbnail();

    const userInfo = await Auth.currentAuthenticatedUser();
    const userSub = userInfo.attributes.sub;

    const user = (await DataStore.query(User)).find((u) => u.sub === userSub);

    if (!user || !fileKey || !thumbnailKey) {
      console.error("User not found");
      return;
    }

    await DataStore.save(
      new Video({
        title,
        thumbnail: thumbnailKey,
        videoUrl: fileKey,
        duration,
        views: 0,
        likes: 0,
        dislikes: "0",
        userID: user.id,
      })
    );

    setVideo(null);
    setDuration(0);
    setTitle("");
    setProgress(0);

    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick a video from camera roll" onPress={pickVideo} />
      {video && <VideoPlayer videoURI={video} />}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="grey"
        style={{
          backgroundColor: "#010101",
          color: "white",
          padding: 10,
          flex: 1,
        }}
      />
      <Button title="Upload" onPress={uploadPost} />

      <View
        style={{
          width: `${progress * 100}%`,
          height: 3,
          backgroundColor: "blue",
        }}
      />
    </View>
  );
}
