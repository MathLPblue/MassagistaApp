export enum StatusAgendamento {
    Pendente = 'Pendente',
    Concluido = 'Concluído',
    Cancelado = 'Cancelado',
  }

export interface Agendamento {
    id: string;
    cliente: string;
    data: string;
    hora: string;
    celular: string;
    status: StatusAgendamento;
  }
