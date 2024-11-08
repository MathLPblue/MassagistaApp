import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AgendadosCss from '../css/AgendadosCss';
import { Agendamento, StatusAgendamento } from '../interfaces/AgendamentoTypes';

interface AgendamentoModalProps {
  visible: boolean;
  agendamento: Agendamento | null;
  onClose: () => void;
  onCall: (celular: string) => void;
  newStatus: StatusAgendamento | null;
  setNewStatus: (status: StatusAgendamento) => void;
  onSaveStatus: (id: string) => void;
}

const AgendamentoModal: React.FC<AgendamentoModalProps> = ({
  visible,
  agendamento,
  onClose,
  onCall,
  newStatus,
  setNewStatus,
  onSaveStatus
}) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={AgendadosCss.modalContainer}>
      <View style={AgendadosCss.modalConteudo}>
        {agendamento && (
          <>
            <Text style={AgendadosCss.modalTitulo}>Detalhes do Agendamento</Text>
            <Text style={AgendadosCss.modalTexto}>
              <Text style={AgendadosCss.modalTextoBold}>Nome: </Text>
              {agendamento.cliente}
            </Text>
            <Text style={AgendadosCss.modalTexto}>
              <Text style={AgendadosCss.modalTextoBold}>Data: </Text>
              {agendamento.data}
            </Text>
            <Text style={AgendadosCss.modalTexto}>
              <Text style={AgendadosCss.modalTextoBold}>Hora: </Text>
              {agendamento.hora}
            </Text>
            <TouchableOpacity onPress={() => onCall(agendamento.celular)}>
              <Text style={AgendadosCss.modalTexto}>
                <Text style={AgendadosCss.modalTextoBold}>Celular: </Text>
                {agendamento.celular}
              </Text>
            </TouchableOpacity>
            <Text style={AgendadosCss.modalTextoBold}>Mudar Status:</Text>
            <Picker
              selectedValue={newStatus || agendamento.status}
              style={AgendadosCss.Picker}
              onValueChange={(itemValue) => setNewStatus(itemValue as StatusAgendamento)}
            >
              <Picker.Item label="Pendente" value={StatusAgendamento.Pendente} />
              <Picker.Item label="Concluído" value={StatusAgendamento.Concluido} />
              <Picker.Item label="Cancelado" value={StatusAgendamento.Cancelado} />
            </Picker>
            <TouchableOpacity style={AgendadosCss.btnStatus} onPress={() => onSaveStatus(agendamento.id)}>
              <Text style={AgendadosCss.btnStatusDetalhes}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={AgendadosCss.btnStatus} onPress={onClose}>
              <Text style={AgendadosCss.btnStatusDetalhes}>Fechar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  </Modal>
);

export default AgendamentoModal;
