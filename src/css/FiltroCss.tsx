import {StyleSheet} from 'react-native';

const FiltroCss = StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 5,
      flexDirection: "row",
    },
    CaixaDia: {
      width: 85,
      height: 85,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 5,
      borderRadius: 15,
    },
    DiaSelecionado: {
      backgroundColor: "#0087e0",
    },
    padraoDia: {
      backgroundColor: "#61c0ff",
    },
    text: {
      color: "black",
      fontSize: 16,
      fontFamily:'Ubuntu_700Bold'
    },
    textoSelecionado: {
      color: "white",
      fontSize: 22,
      fontFamily:'Ubuntu_700Bold'
    },
    loadContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    agendamentosText:{

    }
  });

  export default FiltroCss;
