import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import AgendarCss from '../css/AgendarCss';
import app from '../services/firebaseconfig';
import Imagens from '../imgs/Imagens';
import NavBar from '../components/NavBar';
import UbuntuFonte from '../fonts/UbuntuFont';

const db = getFirestore(app);
const auth = getAuth(app);

export default function ScheduleScreen() {
  const [cliente, setCliente] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();
  const celularValido = (phone: string) => {
    const limpaCaracter = phone.replace(/\D/g, '');
    return limpaCaracter.length === 11;
  };
  const validateFields = () => {
    if (!cliente.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome.');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu celular.');
      return false;
    }
    if (!celularValido(phone)) {
      Alert.alert('Erro', 'Por favor, digite um celular incluindo o DDD.');
      return false;
    }
    return true;
  };



  const onDateChange = (selectedDate: Date | null) => {
    setShowDatePicker(false);
    if (selectedDate && isValidDate(selectedDate)) {
      setDate(selectedDate);
    } else {
      Alert.alert('Erro', 'Por favor, escolha uma data e hora entre 09:00 e 20:00.');
    }
  };

  const isValidDate = (selectedDate: Date) => {
    const now = new Date();

    if (selectedDate < now) {
      Alert.alert('Erro', 'A data e hora não podem ser no passado.');
      return false;
    }
    const selectedHour = selectedDate.getHours();

    if (selectedHour < 9 || selectedHour >= 20) {
      Alert.alert('Erro', 'Por favor, escolha um horário entre 09:00 e 20:00');
      return false;
    }
    return true;
  };


  const handleSchedule = async () => {
    const user = auth.currentUser;
    const userEmail = user?.email;
    if (validateFields()) {
      try {
        await addDoc(collection(db, 'agendamentos'), {
          cliente,
          phone,
          date: date ? date.toISOString() : '',
          createdAt: new Date(),
          email: userEmail,
          status: 'Pendente'
        });
        Alert.alert('Agendamento Confirmado', `Agendado para: ${date?.toLocaleString()}\nNome: ${cliente}\nTelefone: ${phone}`);
        setCliente('');
        setPhone('');
        setDate(null);
      } catch (error) {
        console.error('Erro ao agendar:', error);
        Alert.alert('Erro', 'Houve um problema ao realizar o agendamento. Tente novamente.');
      }
    }
  };

  return (
        //https://stackoverflow.com/questions/49399114/react-native-change-opacity-colour-of-imagebackground

      <UbuntuFonte>
      <ImageBackground source={Imagens.backgroundImage} imageStyle = {{opacity:0.25}} style={AgendarCss.container}>
      <NavBar/>
      <ScrollView contentContainerStyle={AgendarCss.container}>
        <View style={AgendarCss.ContainerTitulo}>
          <Text style={AgendarCss.title}>Agende a sua massagem</Text>
        </View>

        <Text style={AgendarCss.label}>Nome:</Text>
        <TextInput
          style={AgendarCss.input}
          value={cliente}
          onChangeText={setCliente}
          placeholder="Digite seu nome"
        />

        <Text style={AgendarCss.label}>Telefone:</Text>
        <TextInput
          style={AgendarCss.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Digite seu telefone"
        />

        <TouchableOpacity style={AgendarCss.btnDataHora} onPress={() => setShowDatePicker(true)}>
          <Text style={AgendarCss.btnConfrimaDetalhes}>Escolha a data e hora da massagem</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="datetime"
          onConfirm={onDateChange}
          onCancel={() => setShowDatePicker(false)}
        />

        {date && (
          <Text style={AgendarCss.dateText}>Data e Hora escolhidas: {"\n"} {date.toLocaleString()}</Text>
        )}

        <TouchableOpacity style={AgendarCss.btnConfirma} onPress={handleSchedule}>
          <Text style={AgendarCss.btnConfrimaDetalhes}>Confirmar Agendamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={AgendarCss.backButton} onPress={() => navigation.goBack()}>
          <Text style={AgendarCss.btnConfrimaDetalhes}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
    </UbuntuFonte>
  );
}
