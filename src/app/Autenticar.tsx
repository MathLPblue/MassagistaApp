import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import Home from './Home';
import AutenticarCss from '../css/Autenticar';
import Imagens from '../imgs/Imagens';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import app from '../services/firebaseconfig';


interface AuthScreenProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  handleAuthentication: () => Promise<void>;
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
        <Button title={isLogin ? 'Entrar' : 'Cadastre-se'} onPress={handleAuthentication} color="#F2B3CA" />
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
  const [user, setUser] = useState<any | null>(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState<boolean>(true);

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
      console.error('Erro de autenticação', error);
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
  );
};

export default App;
