import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ScheduleScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Função chamada quando o usuário seleciona uma data
  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false); // Esconde o DateTimePicker ao selecionar a data
    if (selectedDate) {
      setDate(selectedDate); // Atualiza a data somente se o usuário selecionou uma
    }
  };

  // Função chamada ao confirmar o agendamento
  const handleSchedule = () => {
    alert(`Agendado para: ${date.toLocaleString()}\nNome: ${name}\nTelefone: ${phone}`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Agende sua massagem</Text>
      <Text>Nome:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />
      <Text>Telefone:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Digite seu telefone"
      />

      <Button title="Escolher Data e Hora" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onDateChange} // Remove o onCancel
        />
      )}

      <Text style={{ marginVertical: 16 }}>
        Data e Hora escolhidas: {date.toLocaleString()}
      </Text>

      <Button title="Confirmar Agendamento" onPress={handleSchedule} />
    </ScrollView>
  );
}
