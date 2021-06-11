import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { DataStore } from "aws-amplify";
import { Video } from "../src/models";

import VideoListItem from "../components/VideoListItem";

const HomeScreen = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // fetch videos
    DataStore.query(Video).then(setVideos);
  }, []);

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoListItem video={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
