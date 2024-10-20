import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Button, Linking } from 'react-native';
import { db } from '../services/firebaseconfig';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Link } from 'expo-router';
import AgendadosCss from '../css/AgendadosCss';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Picker } from '@react-native-picker/picker';
import { getAuth } from 'firebase/auth';
import Filtro from '../components/filtro';


export enum StatusAgendamento {
  Pendente = 'Pendente',
  Confirmado = 'Concluído',
  Cancelado = 'Cancelado'
}
interface Agendamento {
  id: string;
  cliente: string;
  data: string;
  hora: string;
  celular: string;
  status: StatusAgendamento;
}


export default function Agendados() {
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [newStatus, setNewStatus] = useState<StatusAgendamento | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const agendamentosCollection = collection(db, 'agendamentos');
        let agendamentosQuery = query(agendamentosCollection);

        // Yup, essa gambiarra está horrível.
        if (user) {
          const userEmail = user.email;
          const usersCollection = collection(db, 'users');
          const usersQuery = query(usersCollection, where('email', '==', userEmail));
          const usersSnapshot = await getDocs(usersQuery);
          const userDoc = usersSnapshot.docs[0];

          if (userDoc) {
            const role = userDoc.data().role;

            if (role === 'cliente') {

              agendamentosQuery = query(agendamentosCollection, where('email', '==', userEmail));

            } else if (role === 'massagista') {

              agendamentosQuery = agendamentosCollection;

            }
          }
        }


        const agendamentosSnapshot = await getDocs(agendamentosQuery);
        const agendamentosList = agendamentosSnapshot.docs.map(doc => ({
          id: doc.id,
          cliente: doc.data().cliente,
          data: new Date(doc.data().date).toLocaleDateString(),
          hora: new Date(doc.data().date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          celular: doc.data().phone,
          status: doc.data().status as StatusAgendamento,
        }));
        setAgendamentos(agendamentosList);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();

  }, [user]);

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

  const handleSaveStatus = async (id: string) => {
    if (newStatus) {
      try {
        const agendamentoRef = doc(db, 'agendamentos', id);
        await updateDoc(agendamentoRef, { status: newStatus });
        setAgendamentos(prevAgendamentos =>
          prevAgendamentos.map(agendamento =>
            agendamento.id === id ? { ...agendamento, status: newStatus } : agendamento
          )
        );
        setModalVisible(false);
        setNewStatus(null);
      } catch (error) {
        console.error('Erro ao atualizar o status:', error);
      }
    }
  };

  const AgendamentoItem = ({ item }: { item: Agendamento }) => (
    <View style={AgendadosCss.agendamentoItem}>
      <Text style={AgendadosCss.itemTexto}> Nome: {item.cliente} </Text>
      <Text style={AgendadosCss.itemTexto}> Data: {item.data} </Text>
      <Text style={AgendadosCss.itemTexto}> Hora: {item.hora} </Text>

      {
      /* removendo momentaneamente
      <Text style={AgendadosCss.itemTexto}> Status: {item.status} </Text>
      */}
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

      {/* Ainda não tem a lógica para filtrar os dias.*/}
      <Filtro/>

      <FlatList
        data={agendamentos}
        renderItem={AgendamentoItem}
        keyExtractor={(item) => item.id}
      />

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
                <Text style={AgendadosCss.modalTexto}>Nome: {selectedAgendamento.cliente}</Text>
                <Text style={AgendadosCss.modalTexto}>Data: {selectedAgendamento.data}</Text>
                <Text style={AgendadosCss.modalTexto}>Hora: {selectedAgendamento.hora}</Text>
                <TouchableOpacity onPress={() => handleCallWhatsApp(selectedAgendamento.celular)}>
                  <Text style={AgendadosCss.modalTexto}>Celular: {selectedAgendamento.celular}</Text>
                </TouchableOpacity>


                <Text style={AgendadosCss.modalTexto}>Mudar Status:</Text>
                <Picker selectedValue={newStatus || selectedAgendamento.status} style={AgendadosCss.Picker}
                 onValueChange={(itemValue) => setNewStatus(itemValue as StatusAgendamento)}>

                  <Picker.Item style = {AgendadosCss.PickerTexto} label="Pendente" value={StatusAgendamento.Pendente} />
                  <Picker.Item style = {AgendadosCss.PickerTexto} label="Concluído" value={StatusAgendamento.Confirmado} />
                  <Picker.Item style = {AgendadosCss.PickerTexto} label="Cancelado" value={StatusAgendamento.Cancelado} />

                </Picker>
                <TouchableOpacity style={AgendadosCss.btnStatus} onPress={() => handleSaveStatus(selectedAgendamento.id)}>
                  <Text style={AgendadosCss.btnStatusDetalhes}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AgendadosCss.btnStatus} onPress={() => setModalVisible(false)}>
                  <Text style={AgendadosCss.btnStatusDetalhes}>Fechar</Text>
                </TouchableOpacity>

              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
