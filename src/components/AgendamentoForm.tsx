import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Calendar, Clock, Scissors, CheckCircle, X, Sparkles } from 'lucide-react';
import { Barbeiro, Servico } from '../types';

interface AgendamentoFormProps {
  barbeiro: Barbeiro;
  servico: Servico;
  data: Date;
  hora: string;
  onConfirm: (dados: { nome: string; telefone: string }) => void;
  onCancel: () => void;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({
  barbeiro,
  servico,
  data,
  hora,
  onConfirm,
  onCancel
}) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && telefone.trim()) {
      onConfirm({ nome: nome.trim(), telefone: telefone.trim() });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300 relative overflow-hidden"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Efeitos de background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 opacity-10 rounded-full blur-xl" />

        {/* Botão de fechar */}
        <motion.button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.button>

        <div className="text-center mb-6 relative z-10">
          <motion.div 
            className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Efeito de brilho */}
            <motion.div
              className="absolute inset-0 bg-white opacity-30"
              initial={{ x: '-100%', skewX: -45 }}
              animate={{ x: '200%', skewX: -45 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
            <CheckCircle className="w-8 h-8 text-white relative z-10" />
            
            {/* Partículas de celebração */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, (i % 2 ? 30 : -30)],
                  y: [0, (i % 3 ? -30 : 30)],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatDelay: 3
                }}
              />
            ))}
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Confirmar Agendamento
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Finalize os dados do seu agendamento
          </motion.p>
        </div>

        {/* Resumo do agendamento */}
        <motion.div 
          className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 rounded-xl p-4 mb-6 space-y-3 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <Scissors className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="font-medium text-gray-900 dark:text-white">{servico.nome}</span>
            <span className="text-green-600 dark:text-green-400 font-bold">R$ {servico.preco.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-700 dark:text-gray-200">{barbeiro.nome}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-700 dark:text-gray-200">{data.toLocaleDateString('pt-BR')}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-700 dark:text-gray-200">{hora}</span>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Digite seu nome completo"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="(11) 99999-9999"
              required
            />
          </motion.div>

          <motion.div 
            className="flex space-x-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gray-200 dark:bg-gray-600 opacity-0 group-hover:opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Cancelar</span>
            </motion.button>
            
            <motion.button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 transform relative overflow-hidden group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 25px rgba(14, 165, 233, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Efeito de brilho */}
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                initial={{ x: '-100%', skewX: -45 }}
                whileHover={{ x: '200%', skewX: -45 }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Confirmar</span>
              </span>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AgendamentoForm;
