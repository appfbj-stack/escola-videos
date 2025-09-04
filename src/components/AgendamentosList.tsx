import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Scissors, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Agendamento } from '../types';
import { barbeiros, servicos } from '../data/mockData';

interface AgendamentosListProps {
  agendamentos: Agendamento[];
}

const AgendamentosList: React.FC<AgendamentosListProps> = ({ agendamentos }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'concluido':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelado':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'concluido':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'cancelado':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'Agendado';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-4">
      {agendamentos.map((agendamento, index) => {
        const barbeiro = barbeiros.find(b => b.id === agendamento.barbeiroId);
        const servico = servicos.find(s => s.id === agendamento.servicoId);

        return (
          <motion.div
            key={agendamento.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(agendamento.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {agendamento.clienteNome}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agendamento.status)}`}>
                    {getStatusLabel(agendamento.status)}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {agendamento.data.toLocaleDateString('pt-BR')}
                </div>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {agendamento.hora}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Barbeiro:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{barbeiro?.nome}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Scissors className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Serviço:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{servico?.nome}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Telefone:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{agendamento.clienteTelefone}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Duração:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{servico?.duracao} min</span>
                </div>
              </div>
            </div>

            {servico && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Valor do serviço:</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    R$ {servico.preco.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default AgendamentosList;
