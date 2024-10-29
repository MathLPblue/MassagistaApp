import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { db } from '../services/firebaseconfig';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import TodosAgendadosCss from '../css/TodosAgendadosCss';
import AgendamentoItem from './AgendamentoItem';
import AgendamentoModal from './AgendamentoModal';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Linking } from 'react-native';

export enum StatusAgendamento {
  Pendente = 'Pendente',
  Cancelado = 'Cancelado',
  Concluido = 'Concluído'
}

export interface Agendamento {
  id: string;
  cliente: string;
  data: string;
  hora: string;
  celular: string;
  status: StatusAgendamento;
}

export default function TodosAgendados() {
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [newStatus, setNewStatus] = useState<StatusAgendamento | null>(null);
  const [pesquisarItem, setpesquisarItem] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const agendamentosCollection = collection(db, 'agendamentos');
        let agendamentosQuery = query(agendamentosCollection);
        if (user) {
          const userEmail = user.email;
          const usersCollection = collection(db, 'users');
          const usersQuery = query(usersCollection, where('email', '==', userEmail));
          const usersSnapshot = await getDocs(usersQuery);
          const userDoc = usersSnapshot.docs[0];

          if (userDoc) {
            const role = userDoc.data().role;
            agendamentosQuery = role === 'cliente'
              ? query(agendamentosCollection, where('email', '==', userEmail))
              : agendamentosCollection;
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

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.cliente.toLowerCase().includes(pesquisarItem.toLowerCase()) ||
    agendamento.celular.includes(pesquisarItem)
  );

  return (
    <View style={TodosAgendadosCss.container}>
      <StatusBar style="light" translucent={true} />
      <View style={TodosAgendadosCss.nav}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={TodosAgendadosCss.navItem}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={TodosAgendadosCss.pesquisarInput}
        placeholder="Pesquisar por nome ou celular"
        value={pesquisarItem}
        onChangeText={setpesquisarItem}
      />

      <FlatList
        data={filteredAgendamentos}
        renderItem={({ item }) => (
          <AgendamentoItem item={item} onSchedule={handleSchedule} />
        )}
        keyExtractor={item => item.id}
      />
      <AgendamentoModal
        visible={modalVisible}
        agendamento={selectedAgendamento}
        onClose={() => setModalVisible(false)}
        onCall={handleCallWhatsApp}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onSaveStatus={handleSaveStatus}
      />
    </View>
  );
}
