import React from "react";
import { View, Text, Image } from "react-native";
import { Comment } from "../../src/models";

interface VideoCommentProps {
  comment: Comment;
}

const VideoComment = ({ comment }: VideoCommentProps) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <Image
        style={{ width: 35, height: 35, borderRadius: 20 }}
        source={{ uri: comment.User?.image }}
      />
      <Text style={{ color: "white", marginLeft: 10 }}>{comment.comment}</Text>
    </View>
  );
};

export default VideoComment;
