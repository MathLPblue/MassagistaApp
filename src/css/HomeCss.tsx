import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const HomeCss = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: 'lightGrey',
      fontFamily:'Ubuntu_700Bold'
    },
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#33afff',
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: Constants.statusBarHeight + 10,
    },
    navItem: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
      fontFamily:'Ubuntu_700Bold'
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      color: '#001e3a',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily:'Ubuntu_700Bold'

    },
    subtitle: {
      fontSize: 18,
      color: '#515151',
      marginBottom: 20,
      textAlign: 'center',
      paddingHorizontal: 20,
      fontFamily:'Ubuntu_400Regular'
    },
    button: {
      backgroundColor: 'green',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 25,
    },
    buttonLogout:{
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        margin:15
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
      fontFamily:'Ubuntu_700Bold'
    },
    Img:{
      width: 300,
      height: 300,
      marginBottom: 20,
      borderRadius: 40,
    }
  });

  export default HomeCss;
