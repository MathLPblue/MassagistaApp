import {StyleSheet} from 'react-native';

const AutenticarCss = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    authContainer: {
      width: '80%',
      maxWidth: 400,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
      fontFamily: 'Ubuntu_700Bold'
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      borderRadius: 4,
      fontFamily: 'Ubuntu_400Regular'
    },
    buttonContainer: {
      marginBottom: 16,
      fontFamily: 'Ubuntu_700Bold'
      
    },
    toggleText: {
      color: '#F2B3CA', // cor antiga #3498db
      textAlign: 'center',
      fontFamily: 'Ubuntu_700Bold'
    },
    bottomContainer: {
      marginTop: 20,
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Ubuntu_400Regular'
    },
    logo:{
      width: 120, 
      height: 120, 
      marginBottom: 10, 
      borderRadius: 30, 
      
    },
    ImgContainer:{
      alignItems: 'center', 
      marginBottom: 10, 
    }
  });


  export default AutenticarCss;