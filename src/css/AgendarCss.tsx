import { StyleSheet } from 'react-native';


const AgendarCss = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center', // Certifica-se de que o conteúdo esteja centralizado
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 4,
    fontSize: 16,
  },
  dateText: {
    marginVertical: 16,
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'pink', // Define a cor rosa para o botão
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Centraliza o texto dentro do botão
    marginTop: 20,
    alignSelf: 'center', // Centraliza o botão na horizontal
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
});


export default AgendarCss;