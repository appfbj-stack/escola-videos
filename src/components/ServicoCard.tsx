import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign } from 'lucide-react';
import { Servico } from '../types';

interface ServicoCardProps {
  servico: Servico;
  onSelect?: () => void;
  selected?: boolean;
}

const ServicoCard: React.FC<ServicoCardProps> = ({ servico, onSelect, selected }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
        selected 
          ? 'border-purple-500 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 dark:shadow-purple-500/20' 
          : 'border-transparent hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-xl dark:hover:shadow-2xl'
      }`}
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{servico.nome}</h3>
        <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 font-bold">
          <DollarSign className="w-4 h-4" />
          <span>R$ {servico.preco.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
        {servico.descricao}
      </p>

      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>{servico.duracao} min</span>
      </div>
    </motion.div>
  );
};

export default ServicoCard;
