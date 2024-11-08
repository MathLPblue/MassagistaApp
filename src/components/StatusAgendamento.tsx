import { View, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

import AgendadosCss from "../css/AgendadosCss";
import { StatusAgendamento } from "../interfaces/AgendamentoTypes";

const StatusIndicador = (status: StatusAgendamento) => {
    const iconMap = {
        [StatusAgendamento.Pendente]: { icon: <AntDesign name="clockcircleo" size={24} color="blue" />, label: "Pendente", color: "blue" },
        [StatusAgendamento.Concluido]: { icon: <AntDesign name="checkcircleo" size={24} color="green" />, label: "Concluído", color: "green" },
        [StatusAgendamento.Cancelado]: { icon: <AntDesign name="closecircleo" size={24} color="red" />, label: "Cancelado", color: "red" },
    };

    const { icon, label, color } = iconMap[status] || { icon: null, label: "", color: "black" };

    return (
        <View style={AgendadosCss.StatusIndicador}>
            {icon}
            {label ? <Text style={[AgendadosCss.statusTexto, { color }]}>{label}</Text> : null}
        </View>
    );
};

export default StatusIndicador;
