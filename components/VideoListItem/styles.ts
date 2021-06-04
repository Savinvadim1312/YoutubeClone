import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  videoCard: {
    marginVertical: 15
  },
  thumbnail: { 
    width: '100%', 
    aspectRatio: 16/9,
  },
  timeContainer: {
    backgroundColor: '#00000099',
    height: 25,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  time: {
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleRow: {
    flexDirection: 'row',
    padding: 10,
  },
  midleContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  subtitle: {
    color: 'grey',
    fontSize: 14,
    fontWeight: "500",
  }
});

export default styles;