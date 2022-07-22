import React, { useContext,useState } from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,KeyboardAvoidingView } from 'react-native';
  import FormButton from '../components/formButton';
  import FormInput from '../components/formInput';
  import SocialButton from '../components/SocialButton';
  import { AuthContext } from '../navigation/AuthProvider';


const SignupScreen = ({navigation}) => {
  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    
    const {register} = useContext(AuthContext);
      return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
          
          <Text style={styles.text}>Create an account</Text>
  
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
  
        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

<FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
  
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => 
           register(email, password)}
        />
  
  <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      
  
  <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Have an account? Sign In
        </Text>
      </TouchableOpacity>
  
        </KeyboardAvoidingView>
      )
    }
  
  
  export default SignupScreen;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      padding: 30,
      
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 40,
      marginTop:40,
      color: '#051d5f',
      alignSelf:"center"
    },
    navButton: {
      marginTop: 1,
      alignSelf:"center"
    },
    navButtonText: {
      fontSize: 20,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 30,
      justifyContent: 'center',
    },
    color_textPrivate: {
      fontSize: 13,
      fontWeight: '400',
      fontFamily: 'Lato-Regular',
      color: 'grey',
    },
  });