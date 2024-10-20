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
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 15,
        borderWidth: 3,
        borderColor: '#33adffce',
        borderRadius: 18,
        backgroundColor: '#61c0ff16' /* testando cores*/
      },
      itemTexto: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily:'Ubuntu_400Regular'
      },
      btnConfirma: {
        backgroundColor: '#33afff',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: -15,
        width: '30%',
        alignSelf: 'flex-end',
      },
      btnStatus:{
        backgroundColor: '#33afff',
        padding: 10,
        borderRadius: 26,
        alignItems: 'center',
        marginTop: 5,
        width: '55%',

      },
      btnStatusDetalhes:{
        color: '#fff',
        fontSize: 16,
        fontFamily:'Ubuntu_700Bold',
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
        borderRadius: 20,
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
      Picker:{
        height: 50,
        width: 200,
        backgroundColor:'grey',
      },
      PickerTexto:{
        fontFamily:'Ubuntu_400Regular',
        fontSize:15
      },
})

export default AgendadosCss
