import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import FiltroCss from '../css/FiltroCss';

interface FiltroProps {
  onSelectDay: (day: string | null) => void;
}

const Filtro: React.FC<FiltroProps> = ({ onSelectDay }) => {
  const [DiaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [dias, setDias] = useState<string[]>([]);

  useEffect(() => {
    const diasArray = [];
    moment.locale('pt-br');
    for (let i = 0; i < 7; i++) {
      diasArray.push(moment().add(i, 'days').format('DD-MM-YYYY, ddd').toUpperCase());
    }
    setDias(diasArray);
  }, []);

  const handlePress = (day: string) => {
    const [diaCompleto] = day.split(','); 
    if (DiaSelecionado === diaCompleto) {
      setDiaSelecionado(null);
      onSelectDay(null);
    } else {
      setDiaSelecionado(diaCompleto);
      onSelectDay(moment(diaCompleto, 'DD-MM-YYYY').format('DD/MM/YYYY'));
    }
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={FiltroCss.container}>
        {dias.map((day, index) => {
          const [diaCompleto, diaSemana] = day.split(',');
          return (
            <TouchableOpacity
              key={index}
              style={[
                FiltroCss.CaixaDia,
                DiaSelecionado === diaCompleto ? FiltroCss.DiaSelecionado : FiltroCss.padraoDia,
              ]}
              onPress={() => handlePress(day)}
            >
              <Text style={DiaSelecionado === diaCompleto ? FiltroCss.textoSelecionado : FiltroCss.text}>
                {diaCompleto.split('-')[0]}
              </Text>
              <Text style={DiaSelecionado === diaCompleto ? FiltroCss.textoSelecionado : FiltroCss.text}>
                {diaSemana.trim()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Filtro;
