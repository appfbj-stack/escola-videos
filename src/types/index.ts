export interface Barbeiro {
  id: string;
  nome: string;
  especialidades: string[];
  avaliacoes: number;
  foto: string;
  disponivel: boolean;
}

export interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: number; // em minutos
  descricao: string;
}

export interface Agendamento {
  id: string;
  barbeiroId: string;
  servicoId: string;
  data: Date;
  hora: string;
  clienteNome: string;
  clienteTelefone: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

export interface TimeSlot {
  hora: string;
  disponivel: boolean;
}
