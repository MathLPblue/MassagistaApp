import React, { useState, useEffect } from 'react';
import {Image, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import Home from './Home'
import AutenticarCss from '../css/Autenticar'
import Imagens from '../imgs/Imagens'
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold} from '@expo-google-fonts/ubuntu'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZ4sA-UKJFGFs71-s8OBFHMMoZKwSWvI",
  authDomain: "massagem-do-marlon.firebaseapp.com",
  projectId: "massagem-do-marlon",
  storageBucket: "massagem-do-marlon.appspot.com",
  messagingSenderId: "332265225627",
  appId: "1:332265225627:web:1e5f5c012308e5ae26353e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={AutenticarCss.authContainer}>
      <View style={AutenticarCss.ImgContainer}>
        <Image source={Imagens.image1} style={AutenticarCss.logo}/>
      </View>
       <Text style={AutenticarCss.title}>{isLogin ? 'Fazer Login' : 'Criar conta'}</Text>

       <TextInput
        style={AutenticarCss.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={AutenticarCss.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />
      <View style={AutenticarCss.buttonContainer}>
        <Button title={isLogin ? 'Entrar' : 'Cadastre-se'} onPress={handleAuthentication} color="#F2B3CA" />
        {/* 
        #3498db cor antiga do btn entrar
        
        
        */}
      </View>

      <View style={AutenticarCss.bottomContainer}>
        <Text style={AutenticarCss.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Precisa de uma conta? Sign Up' : 'Já tem uma conta? Sign In'}
        </Text>
      </View>
    </View>
  );
}


const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <Home/>
  );
};
export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('Usuário deslogou com sucesso!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Usuário logou com sucesso!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('Usuário criado com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro de autenticação', error.message);
    }
  };
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <ScrollView contentContainerStyle={AutenticarCss.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}
