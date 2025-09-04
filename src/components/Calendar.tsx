import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const today = new Date();
  const startWeek = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startWeek, i));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Selecione a Data</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </motion.button>
          
          <motion.span 
            className="font-medium text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {format(today, 'MMMM yyyy', { locale: ptBR })}
          </motion.span>
          
          <motion.button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {weekDays.map((day, index) => {
          const isSelectedDay = isSameDay(day, selectedDate);
          const isTodayDay = isToday(day);
          
          return (
            <motion.button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`relative p-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden group ${
                isSelectedDay
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/30'
                  : isTodayDay
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                boxShadow: isSelectedDay 
                  ? '0 10px 25px rgba(14, 165, 233, 0.4)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {/* Efeito de ripple */}
              <motion.div
                className="absolute inset-0 bg-white opacity-20 rounded-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Brilho para dia selecionado */}
              {isSelectedDay && (
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: '-100%', skewX: -45 }}
                  animate={{ x: '200%', skewX: -45 }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              <span className="relative z-10">{format(day, 'd')}</span>
              
              {/* Indicador para hoje */}
              {isTodayDay && !isSelectedDay && (
                <motion.div
                  className="absolute bottom-1 left-1/2 w-1 h-1 bg-blue-500 rounded-full"
                  initial={{ scale: 0, x: '-50%' }}
                  animate={{ scale: 1, x: '-50%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
