import { Link } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import AgendadosCss from "../css/AgendadosCss";

const NavBar = () => {
  return (
    <View style={AgendadosCss.nav}>
      <TouchableOpacity onPress={() => console.log('home')}>
        <Text style={AgendadosCss.navItem}>
          <Link href="/Home">Home</Link>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('agendar')}>
        <Text style={AgendadosCss.navItem}>
          <Link href="/Agendar">Agendar</Link>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('agendados')}>
        <Text style={AgendadosCss.navItem}>
          <Link href="/Agendados">Agendados</Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
