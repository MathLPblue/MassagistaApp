import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Button  } from 'react-native';
import Imagens from '../imgs/Imagens'
import { Link } from 'expo-router'
import AgendadosCss from '../css/AgendadosCss';

const exemploAgendamento = [
  {id:'1', cliente:'Alexandre', data: '11/09/2001', hora:'15:15'},
  {id:'2', cliente:'Elias', data: '22/10/2021', hora:'19:00'},
  {id:'2', cliente:'Matheus', data: '20/07/2024', hora:'09:30'},
  
]

 /*  Assim que o firebase estiver carregando os agendamentos, pretendo colocar uma lógica que pegue 
     os Agendamentos mais próximos de serem realizados:
     exemplo, caso seja dia 10/10 ás 15:30, e tenha dois agendamentos, um para o dia 11/10 as 10:10h e um 10/10 16:00
     ele mostre primeiro o agendamento do dia 10/10 16:00 pois está mais próximo
     */

export default function Agendados() {

  const Agendamento = ({ item }) => (
    <View style={AgendadosCss.agendamentoItem}>

      <Text style={AgendadosCss.itemTexto}> Cliente: {item.cliente} </Text>
      <Text style={AgendadosCss.itemTexto}> Data: {item.data} </Text>
      <Text style={AgendadosCss.itemTexto}> Hora: {item.hora} </Text>
      
    </View>
  )

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

      <FlatList data = {exemploAgendamento} renderItem = {Agendamento} keyExtractor = {(item) => item.id} />


    </View>
  );
}

