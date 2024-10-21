import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Imagens from '../imgs/Imagens';
import { Link, useRouter } from 'expo-router';
import HomeCss from '../css/HomeCss';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { getAuth, signOut } from 'firebase/auth';
import NavBar from '../components/NavBar';

export default function Home() {
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });
  const router = useRouter();
  if (!fontLoaded) {
    return null;
  }


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
  );
}
