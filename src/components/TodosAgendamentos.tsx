import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { db } from '../services/firebaseconfig';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Link } from 'expo-router';

import TodosAgendadosCss from '../css/TodosAgendadosCss';
import AgendamentoModal from './AgendamentoModal';
import AgendamentosLista from '../components/AgendamentoLista';
import { Agendamento, StatusAgendamento } from '../interfaces/AgendamentoTypes';
import UbuntuFonte from '../fonts/UbuntuFont';

export default function TodosAgendados() {

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
    <UbuntuFonte>
    <View style={TodosAgendadosCss.container}>
      <StatusBar style="light" translucent={true} />
      <View style={TodosAgendadosCss.nav}>
        <TouchableOpacity onPress={() => console.log('Todos os agendados')}>
          <Text style={TodosAgendadosCss.navItem}><Link href='/Agendados'>Voltar</Link></Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={TodosAgendadosCss.pesquisarInput}
        placeholder="Pesquisar por nome ou celular"
        value={pesquisarItem}
        onChangeText={setpesquisarItem}
      />

      <AgendamentosLista
      data={filteredAgendamentos}
      onSchedule={handleSchedule}
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
    </UbuntuFonte>
  );
}
