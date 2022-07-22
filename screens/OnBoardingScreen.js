import React from 'react'
import { Text, View, StyleSheet, Image,TouchableOpacity, Button } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Done</Text>
  </TouchableOpacity>
);

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
      <View 
          style={{
              width:6,
              height: 6,
              marginHorizontal: 3,
              backgroundColor
          }}
      />
  );
}

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
    SkipButtonComponent={Skip}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}
    DotComponent={Dots}
    onSkip={() => navigation.replace("Login")}
    onDone={() => navigation.navigate("Login")}  
  pages={[
    {
      backgroundColor: '#2e64e5',
      image: <Image source={require('../assets/onboarding-img1.png')} />,
      title: 'Connect to the World',
      subtitle: 'A New Way To Connect With The World',
    },

    {
      backgroundColor: '#f9fafd',
      image: <Image source={require('../assets/onboarding-img2.png')} />,
      title: 'Share Your Favorites',
      subtitle: 'Share Your Thoughts With Similar Kind of People',
    },
    {
      backgroundColor: '#2e64e5',
      image: <Image source={require('../assets/onboarding-img3.png')} />,
      title: 'Become The Star',
      subtitle: "Let The Spot Light Capture You",
    },
    
  ]}
/>
  );
};


export default OnBoardingScreen;

const styles = StyleSheet.create({
    cointainer:{
        flex:1,
        

    },
})
