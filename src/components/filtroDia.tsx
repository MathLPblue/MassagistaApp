import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import FiltroCss from '../css/FiltroCss';
// Mudei o nome do arquivo pois pretendo fazer mais um filtro
interface FiltroProps {
  onSelectDay: (day: string | null) => void;
}

const Filtro: React.FC<FiltroProps> = ({ onSelectDay }) => {
  const [DiaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [dias, setDias] = useState<string[]>([]);

  useEffect(() => {
    const diasArray = [];
    moment.locale('pt-br');
    //Decidi dixar apenas 7 dias mesmo...
    for (let i = 0; i < 7; i++) {
      diasArray.push(moment().add(i, 'days').format('DD, ddd').toUpperCase());

    }
    setDias(diasArray);
  }, []);

  const handlePress = (day: string) => {
    const diaNum = Number(day.split(',')[0]);

    if (DiaSelecionado === diaNum) {
        setDiaSelecionado(null);
        onSelectDay(null);
      } else {
        setDiaSelecionado(diaNum);
        const diaFormatado = moment().date(diaNum).format('DD/MM/YYYY');
        onSelectDay(diaFormatado);
      }
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={FiltroCss.container}>
        {dias.map((day, index) => {
          const diaNum = Number(day.split(',')[0]);
          return (
            <TouchableOpacity
              key={index}
              style={[
                FiltroCss.CaixaDia,
                DiaSelecionado === diaNum ? FiltroCss.DiaSelecionado : FiltroCss.padraoDia,
              ]}
              onPress={() => handlePress(day)}
            >
              <Text style={DiaSelecionado === diaNum ? FiltroCss.textoSelecionado : FiltroCss.text}>
                {day.split(',')[0]}
              </Text>
              <Text style={DiaSelecionado === diaNum ? FiltroCss.textoSelecionado : FiltroCss.text}>
                {day.split(',')[1]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Filtro;
