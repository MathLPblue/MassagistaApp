import React from 'react';
import { FlatList } from 'react-native';

import AgendamentoItem from './AgendamentoItem';
import { Agendamento } from '../interfaces/AgendamentoTypes';

interface AgendamentosListProps {
  data: Agendamento[];
  onSchedule: (agendamento: Agendamento) => void;
}

const AgendamentosLista: React.FC<AgendamentosListProps> = ({ data, onSchedule }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <AgendamentoItem item={item} onSchedule={onSchedule} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default AgendamentosLista;
