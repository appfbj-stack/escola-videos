import { faker } from '@faker-js/faker/locale/pt_BR';
import { Barbeiro, Servico, Agendamento } from '../types';

// Configurar faker para português brasileiro
faker.locale = 'pt_BR';

export const barbeiros: Barbeiro[] = [
  {
    id: '1',
    nome: 'Carlos Silva',
    especialidades: ['Corte Clássico', 'Barba', 'Degradê'],
    avaliacoes: 4.9,
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'João Santos',
    especialidades: ['Fade', 'Barba', 'Sobrancelha'],
    avaliacoes: 4.8,
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Miguel Costa',
    especialidades: ['Corte Moderno', 'Nevou', 'Platinado'],
    avaliacoes: 4.7,
    foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    disponivel: false,
  },
  {
    id: '4',
    nome: 'Rafael Oliveira',
    especialidades: ['Social', 'Degradê', 'Barba Desenhada'],
    avaliacoes: 4.9,
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    disponivel: true,
  }
];

export const servicos: Servico[] = [
  {
    id: '1',
    nome: 'Corte Social',
    preco: 25,
    duracao: 30,
    descricao: 'Corte clássico e elegante para o dia a dia'
  },
  {
    id: '2',
    nome: 'Degradê/Fade',
    preco: 30,
    duracao: 45,
    descricao: 'Corte moderno com degradê nas laterais'
  },
  {
    id: '3',
    nome: 'Barba Completa',
    preco: 20,
    duracao: 25,
    descricao: 'Aparar e desenhar a barba'
  },
  {
    id: '4',
    nome: 'Corte + Barba',
    preco: 40,
    duracao: 60,
    descricao: 'Pacote completo: corte de cabelo e barba'
  },
  {
    id: '5',
    nome: 'Sobrancelha',
    preco: 15,
    duracao: 15,
    descricao: 'Aparar e desenhar as sobrancelhas'
  },
  {
    id: '6',
    nome: 'Nevou',
    preco: 35,
    duracao: 50,
    descricao: 'Procedimento para cabelos grisalhos'
  }
];

export const horarios: string[] = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

export const agendamentos: Agendamento[] = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  barbeiroId: faker.helpers.arrayElement(barbeiros).id,
  servicoId: faker.helpers.arrayElement(servicos).id,
  data: faker.date.between({ from: new Date(), to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }),
  hora: faker.helpers.arrayElement(horarios),
  clienteNome: faker.person.fullName(),
  clienteTelefone: faker.phone.number(),
  status: faker.helpers.arrayElement(['agendado', 'concluido', 'cancelado'] as const)
}));
