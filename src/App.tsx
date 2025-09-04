import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import BarbeiroCard from './components/BarbeiroCard';
import ServicoCard from './components/ServicoCard';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import AgendamentoForm from './components/AgendamentoForm';
import AgendamentosList from './components/AgendamentosList';
import { barbeiros, servicos, agendamentos } from './data/mockData';
import { Barbeiro, Servico } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState('agendar');
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<Barbeiro | null>(null);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentAgendamentos, setCurrentAgendamentos] = useState(agendamentos);

  const handleConfirmAgendamento = (dados: { nome: string; telefone: string }) => {
    if (selectedBarbeiro && selectedServico && selectedTime) {
      const novoAgendamento = {
        id: Date.now().toString(),
        barbeiroId: selectedBarbeiro.id,
        servicoId: selectedServico.id,
        data: selectedDate,
        hora: selectedTime,
        clienteNome: dados.nome,
        clienteTelefone: dados.telefone,
        status: 'agendado' as const
      };

      setCurrentAgendamentos(prev => [...prev, novoAgendamento]);
      setShowForm(false);
      setSelectedBarbeiro(null);
      setSelectedServico(null);
      setSelectedTime('');
      setActiveTab('agendamentos');
    }
  };

  const resetAgendamento = () => {
    setSelectedBarbeiro(null);
    setSelectedServico(null);
    setSelectedTime('');
    setShowForm(false);
  };

  const canProceed = selectedBarbeiro && selectedServico && selectedTime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'agendar' && (
            <motion.div
              key="agendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header da seção */}
              <div className="text-center">
                <motion.h2 
                  className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Agende seu Horário
                </motion.h2>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Escolha o barbeiro, serviço e horário perfeito para você
                </motion.p>
              </div>

              {/* Seleção de Barbeiro */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  1. Escolha o Barbeiro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {barbeiros.map((barbeiro, index) => (
                    <motion.div
                      key={barbeiro.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <BarbeiroCard
                        barbeiro={barbeiro}
                        selected={selectedBarbeiro?.id === barbeiro.id}
                        onSelect={() => setSelectedBarbeiro(barbeiro)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Seleção de Serviço */}
              {selectedBarbeiro && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    2. Escolha o Serviço
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicos.map((servico, index) => (
                      <motion.div
                        key={servico.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ServicoCard
                          servico={servico}
                          selected={selectedServico?.id === servico.id}
                          onSelect={() => setSelectedServico(servico)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Seleção de Data e Hora */}
              {selectedBarbeiro && selectedServico && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      3. Escolha a Data
                    </h3>
                    <Calendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      4. Escolha o Horário
                    </h3>
                    <TimeSlots
                      selectedTime={selectedTime}
                      onTimeSelect={setSelectedTime}
                      blockedTimes={['10:00', '14:30', '16:00']}
                    />
                  </div>
                </motion.section>
              )}

              {/* Botão de Confirmação */}
              {canProceed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center pt-8"
                >
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Confirmar Agendamento
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'barbeiros' && (
            <motion.div
              key="barbeiros"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Nossos Barbeiros
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Conheça nossa equipe de profissionais especializados
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {barbeiros.map((barbeiro, index) => (
                  <motion.div
                    key={barbeiro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BarbeiroCard barbeiro={barbeiro} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'agendamentos' && (
            <motion.div
              key="agendamentos"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Agendamentos
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Visualize todos os agendamentos da barbearia
                </p>
              </div>

              <AgendamentosList agendamentos={currentAgendamentos} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal do formulário */}
        <AnimatePresence>
          {showForm && selectedBarbeiro && selectedServico && (
            <AgendamentoForm
              barbeiro={selectedBarbeiro}
              servico={selectedServico}
              data={selectedDate}
              hora={selectedTime}
              onConfirm={handleConfirmAgendamento}
              onCancel={() => setShowForm(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
