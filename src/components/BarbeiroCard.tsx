import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, CheckCircle, XCircle, Zap } from 'lucide-react';
import { Barbeiro } from '../types';

interface BarbeiroCardProps {
  barbeiro: Barbeiro;
  onSelect?: () => void;
  selected?: boolean;
}

const BarbeiroCard: React.FC<BarbeiroCardProps> = ({ barbeiro, onSelect, selected }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 relative overflow-hidden group ${
        selected 
          ? 'border-primary-500 shadow-2xl dark:shadow-primary-500/20 scale-105' 
          : 'border-transparent hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-xl dark:hover:shadow-2xl'
      }`}
      onClick={onSelect}
      whileHover={{ 
        scale: selected ? 1.05 : 1.02, 
        y: -5,
        boxShadow: selected 
          ? '0 25px 50px -12px rgba(14, 165, 233, 0.4)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Efeito de brilho no background */}
      {selected && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Efeito de hover no background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />

      <div className="flex items-center space-x-4 mb-4 relative z-10">
        <div className="relative">
          <motion.img
            src={barbeiro.foto}
            alt={barbeiro.nome}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Status indicator com animação */}
          <motion.div 
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
              barbeiro.disponivel ? 'bg-green-500' : 'bg-red-500'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.2 }}
          >
            {barbeiro.disponivel ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <XCircle className="w-4 h-4 text-white" />
            )}
          </motion.div>

          {/* Pulse animation para disponível */}
          {barbeiro.disponivel && (
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{barbeiro.nome}</h3>
          <div className="flex items-center space-x-1 mt-1">
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{barbeiro.avaliacoes.toFixed(1)}</span>
            </motion.div>
            
            <motion.span 
              className={`ml-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                barbeiro.disponivel 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {barbeiro.disponivel ? 'Disponível' : 'Ocupado'}
            </motion.span>
          </div>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          <span>Especialidades:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {barbeiro.especialidades.map((especialidade, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 8px rgba(14, 165, 233, 0.3)'
              }}
            >
              {especialidade}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Botão de seleção animado */}
      {onSelect && (
        <motion.div
          className="absolute top-2 right-2 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BarbeiroCard;
