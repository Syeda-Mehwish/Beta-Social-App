import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import chatScreen from '../screens/chatScreen';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch,setIsFirstLaunch]=useState(null);

    useEffect(()=>{
      AsyncStorage.getItem('alreadyLaunched').then(value =>{
        if(value == null){
          AsyncStorage.setItem('alreadyLaunched','true');
          setIsFirstLaunch(true);
        }
        else{
          setIsFirstLaunch(false);
        }
      });
    },[]);
  
    if(isFirstLaunch == null){
      return null;
    }
    else if(isFirstLaunch === true){
      routeName = 'Onboarding';
    } else {
      routeName = 'Login';
    }
    return (
        <Stack.Navigator initialRouteName={routeName}
        >
          
        <Stack.Screen
          name="Onboarding"
          component={OnBoardingScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{marginLeft: 1}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={24}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('Login')}
                />
                <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{header: () => null}}
        />
              </View>
            ),
          })}
        />
        
        
      </Stack.Navigator>
    );
    
    
  };
  
  export default AuthStack;
  