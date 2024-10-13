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
        fontFamily:'Ubuntu_700Bold'
      },
      section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
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
        fontFamily:'Ubuntu_400Regular'
      },
      btnConfirma: {
        backgroundColor: '#33afff', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: -15,
        width: '35%', 
        alignSelf: 'flex-end', 
      },
      btnConfrimaDetalhes: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'Ubuntu_700Bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      
      modalConteudo: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      
      modalTitulo: {
        fontSize: 20,
        fontFamily:'Ubuntu_700Bold',
        marginBottom: 20,
      },
      
      modalTexto: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily:'Ubuntu_400Regular',
      },
      
      
    
})

export default AgendadosCss