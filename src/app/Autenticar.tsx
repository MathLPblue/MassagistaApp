import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import Home from './Home';
import AutenticarCss from '../css/Autenticar';
import Imagens from '../imgs/Imagens';
import app from '../services/firebaseconfig';
import UbuntuFonte from '../fonts/UbuntuFont';


interface AuthScreenProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  handleAuthentication: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={AutenticarCss.authContainer}>
      <View style={AutenticarCss.ImgContainer}>
        <Image source={Imagens.image1} style={AutenticarCss.logo} />
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
        <TouchableOpacity onPress={handleAuthentication} style={AutenticarCss.btnLogin}>
            <Text style={AutenticarCss.btnTexto}>
                {isLogin ? 'Entrar' : 'Cadastre-se'}
            </Text>
        </TouchableOpacity>
      </View>

      <View style={AutenticarCss.bottomContainer}>
        <Text style={AutenticarCss.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Precisa de uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
        </Text>
      </View>
    </View>
  );
};

const AuthenticatedScreen: React.FC<{ user: any; handleAuthentication: () => Promise<void> }> = ({ user, handleAuthentication }) => {
  return <Home />;
};

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

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

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          await setDoc(doc(db, 'users', user.uid), {
            email: email,
            role: 'cliente',
            createdAt: new Date(),
          });

          console.log('Usuário criado com sucesso!');
        }
      }
    } catch (error) {
      setErrorMessage('Erro de autenticação. Verifique suas credenciais.');
      console.error('Erro de autenticação', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <UbuntuFonte>
    <ScrollView contentContainerStyle={AutenticarCss.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
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
    </UbuntuFonte>
  );
};

export default App;
