import React from 'react';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

const UbuntuFonte: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return <>{children}</>;
  
};

export default UbuntuFonte;
