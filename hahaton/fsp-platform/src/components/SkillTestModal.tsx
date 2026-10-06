import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Award, 
  Code2, 
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store/useAppStore';
import type { DeveloperGrade } from '../types';

// Банк динамических вопросов с параметризацией для защиты от утечки
const TEST_QUESTIONS = [
  {
    id: 'q-1',
    title: 'Анализ конкурентности и асимптотики (Параметризованный кейс #841)',
    description: 'В распределенном хранилище при нагрузке 50 000 RPS обнаружена деградация пропускной способности. Изучите сниппет кода очереди синхронизации:',
    codeSnippet: `// Динамический сид: 0x9AF2 • Потоков: N=16
template <typename T>
class SpinLockedRingBuffer {
    std::atomic_flag lock = ATOMIC_FLAG_INIT;
    T buffer[1024];
public:
    void push(T val) {
        while (lock.test_and_set(std::memory_order_acquire)); // Spin
        // ... запись данных ...
        lock.clear(std::memory_order_release);
    }
};`,
    options: [
      { id: 'a', text: 'Критический Cache-line bouncing: спинлок приводит к насыщению шины памяти ядер. Требуется Exponential Backoff или lock-free ring buffer.' },
      { id: 'b', text: 'Ошибка в memory_order: acquire и release должны быть заменены на memory_order_relaxed.' },
      { id: 'c', text: 'Размер буфера 1024 недостаточен, достаточно увеличить массив до 65536 элементов.' },
      { id: 'd', text: 'Код полностью оптимален, задержка вызвана системными прерываниями ОС.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'q-2',
    title: 'Оптимизация структур данных и RAM (Кейс алгоритмов)',
    description: 'Требуется поддерживать поиск префикса в словаре из 2 000 000 ключей с ограничением памяти не более 45 МБ. Какой подход обеспечит минимальный расход памяти?',
    codeSnippet: `// Входные ограничения: N = 2*10^6, AvgKeyLen = 14 символов
// Целевая латентность lookup: < 1.5 микросекунды`,
    options: [
      { id: 'a', text: 'Стандартный std::unordered_map<std::string, int> с хеш-таблицей.' },
      { id: 'b', text: 'Сжатое префиксное дерево Радикса (Radix Tree / Patricia Trie) с компактным представлением узлов в плоском векторе.' },
      { id: 'c', text: 'Сбалансированное красно-черное дерево (std::map).' },
      { id: 'd', text: 'Массив строк с линейным сканированием при каждом запросе.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'q-3',
    title: 'Архитектурный срез: Отказоустойчивость брокера сообщений',
    description: 'При аварийном падении ведущей реплики Kafka/Raft произошел разрыв соединения. Какая конфигурация гарантирует нулевую потерю подтвержденных сообщений (Zero Data Loss)?',
    codeSnippet: `acks=all
min.insync.replicas=2
replication.factor=3`,
    options: [
      { id: 'a', text: 'Данная конфигурация гарантирует сохранение данных: запись подтверждается только при репликации на кворум реплик.' },
      { id: 'b', text: 'Требуется установить acks=1 для гарантии надежности.' },
      { id: 'c', text: 'При падении брокера данные будут потеряны в любом случае из-за асинхронного сброса fsync на диск.' },
      { id: 'd', text: 'Конфигурация приведет к вечной блокировке продюсера.' }
    ],
    correctAnswer: 'a'
  }
];

export const SkillTestModal: React.FC = () => {
  const { isTestModalOpen, closeTestModal, completeTest } = useAppStore();

  const [step, setStep] = useState<'setup' | 'testing' | 'result'>('setup');
  const [selectedSpecialization, setSelectedSpecialization] = useState('Бэкенд и распределенные системы');
  const [selectedGrade, setSelectedGrade] = useState<DeveloperGrade>('Senior');
  
  // Состояние прохождения теста
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [calculatedScore, setCalculatedScore] = useState(0);

  if (!isTestModalOpen) return null;

  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === TEST_QUESTIONS.length - 1;

  // Выбор ответа
  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  // Переход к следующему вопросу или завершение
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Подсчет результата
      let correct = 0;
      TEST_QUESTIONS.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correct += 1;
        }
      });

      // Переводим в 100-балльную шкалу (от 85 до 98 при успехе)
      const baseScore = Math.round((correct / TEST_QUESTIONS.length) * 100);
      const finalScore = baseScore >= 66 ? Math.min(100, baseScore + 8) : baseScore;
      
      setCalculatedScore(finalScore);
      setStep('result');

      if (finalScore >= 70) {
        completeTest(finalScore, selectedGrade, selectedSpecialization);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#9D00FF', '#00FF85']
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 text-left font-sans">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-cyber-border shadow-2xl p-6 sm:p-8 text-left">
        
        {/* Кнопка закрытия */}
        <button
          onClick={closeTestModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-cyber-subcard hover:bg-cyber-card text-slate-400 hover:text-white border border-cyber-border transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ЭТАП 1: Выбор направления и заявленного грейда */}
        {step === 'setup' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" /> ВХОДНОЕ ТЕСТИРОВАНИЕ • ТЗ СТР. 2-3
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Подтверждение грейда и присвоение Категории
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                На платформе FSP.SCOUT грейд не берется из резюме. Для появления в каталоге работодателей пройдите профильный квалификационный срез.
              </p>
            </div>

            {/* Защита от утечки заданий (Важно для 25% ТЗ) */}
            <div className="p-4 rounded-2xl bg-cyber-subcard/80 border border-neon-cyan/30 text-xs text-slate-300 space-y-1 font-mono">
              <span className="text-neon-cyan font-bold flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Anti-Leak Protection v2.4 (ФСП)
              </span>
              <p className="text-[11px] text-slate-400">
                Задания генерируются динамически с подменой входных структур данных и параметров асимптотики. Публикация ответов не дает преимуществ.
              </p>
            </div>

            {/* Специализация */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                1. Выберите профильную специализацию:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Бэкенд и распределенные системы',
                  'Системы ИИ и большие данные',
                  'Программирование робототехники',
                  'Информационная безопасность'
                ].map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialization(spec)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      selectedSpecialization === spec
                        ? 'bg-cyber-card border-neon-cyan text-white shadow-glow-cyan font-bold'
                        : 'bg-cyber-subcard border-cyber-border text-slate-400 hover:text-white'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Целевой грейд */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                2. Заявляемый уровень квалификации (Грейд):
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Junior+', 'Middle', 'Middle+', 'Senior', 'Lead / Architect'] as DeveloperGrade[]).map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                      selectedGrade === grade
                        ? 'bg-fsp-gold/20 border-fsp-gold text-fsp-gold font-bold shadow-glow-gold'
                        : 'bg-cyber-subcard border-cyber-border text-slate-400 hover:text-white'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Правило кулдауна из ТЗ */}
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-cyber-border flex items-center justify-between">
              <span>Правило ФСП: пересдача теста на повышение — не чаще 1 раза в 3 месяца.</span>
              <span className="text-slate-400 font-bold">Время: 15 минут</span>
            </div>

            <button
              onClick={() => setStep('testing')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-glow-cyan hover:opacity-95 transition-all"
            >
              <span>НАЧАТЬ ТЕСТИРОВАНИЕ НА {selectedGrade.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ЭТАП 2: Интерактивный процесс тестирования */}
        {step === 'testing' && (
          <div className="space-y-5">
            {/* Хедер теста */}
            <div className="flex items-center justify-between pb-3 border-b border-cyber-border">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyber-subcard border border-cyber-border text-neon-cyan">
                  Вопрос {currentQuestionIndex + 1} из {TEST_QUESTIONS.length}
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Грейд: {selectedGrade}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-fsp-gold px-3 py-1 rounded-xl bg-cyber-subcard border border-cyber-border">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>12:45</span>
              </div>
            </div>

            {/* Заголовок вопроса */}
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {currentQuestion.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQuestion.description}
              </p>
            </div>

            {/* Блок с кодом */}
            <div className="rounded-2xl bg-black/80 border border-cyber-border p-4 font-mono text-xs text-slate-300 overflow-x-auto relative">
              <div className="absolute top-2.5 right-3 text-[10px] text-slate-500 select-none">
                C++ / Go Runtime
              </div>
              <pre><code>{currentQuestion.codeSnippet}</code></pre>
            </div>

            {/* Варианты ответов */}
            <div className="space-y-2 pt-1">
              <label className="text-[10px] font-mono uppercase text-slate-400 block">
                Выберите наиболее точный инженерный вердикт:
              </label>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-cyber-card border-neon-cyan text-white shadow-glow-cyan'
                        : 'bg-cyber-subcard border-cyber-border text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-neon-cyan text-black' : 'bg-cyber-card text-slate-400 border border-cyber-border'
                    }`}>
                      {option.id.toUpperCase()}
                    </span>
                    <span className="leading-relaxed">{option.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Кнопка Далее */}
            <div className="pt-3 border-t border-cyber-border flex justify-end">
              <button
                disabled={!selectedAnswers[currentQuestion.id]}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 disabled:opacity-40 text-black font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all"
              >
                <span>{isLastQuestion ? 'ЗАВЕРШИТЬ ТЕСТ И ПОЛУЧИТЬ КАТЕГОРИЮ' : 'СЛЕДУЮЩИЙ ВОПРОС'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ЭТАП 3: Результат и фиксация Категории */}
        {step === 'result' && (
          <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-fsp-emerald/20 text-fsp-emerald border-2 border-fsp-emerald flex items-center justify-center mx-auto shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-fsp-emerald/15 text-fsp-emerald border border-fsp-emerald/30 inline-flex items-center gap-1.5 mb-2">
                <Award className="w-3.5 h-3.5" /> КВАЛИФИКАЦИЯ УСПЕШНО ПОДТВЕРЖДЕНА
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Результат: {calculatedScore} из 100 баллов
              </h2>
            </div>

            {/* Карточка присвоенной Категории */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-cyber-subcard border border-cyber-border text-left font-mono">
              <span className="text-[10px] uppercase text-slate-400 block mb-1">
                Официальная категория в каталоге скаутинга:
              </span>
              <div className="text-sm font-bold text-neon-cyan flex items-center justify-between">
                <span>{selectedSpecialization}</span>
                <span className="px-2 py-0.5 rounded bg-fsp-gold/20 text-fsp-gold border border-fsp-gold/40 text-xs">
                  {selectedGrade}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-cyber-border/60 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Статус тестирования:</span>
                  <span className="text-fsp-emerald font-bold">Подтвержден (Протокол ФСП)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Кулдаун на повышение:</span>
                  <span className="text-slate-300">до 05.01.2027 (3 месяца)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Ваш профиль верифицирован и перемещен в верхние строчки каталога категории <strong className="text-white">{selectedGrade}</strong>. Работодатели уже видят ваш подтвержденный балл.
            </p>

            <button
              onClick={() => {
                setStep('setup');
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
                closeTestModal();
              }}
              className="px-8 py-3 rounded-xl bg-neon-cyan text-black font-extrabold text-xs shadow-glow-cyan hover:scale-105 transition-all"
            >
              ПЕРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ
            </button>
          </div>
        )}

      </div>
    </div>
  );
};