import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock, Zap } from 'lucide-react';
import { horarios } from '../data/mockData';

interface TimeSlotsProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  blockedTimes?: string[];
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ selectedTime, onTimeSelect, blockedTimes = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Horários Disponíveis</h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {horarios.map((horario, index) => {
          const isBlocked = blockedTimes.includes(horario);
          const isSelected = selectedTime === horario;
          
          return (
            <motion.button
              key={horario}
              onClick={() => !isBlocked && onTimeSelect(horario)}
              disabled={isBlocked}
              className={`relative p-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/30'
                  : isBlocked
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 hover:shadow-md'
              }`}
              whileHover={!isBlocked ? { 
                scale: 1.05,
                y: -2,
                boxShadow: isSelected 
                  ? '0 10px 25px rgba(14, 165, 233, 0.4)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.1)'
              } : {}}
              whileTap={!isBlocked ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              {/* Efeito de ripple para seleção */}
              <motion.div
                className="absolute inset-0 bg-white opacity-20 rounded-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={!isBlocked ? { scale: 2, opacity: 0.3 } : {}}
                transition={{ duration: 0.3 }}
              />

              {/* Brilho para horário selecionado */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: '-100%', skewX: -45 }}
                  animate={{ x: '200%', skewX: -45 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Ícone de bloqueado */}
              {isBlocked && (
                <motion.div
                  className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <Lock className="w-2 h-2 text-white" />
                </motion.div>
              )}

              {/* Ícone de selecionado */}
              {isSelected && (
                <motion.div
                  className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-2 h-2 text-primary-600" />
                </motion.div>
              )}

              <span className="relative z-10">{horario}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;
