import { StyleSheet } from 'react-native';


const AgendarCss = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily:'Ubuntu_700Bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ContainerTitulo:{
    justifyContent:'center',
    alignItems:'center'
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily:'Ubuntu_700Bold'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 4,
    fontSize: 16,
    fontFamily:'Ubuntu_400Regular',
  },
  dateText: {
    marginVertical: 16,
    padding: 10,
    fontSize: 18,
    fontFamily:'Ubuntu_700Bold',
    justifyContent:'center',
    textAlign:'center',
  },
  backButton: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  btnConfirma: {
    backgroundColor: '#33afff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '45%',
    alignSelf: 'center',
  },
  btnConfrimaDetalhes: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Ubuntu_700Bold',
    textAlign:'center'
  },
  btnDataHora:{
    backgroundColor: '#33afff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },

});


export default AgendarCss;
