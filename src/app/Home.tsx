import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Imagens from '../imgs/Imagens'
import { Link } from 'expo-router'
import HomeCss from '../css/HomeCss';


export default function Home() {

  return (

    <View style={HomeCss.container}>
      <StatusBar style="light" translucent={true} />

      <View style={HomeCss.nav}>
        <TouchableOpacity onPress={() => console.log("home")}>
          <Text style={HomeCss.navItem}><Link href={"/Home"}>Home</Link></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("agendar")}>
          <Text style={HomeCss.navItem}><Link href={"/Agendar"}>Agendar</Link></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("agendados")}>
          <Text style={HomeCss.navItem}><Link href={'/Agendados'}>Agendados</Link></Text>
        </TouchableOpacity>
      </View>

      <View style={HomeCss.section}>
        <Image source={Imagens.image1} style={HomeCss.Img}/>
        <Text style={HomeCss.title}>Bem-vindo</Text>
        <Text style={HomeCss.subtitle}>
          Agende aqui sua sessão de massagem
        </Text>

        <TouchableOpacity style={HomeCss.button} onPress={() => console.log("agendar agora")}>
          <Text style={HomeCss.buttonText}><Link href={"/Agendar"}>Agendar</Link> </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

