import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native'; // Navegação para voltar

export default function ScheduleScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation(); // Usado para navegar de volta

  const onDateChange = (selectedDate: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      // Verifica se a data/hora selecionada é válida
      if (!isValidDate(selectedDate)) {
        Alert.alert('Erro', 'Por favor, escolha uma data e hora entre 09:00 e 20:00.');
        return;
      }
      setDate(selectedDate);
    }
  };

  const isValidDate = (selectedDate: Date) => {
    const now = new Date();

    // Verifica se a data é no futuro
    if (selectedDate < now) {
      Alert.alert('Erro', 'A data e hora não podem ser no passado.');
      return false;
    }

    // Verifica se a hora está entre 09:00 e 20:00
    const selectedHour = selectedDate.getHours();
    return selectedHour >= 9 && selectedHour < 20; // 20:00 é 19:59 na validação
  };

  const validateFields = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome.');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu telefone.');
      return false;
    }
    return true;
  };

  const handleSchedule = () => {
    if (validateFields()) {
      Alert.alert(
        'Agendamento Confirmado',
        `Agendado para: ${date.toLocaleString()}\nNome: ${name}\nTelefone: ${phone}`
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agende a sua massagem</Text>
      
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />
      
      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Digite seu telefone"
      />

      <Button
        title="Escolher Data e Hora"
        onPress={() => setShowDatePicker(true)}
        accessibilityLabel="Escolha a data e hora do agendamento"
      />

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={onDateChange}
        onCancel={() => setShowDatePicker(false)}
      />

      <Text style={styles.dateText}>
        Data e Hora escolhidas: {date.toLocaleString()}
      </Text>

      <Button
        title="Confirmar Agendamento"
        onPress={handleSchedule}
        accessibilityLabel="Confirme seu agendamento"
      />

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center', // Certifica-se de que o conteúdo esteja centralizado
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 4,
    fontSize: 16,
  },
  dateText: {
    marginVertical: 16,
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'pink', // Define a cor rosa para o botão
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Centraliza o texto dentro do botão
    marginTop: 20,
    alignSelf: 'center', // Centraliza o botão na horizontal
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
