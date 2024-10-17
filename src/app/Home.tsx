import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Imagens from '../imgs/Imagens';
import { Link, useRouter } from 'expo-router';
import HomeCss from '../css/HomeCss';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { getAuth, signOut } from 'firebase/auth';

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
          <Text style={HomeCss.buttonText}><Link href={"/Agendar"}>Agendar</Link></Text>
        </TouchableOpacity>

        <TouchableOpacity style={HomeCss.buttonLogout} onPress={handleLogout}>
          <Text style={HomeCss.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
