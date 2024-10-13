import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Button, Linking } from 'react-native';
import Imagens from '../imgs/Imagens';
import { Link } from 'expo-router';
import AgendadosCss from '../css/AgendadosCss';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';


interface Agendamento {
  id: string;
  cliente: string;
  data: string;
  hora: string;
  celular: string;
}

const exemploAgendamento: Agendamento[] = [
  { id: '1', cliente: 'Alexandre', data: '11/09/2001', hora: '15:15', celular: '123456' },
  { id: '2', cliente: 'Elias', data: '22/10/2021', hora: '19:00', celular: '123456' },
  { id: '3', cliente: 'Matheus', data: '20/07/2024', hora: '09:30', celular: '123456' },
  { id: '4', cliente: 'TWINSEN', data: '13/10/2024', hora: '10:00', celular: '123456' }, // celular deve ser uma string
];

export default function Agendados() {
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

  if (!fontLoaded) {
    return null;
  }

  const handleSchedule = (agendamento: Agendamento) => {
    setSelectedAgendamento(agendamento);
    setModalVisible(true);
  };

  const handleCallWhatsApp = (celular: string) => {
    const url = `https://wa.me/55${celular}`;
    Linking.openURL(url).catch(err => console.error('Falha ao abrir o link:', err));
  };

  const AgendamentoItem = ({ item }: { item: Agendamento }) => (
    <View style={AgendadosCss.agendamentoItem}>
      <Text style={AgendadosCss.itemTexto}> Cliente: {item.cliente} </Text>
      <Text style={AgendadosCss.itemTexto}> Data: {item.data} </Text>
      <Text style={AgendadosCss.itemTexto}> Hora: {item.hora} </Text>
      <TouchableOpacity style={AgendadosCss.btnConfirma} onPress={() => handleSchedule(item)}>
        <Text style={AgendadosCss.btnConfrimaDetalhes}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={AgendadosCss.container}>
      <StatusBar style="light" translucent={true} />

      <View style={AgendadosCss.nav}>
        <TouchableOpacity onPress={() => console.log("home")}>
          <Text style={AgendadosCss.navItem}><Link href={"/Home"}>Home</Link></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("agendar")}>
          <Text style={AgendadosCss.navItem}><Link href={"/Agendar"}>Agendar</Link></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("agendados")}>
          <Text style={AgendadosCss.navItem}><Link href={'/Agendados'}>Agendados</Link></Text>
        </TouchableOpacity>
      </View>

      <FlatList data={exemploAgendamento} renderItem={AgendamentoItem} keyExtractor={(item) => item.id} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={AgendadosCss.modalContainer}>
          <View style={AgendadosCss.modalConteudo}>
            {selectedAgendamento && (
              <>
                <Text style={AgendadosCss.modalTitulo}>Detalhes do Agendamento</Text>
                <Text style={AgendadosCss.modalTexto}>Cliente: {selectedAgendamento.cliente}</Text>
                <Text style={AgendadosCss.modalTexto}>Data: {selectedAgendamento.data}</Text>
                <Text style={AgendadosCss.modalTexto}>Hora: {selectedAgendamento.hora}</Text>
                <TouchableOpacity onPress={() => handleCallWhatsApp(selectedAgendamento.celular)}>
                  <Text style={AgendadosCss.modalTexto}>Celular: {selectedAgendamento.celular}</Text>
                </TouchableOpacity>
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
