import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  FlatList 
} from 'react-native';
import styles from './styles';
import VideoListItem from '../../components/VideoListItem';
import VideoPlayer from '../../components/VideoPlayer';

import video from '../../assets/data/video.json';
import videos from '../../assets/data/videos.json';

import { AntDesign } from '@expo/vector-icons';

const VideoScreen = () => {

  let viewsString = video.views.toString();
  if (video.views > 1_000_000){
    viewsString = (video.views / 1_000_000).toFixed(1) + 'm'
  } else if (video.views > 1_000) {
    viewsString = (video.views / 1_000).toFixed(1) + 'k'
  }

  return (
    <View style={{backgroundColor: '#141414', flex: 1}}>
      {/* Video Player */}
      <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />

      {/* Video Info */}
      <View style={styles.videoInfoContainer}>
        <Text style={styles.tags}>{video.tags}</Text>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.subtitle}>{video.user.name} {viewsString} {video.createdAt}</Text>
      </View>

      {/* Action List */}
      <View style={styles.actionListContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
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
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, borderColor: '#3d3d3d', borderTopWidth: 1, borderBottomWidth: 1}}>
        <Image style={styles.avatar} source={{ uri: video.user.image }} />

        <View style={{ marginHorizontal: 10, flex: 1}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{video.user.name}</Text>
          <Text style={{color: 'grey', fontSize: 18}}>{video.user.subscribers} subscribers</Text>
        </View>

        <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold', padding: 10}}>Subscribe</Text>
      </View>

      {/* Commnets */}
      <View style={{padding: 10, marginVertical: 10}}>
        <Text style={{color: 'white'}}>Comments 333</Text>
        {/* Comment component */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <Image style={{width: 35, height: 35, borderRadius: 20}} source={{ uri: video.user.image }} />
          <Text style={{color: 'white', marginLeft: 10,}}>Lorem asd asd asd asd asd asd asdndfgsdfg sdfg sdf gsdas as</Text>
        </View>
      </View>
    </View>
  )
};

const VideoScreenWithRecommendation = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#141414', flex: 1}}>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoListItem video={item} />}
        ListHeaderComponent={VideoScreen}
      />
    </SafeAreaView>
  )
}

export default VideoScreenWithRecommendation;
