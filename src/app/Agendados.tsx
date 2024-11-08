import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Linking, TouchableOpacity, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Link } from 'expo-router';

import { db } from '../services/firebaseconfig';
import AgendadosCss from '../css/AgendadosCss';
import Filtro from '../components/filtroDia';
import NavBar from '../components/NavBar';
import AgendamentoModal from '../components/AgendamentoModal';
import AgendamentosLista from '../components/AgendamentoLista';
import { Agendamento, StatusAgendamento } from '../interfaces/AgendamentoTypes';
import UbuntuFonte from '../fonts/UbuntuFont';


export default function Agendados() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [filtradoAgendamentos, setFiltradoAgendamentos] = useState<Agendamento[]>([]);
  const [newStatus, setNewStatus] = useState<StatusAgendamento | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchAgendamentos = async () => {
      if (!selectedDay) return;

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

        const filtrado = agendamentosList.filter(agendamento => agendamento.data === selectedDay);
        setFiltradoAgendamentos(filtrado);
        setAgendamentos(agendamentosList);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, [selectedDay, user]);

  const filterByDay = (day: string | null) => {
    if (day === null){
        setSelectedDay(null);
        setFiltradoAgendamentos([]);
    } else{
        setSelectedDay(day);
        const filtrado = agendamentos.filter(agendamento => agendamento.data === day);
        setFiltradoAgendamentos(filtrado);
    }
  };

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

  return (
    <UbuntuFonte>
    <View style={AgendadosCss.container}>
      <StatusBar style="light" translucent={true} />

      <NavBar/>

      <Filtro onSelectDay={filterByDay} />

      <AgendamentosLista
      data={filtradoAgendamentos}
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

      <TouchableOpacity style={AgendadosCss.btnTodosAgendados} onPress={() => console.log('Todos os agendados')}>
        <Text style={AgendadosCss.btnTodosAgendadosTexto}>
          <Link href="/TodosAgendados">Todos os agendados</Link>
        </Text>
      </TouchableOpacity>
    </View>
    </UbuntuFonte>
  );
}
