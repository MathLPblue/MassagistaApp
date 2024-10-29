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
    borderRadius: 5,
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
    width: '65%',
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',

  },
  Img:{
    opacity: 0.5,
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 40,
  },

});


export default AgendarCss;
