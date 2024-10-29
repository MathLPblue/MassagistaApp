import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AgendadosCss from '../css/AgendadosCss';
import StatusIndicador from './StatusAgendamento';
import { Agendamento } from './TodosAgendamentos';

interface AgendamentoItemProps {
  item: Agendamento;
  onSchedule: (agendamento: Agendamento) => void;
}

const AgendamentoItem: React.FC<AgendamentoItemProps> = ({ item, onSchedule }) => (
  <View style={AgendadosCss.agendamentoItem}>
    <Text style={AgendadosCss.itemTexto}> Nome: {item.cliente} </Text>
    <Text style={AgendadosCss.itemTexto}> Data: {item.data} </Text>
    <Text style={AgendadosCss.itemTexto}> Hora: {item.hora} </Text>
    {StatusIndicador(item.status)}
    <TouchableOpacity style={AgendadosCss.btnConfirma} onPress={() => onSchedule(item)}>
      <Text style={AgendadosCss.btnConfrimaDetalhes}>Detalhes</Text>
    </TouchableOpacity>
  </View>
);

export default AgendamentoItem;
