import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  BrainCircuit, 
  Check, 
  ArrowRight, 
  Layers
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

// Готовые пресеты потребностей для мгновенного показа жюри на защите
const NEED_PRESETS = [
  {
    id: 'preset-highload',
    title: 'Highload C++ / Go Ядро',
    teamName: 'Команда распределенного биллинга и HFT',
    description: 'Разрабатываем отказоустойчивый движок транзакций. Критически важно знание структур данных, алгоритмов оптимизации памяти и опыт решения сложных задач в условиях стресса.',
    targetCategory: 'Бэкенд и распределенные системы',
    requiredStack: ['C++20', 'Go', 'Algorithms', 'Distributed Systems'],
    salaryMin: 400000,
    salaryMax: 500000
  },
  {
    id: 'preset-ai',
    title: 'AI / LLM Alignment',
    teamName: 'Лаборатория фундаментальных нейросетей',
    description: 'Оптимизация инференса больших языковых моделей и квантование весов на CUDA. Нужен сильный математический бэкграунд и опыт соревновательного ML.',
    targetCategory: 'Системы ИИ и большие данные',
    requiredStack: ['Python', 'PyTorch', 'CUDA', 'Transformers'],
    salaryMin: 350000,
    salaryMax: 450000
  },
  {
    id: 'preset-robotics',
    title: 'Robotics Embedded Systems',
    teamName: 'Отдел автономных БПЛА и робототехники',
    description: 'Низкоуровневая разработка прошивок реального времени (RTOS/Rust) для автономных платформ. Требуется алгоритмическая база и понимание аппаратной части.',
    targetCategory: 'Программирование робототехники',
    requiredStack: ['Rust', 'C', 'ROS2', 'RTOS'],
    salaryMin: 280000,
    salaryMax: 350000
  }
];

export const SmartMatchModal: React.FC = () => {
  const { isSmartMatchOpen, closeSmartMatchModal, applySmartMatch } = useAppStore();

  const [teamName, setTeamName] = useState(NEED_PRESETS[0].teamName);
  const [description, setDescription] = useState(NEED_PRESETS[0].description);
  const [targetCategory, setTargetCategory] = useState(NEED_PRESETS[0].targetCategory);
  const [requiredStack, setRequiredStack] = useState<string[]>(NEED_PRESETS[0].requiredStack);
  const [salaryMin, setSalaryMin] = useState(400000);
  const [salaryMax, setSalaryMax] = useState(500000);
  const [newTag, setNewTag] = useState('');

  if (!isSmartMatchOpen) return null;

  // Быстрое применение пресета
  const loadPreset = (preset: typeof NEED_PRESETS[0]) => {
    setTeamName(preset.teamName);
    setDescription(preset.description);
    setTargetCategory(preset.targetCategory);
    setRequiredStack(preset.requiredStack);
    setSalaryMin(preset.salaryMin);
    setSalaryMax(preset.salaryMax);
  };

  const addTag = () => {
    if (newTag.trim() && !requiredStack.includes(newTag.trim())) {
      setRequiredStack([...requiredStack, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setRequiredStack(requiredStack.filter(t => t !== tag));
  };

  const handleLaunchMatch = (e: React.FormEvent) => {
    e.preventDefault();
    applySmartMatch({
      teamName,
      description,
      targetCategory,
      requiredStack,
      salaryMin,
      salaryMax
    });
    closeSmartMatchModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 font-sans text-left">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-neon-cyan/50 shadow-glow-cyan p-6 sm:p-8 text-left">
        
        {/* Кнопка закрытия */}
        <button
          onClick={closeSmartMatchModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-cyber-subcard hover:bg-cyber-card text-slate-400 hover:text-white border border-cyber-border transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Заголовок */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono mb-2">
            <BrainCircuit className="w-3.5 h-3.5 animate-pulse" /> СМАРТ-МАТЧИНГ ПО ПОТРЕБНОСТИ • ТЗ СТР. 4-5 (35% ОЦЕНКИ)
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Формирование потребности команды
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Платформа сопоставит задачи команды с подтвержденным реестром побед ФСП, баллами тестов и сформирует подборку с персональным обоснованием выдачи.
          </p>
        </div>

        {/* Быстрые демо-пресеты */}
        <div className="mb-6">
          <label className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
            Быстрые сценарии для защиты (1 клик):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {NEED_PRESETS.map((preset) => (
              <button
                type="button"
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className={`p-3 rounded-xl border text-xs font-mono font-medium text-left transition-all ${
                  teamName === preset.teamName
                    ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-glow-cyan font-bold'
                    : 'bg-cyber-subcard border-cyber-border text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 font-bold text-white">
                  <Sparkles className="w-3 h-3 text-neon-cyan" /> {preset.title}
                </div>
                <span className="text-[10px] text-slate-400 block truncate">{preset.targetCategory}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLaunchMatch} className="space-y-5">
          
          {/* Название команды / проекта */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
              1. Команда и проект:
            </label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-cyber-subcard border border-cyber-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-neon-cyan font-sans"
              placeholder="Например: Платформа потоковой обработки видео..."
            />
          </div>

          {/* Описание задач */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
              2. Описание задач и контекст (чем предстоит заниматься):
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-cyber-subcard border border-cyber-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-neon-cyan leading-relaxed resize-none"
              placeholder="Опишите инженерные вызовы команды..."
            />
          </div>

          {/* Категория и Стек */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                3. Целевая специализация:
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full bg-cyber-subcard border border-cyber-border rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan"
              >
                <option value="Бэкенд и распределенные системы">Бэкенд и распределенные системы</option>
                <option value="Системы ИИ и большие данные">Системы ИИ и большие данные</option>
                <option value="Программирование робототехники">Программирование робототехники</option>
                <option value="Информационная безопасность">Информационная безопасность</option>
                <option value="Продуктовое программирование (Web)">Продуктовое программирование (Web)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                4. Ключевой стек технологий:
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Добавить тег (напр. Kafka) + Enter"
                  className="w-full bg-cyber-subcard border border-cyber-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 rounded-xl bg-cyber-card border border-cyber-border text-xs text-slate-200 hover:text-white"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {requiredStack.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyber-card border border-neon-cyan/40 text-neon-cyan flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 text-slate-400">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Бюджет вилки ЗП */}
          <div className="p-4 rounded-2xl bg-cyber-subcard border border-cyber-border">
            <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
              5. Зарплатный бюджет вакансии (от–до в рублях):
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Бюджет от:</label>
                <input
                  type="number"
                  step={20000}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full bg-cyber-card border border-cyber-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Бюджет до:</label>
                <input
                  type="number"
                  step={20000}
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full bg-cyber-card border border-cyber-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </div>
          </div>

          {/* Кнопка запуска */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-glow-cyan hover:scale-[1.01] transition-all"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>СФОРМИРОВАТЬ СМАРТ-ПОДБОРКУ С ОБЪЯСНИМОСТЬЮ (35% ТЗ)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};