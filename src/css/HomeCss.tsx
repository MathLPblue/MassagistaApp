import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

/* 
A logo do massagista possue uma paleta de cores diferente do aplicativo em geral

#8C4660
#F2B3CA
#F2F0EB
#732C02
#A66B49

*/
const HomeCss = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: 'lightGrey',
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
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#001e3a',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#515151',
      marginBottom: 20,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: 'green',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 25,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    Img:{
      width: 300, 
      height: 300, 
      marginBottom: 20, 
      borderRadius: 40, 
      
  
    }
  });

  export default HomeCss;