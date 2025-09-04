import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Calendar, Users, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { isDark, toggleTheme } = useTheme();
  
  const tabs = [
    { id: 'agendar', label: 'Agendar', icon: Calendar },
    { id: 'barbeiros', label: 'Barbeiros', icon: Users },
    { id: 'agendamentos', label: 'Agendamentos', icon: Scissors }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-xl border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Scissors className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BarberPro
            </h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <nav className="flex space-x-1">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: isActive 
                        ? '0 20px 25px -5px rgba(14, 165, 233, 0.4)' 
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Efeito de brilho */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white opacity-20"
                        initial={{ x: '-100%', skewX: -45 }}
                        animate={{ x: '200%', skewX: -45 }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    {/* Ícone com animação */}
                    <motion.div
                      animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    
                    <span className="hidden sm:inline relative z-10">{tab.label}</span>
                    
                    {/* Indicador ativo */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-6 h-1 bg-white rounded-full"
                        initial={{ scale: 0, x: '-50%' }}
                        animate={{ scale: 1, x: '-50%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Theme Toggle Button Aprimorado */}
            <motion.button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                rotate: isDark ? 180 : -180,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.9 }}
              title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {/* Efeito de fundo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 dark:from-blue-400 dark:to-purple-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Ícones com transição suave */}
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
              
              {/* Partículas de brilho */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    top: '20%',
                    left: '20%',
                  }}
                  animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
