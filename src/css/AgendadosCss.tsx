import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

const AgendadosCss = StyleSheet.create ({
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
      agendamentoItem: {
        padding: 15,
        marginVertical: 15,
        borderWidth: 5,
        borderColor: '#ffd9d9',
        borderRadius: 8,
        backgroundColor: '#ff7efb12' /* testando cores*/ 
      },
      itemTexto: {
        fontSize: 18,
        marginBottom: 5,
      },
      
    
})

export default AgendadosCss