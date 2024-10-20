import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import moment from "moment";
import 'moment/locale/pt-br';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import FiltroCss from "../css/FiltroCSS";
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
      <View style={FiltroCss.loadContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={FiltroCss.container}>
      {days.map((day, index) => {
        const dayNumber = Number(day.split(',')[0]);
        return (
          <TouchableOpacity
            key={index}
            style={[
              FiltroCss.CaixaDia,
              DiaSelecionado === dayNumber ? FiltroCss.DiaSelecionado : FiltroCss.padraoDia,
            ]}
            onPress={() => handlePress(day)}
          >
            <Text style={DiaSelecionado === dayNumber ? FiltroCss.textoSelecionado : FiltroCss.text}>{day.split(',')[0]}</Text>
            <Text style={DiaSelecionado === dayNumber ? FiltroCss.textoSelecionado : FiltroCss.text}>{day.split(',')[1]}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};


export default Filtro;
