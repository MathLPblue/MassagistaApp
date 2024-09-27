import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import Imagens from '../imgs/Imagens'
import { Link } from 'expo-router'
export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => console.log("home")}>
          <Text style={styles.navItem}><Link href={"/Home"}>Home</Link></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("agendar")}>
          <Text style={styles.navItem}>Agendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("agendados")}>
          <Text style={styles.navItem}>Agendados</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Image source={Imagens.image1} style={styles.Img}/>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Agende aqui sua sessão de massagem
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => console.log("agendar agora")}>
          <Text style={styles.buttonText}>Agendar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: 'lightGrey',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#33afff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: Constants.statusBarHeight + 10, 
  },
  navItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001e3a',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#515151',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  Img:{
    width: 300, 
    height: 300, 
    marginBottom: 20, 
    borderRadius: 40, 
    

  }
});