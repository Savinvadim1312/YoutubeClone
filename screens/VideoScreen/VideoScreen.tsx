import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Video, Comment } from "../../src/models";

import styles from "./styles";
import VideoListItem from "../../components/VideoListItem";
import VideoPlayer from "../../components/VideoPlayer";

import videos from "../../assets/data/videos.json";

import { AntDesign } from "@expo/vector-icons";
import VideoComments from "../../components/VideoComments";
import VideoComment from "../../components/VideoComment";

const VideoScreen = () => {
  const [video, setVideo] = useState<Video | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const route = useRoute();
  const videoId = route.params?.id;

  useEffect(() => {
    DataStore.query(Video, videoId).then(setVideo);
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!video) {
        return;
      }

      const videoComments = (await DataStore.query(Comment)).filter(
        (comment) => comment.videoID === video.id
      );

      setComments(videoComments);
    };

    fetchComments();
  }, [video]);

  const commentsSheetRef = useRef<BottomSheetModal>(null);

  const openComments = () => {
    commentsSheetRef.current?.present();
  };

  if (!video) {
    return <ActivityIndicator />;
  }
  console.log(video);
  let viewsString = video.views.toString();
  if (video.views > 1_000_000) {
    viewsString = (video.views / 1_000_000).toFixed(1) + "m";
  } else if (video.views > 1_000) {
    viewsString = (video.views / 1_000).toFixed(1) + "k";
  }
  return (
    <View style={{ backgroundColor: "#141414", flex: 1 }}>
      {/* Video Player */}
      <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />

      <View style={{ flex: 1 }}>
        {/* Video Info */}
        <View style={styles.videoInfoContainer}>
          <Text style={styles.tags}>{video.tags}</Text>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.subtitle}>
            {video.User?.name} {viewsString} {video.createdAt}
          </Text>
        </View>

        {/* Action List */}
        <View style={styles.actionListContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.actionListItem}>
              <AntDesign name="like1" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.likes}</Text>
            </View>

            <View style={styles.actionListItem}>
              <AntDesign name="dislike2" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.dislikes}</Text>
            </View>

            <View style={styles.actionListItem}>
              <AntDesign name="export" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.dislikes}</Text>
            </View>

            <View style={styles.actionListItem}>
              <AntDesign name="download" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.dislikes}</Text>
            </View>

            <View style={styles.actionListItem}>
              <AntDesign name="download" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.dislikes}</Text>
            </View>

            <View style={styles.actionListItem}>
              <AntDesign name="download" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.dislikes}</Text>
            </View>

            <View style={styles.actionListItem}>
              <AntDesign name="download" size={30} color="lightgrey" />
              <Text style={styles.actionText}>{video.dislikes}</Text>
            </View>
          </ScrollView>
        </View>

        {/* User Info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderColor: "#3d3d3d",
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Image style={styles.avatar} source={{ uri: video.User?.image }} />

          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {video.User?.name}
            </Text>
            <Text style={{ color: "grey", fontSize: 18 }}>
              {video.User?.subscribers} subscribers
            </Text>
          </View>

          <Text
            style={{
              color: "red",
              fontSize: 18,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Subscribe
          </Text>
        </View>

        {/* Commnets */}
        <Pressable
          onPress={openComments}
          style={{ padding: 10, marginVertical: 10 }}
        >
          <Text style={{ color: "white" }}>Comments 333</Text>
          {comments.length > 0 && <VideoComment comment={comments[0]} />}
        </Pressable>

        {/* All comments */}
        <BottomSheetModal
          ref={commentsSheetRef}
          snapPoints={["70%"]}
          index={0}
          backgroundComponent={({ style }) => (
            <View style={[style, { backgroundColor: "#4d4d4d" }]} />
          )}
        >
          <VideoComments comments={comments} videoID={video.id} />
        </BottomSheetModal>
      </View>
    </View>
  );
};

const VideoScreenWithRecommendation = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#141414", flex: 1 }}>
      <BottomSheetModalProvider>
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideoListItem video={item} />}
          ListHeaderComponent={VideoScreen}
        />
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default VideoScreenWithRecommendation;
