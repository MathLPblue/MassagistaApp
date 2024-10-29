import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

import Imagens from '../imgs/Imagens';
import HomeCss from '../css/HomeCss';
import NavBar from '../components/NavBar';
import UbuntuFonte from '../fonts/UbuntuFont';


export default function Home() {

  const router = useRouter();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectado com sucesso');
        router.push('/Autenticar');
      })
      .catch((error) => {
        console.error('Erro ao desconectar: ', error);
      });
  };

  return (
    <UbuntuFonte>
    <View style={HomeCss.container}>
      <StatusBar style="light" translucent={true} />
      <NavBar/>

      <View style={HomeCss.section}>
        <Image source={Imagens.image1} style={HomeCss.Img}/>
        <Text style={HomeCss.title}>Bem-vindo</Text>
        <Text style={HomeCss.subtitle}>
          Agende aqui sua sessão de massagem
        </Text>

        <TouchableOpacity style={HomeCss.button} onPress={() => console.log("agendar agora")}>
          <Text style={HomeCss.buttonText}><Link href={"/Agendar"}>Agendar</Link></Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeCss.buttonLogout} onPress={handleLogout}>
          <Text style={HomeCss.buttonText}>Encerrar sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
    </UbuntuFonte>
  );
}
