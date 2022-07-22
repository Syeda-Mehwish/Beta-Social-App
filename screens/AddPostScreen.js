import React, {useContext, useState} from 'react';
import {View, Text,StyleSheet, Alert, ActivityIndicator} from 'react-native';
import{ InputField, InputWrapper, SubmitBtn, SubmitBtnText ,AddImage, StatusWrapper} from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


const AddPostScreen = () => {

  const {user, logout} = useContext(AuthContext);
  const [post, setPost] = useState(null);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 1600,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }


  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }

    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      //  Alert.alert(
      //    'Image uploaded!',
      //    'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      //  );
       return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };
      

    

  return (
    <View style={styles.container}>
        <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}
        <InputField
        placeholder="What Is on Your Mind?"
        multiline
        numberOfLine={4}
        value={post}
        onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}

        </InputWrapper>

       <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item 
             buttonColor='#9b59b6' 
             title="TakePhoto" 
             onPress={takePhotoFromCamera}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item 
             buttonColor='#3498db' 
             title="Choose Photo"
             onPress={choosePhotoFromLibrary}>
            <Icon name="md-image-outline" 
            style={styles.actionButtonIcon} />
          </ActionButton.Item>
          
        </ActionButton>

        
    </View>
  )
}

export default AddPostScreen;
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 34
      
    },
    text: {
      
      fontSize: 20,
      color: '#333333',
    },

    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  
  });
  
