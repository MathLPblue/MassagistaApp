import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import moment from "moment";
import 'moment/locale/pt-br';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

// https://momentjs.com/
// https://stackoverflow.com/questions/17493309/how-do-i-change-the-language-of-moment-js
// https://momentjs.com/docs/#/query/

const Filtro = () => {
  const [DiaSelecionado, setDiaSelecionado] = useState<number>(moment().date());
  const [days, setDays] = useState<string[]>([]);
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  useEffect(() => {

    const generateDays = () => {
      let tempDays = [];
      moment.locale('pt-br');
      {/*É a lógica para ir adicionando os blocos com os dias, ]
        ainda estou pensando se coloco 7, 14, 21 ou 30 dias
        por enquanto vou deixar com 5 pq achei mais bonitinho
        */}
      for (let i = 0; i < 5; i++) {
        // Colocando dddd o dia fica escrito por inteiro, incluido o "feira"
        tempDays.push(moment().add(i, 'days').format('DD, ddd'));
      }
      setDays(tempDays);
    };
    generateDays();
  }, []);

  const handlePress = (day: string) => {
    setDiaSelecionado(Number(day.split(',')[0]));
  };

  if (!fontLoaded) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {days.map((day, index) => {
        const dayNumber = Number(day.split(',')[0]);
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.CaixaDia,
              DiaSelecionado === dayNumber ? styles.DiaSelecionado : styles.padraoDia,
            ]}
            onPress={() => handlePress(day)}
          >
            <Text style={DiaSelecionado === dayNumber ? styles.textoSelecionado : styles.text}>{day.split(',')[0]}</Text>
            <Text style={DiaSelecionado === dayNumber ? styles.textoSelecionado : styles.text}>{day.split(',')[1]}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

//Ainda vou seperar isso em outro arquivo

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: "row",
    marginBottom: -150 //isso aqui tá ridiculo
  },
  CaixaDia: {
    //Acho que o tamanho está okay.
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
});

export default Filtro;
