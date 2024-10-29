import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const TodosAgendadosCss = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: 'lightGrey',
      },
      nav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#33afff',
        borderRadius: 10,
        marginTop: Constants.statusBarHeight,
        alignSelf: 'flex-start',
        padding:20
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
        backgroundColor: '#61c0ff16'
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
      btnTodosAgendados:{
        backgroundColor: '#33afff',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: -15,
        width: '30%',
        alignSelf: 'flex-start',
      },
      btnTodosAgendadosTexto:{
        color: '#ffff',
        fontSize:15,
        fontFamily:'Ubuntu_700Bold',
        textAlign:'center'

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
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Ubuntu_400Regular',
        color: '#333',
    },
    modalTextoBold:{
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Ubuntu_700Bold',
        color: '#333',
    },
    Picker: {
        height: 50,
        width: 220,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    PickerTexto: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
        color: '#555',
        textAlign:'center'
    },
    PickerContainer: {
        height: 50,
        width: 220,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        overflow: 'hidden',
      },
      StatusIndicador: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
      statusTexto: {
        marginLeft: 5,
        fontSize: 16,
        fontFamily: 'Ubuntu_400Regular',
        fontWeight:'900'
    },
    pesquisarInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 5,
      },


 });
 export default TodosAgendadosCss;
