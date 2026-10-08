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

  const isSalaryValid = salaryMin >= 0 && salaryMax >= 0 && salaryMin <= salaryMax;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian-950/85 backdrop-blur-2xl animate-in fade-in duration-200 font-sans text-left">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-neon-cyan/40 shadow-glow-cyan/20 p-6 sm:p-8 text-left bg-gradient-to-b from-obsidian-900/90 via-obsidian-950/95 to-black">
        
        {/* Кнопка закрытия */}
        <button
          onClick={closeSmartMatchModal}
          className="absolute top-5 right-5 p-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-slate-400 hover:text-white border border-obsidian-700/60 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Заголовок */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono mb-2 shadow-glow-cyan/10">
            <BrainCircuit className="w-3.5 h-3.5 animate-pulse text-neon-cyan" /> СМАРТ-МАТЧИНГ ПО ПОТРЕБНОСТИ • ТЗ СТР. 4-5 (35% ОЦЕНКИ)
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Формирование потребности команды
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Платформа сопоставит задачи команды с подтвержденным реестром побед ФСП, баллами тестов и сформирует подборку с персональным обоснованием выдачи.
          </p>
        </div>

        {/* Быстрые демо-пресеты */}
        <div className="mb-6">
          <label className="text-[10px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
            Быстрые сценарии для защиты (1 клик):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {NEED_PRESETS.map((preset) => (
              <button
                type="button"
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className={`p-3 rounded-xl border text-xs font-mono font-medium text-left transition-all duration-200 ${
                  teamName === preset.teamName
                    ? 'bg-crimson-950/60 border-crimson-500 text-white shadow-glow-crimson font-bold'
                    : 'bg-obsidian-850 border-obsidian-700/60 text-slate-300 hover:border-obsidian-600 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 font-bold text-white">
                  <Sparkles className="w-3 h-3 text-crimson-400" /> {preset.title}
                </div>
                <span className="text-[10px] text-slate-400 block truncate">{preset.targetCategory}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLaunchMatch} className="space-y-5">
          
          {/* Название команды / проекта */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 tracking-wider">
              1. Команда и проект:
            </label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-obsidian-850 border border-obsidian-700/70 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-neon-cyan font-sans transition-colors"
              placeholder="Например: Платформа потоковой обработки видео..."
            />
          </div>

          {/* Описание задач */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 tracking-wider">
              2. Описание задач и контекст (чем предстоит заниматься):
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-obsidian-850 border border-obsidian-700/70 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-neon-cyan leading-relaxed resize-none transition-colors"
              placeholder="Опишите инженерные вызовы команды..."
            />
          </div>

          {/* Категория и Стек */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 tracking-wider">
                3. Целевая специализация:
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full bg-obsidian-850 border border-obsidian-700/70 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan transition-colors"
              >
                <option value="Бэкенд и распределенные системы">Бэкенд и распределенные системы</option>
                <option value="Системы ИИ и большие данные">Системы ИИ и большие данные</option>
                <option value="Программирование робототехники">Программирование робототехники</option>
                <option value="Информационная безопасность">Информационная безопасность</option>
                <option value="Продуктовое программирование (Web)">Продуктовое программирование (Web)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 tracking-wider">
                4. Ключевой стек технологий:
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Добавить тег (напр. Kafka) + Enter"
                  className="w-full bg-obsidian-850 border border-obsidian-700/70 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan transition-colors"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3.5 py-2 rounded-xl bg-obsidian-800 border border-obsidian-700 text-xs font-bold text-white hover:border-neon-cyan transition-all"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {requiredStack.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-obsidian-850 border border-neon-cyan/40 text-neon-cyan flex items-center gap-1.5 shadow-glow-cyan/10"
                  >
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-crimson-400 text-slate-400 transition-colors">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Бюджет вилки ЗП */}
          <div className="p-4 rounded-2xl bg-obsidian-850/90 border border-obsidian-700/70">
            <span className="text-xs font-mono uppercase text-slate-400 block mb-2 tracking-wider">
              5. Зарплатный бюджет вакансии (от–до в рублях):
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Бюджет от:</label>
                <input
                  type="number"
                  min={0}
                  step={20000}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Math.max(0, Number(e.target.value)))}
                  className={`w-full bg-obsidian-900 border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none ${
                    !isSalaryValid ? 'border-red-500 focus:border-red-500' : 'border-obsidian-700 focus:border-neon-cyan'
                  }`}
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Бюджет до:</label>
                <input
                  type="number"
                  min={0}
                  step={20000}
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Math.max(0, Number(e.target.value)))}
                  className={`w-full bg-obsidian-900 border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none ${
                    !isSalaryValid ? 'border-red-500 focus:border-red-500' : 'border-obsidian-700 focus:border-neon-cyan'
                  }`}
                />
              </div>
            </div>
            {!isSalaryValid && (
              <div className="text-[11px] font-mono text-red-400 pt-2">
                ⚠️ Ошибка: Бюджет «от» не может превышать бюджет «до»!
              </div>
            )}
          </div>

          {/* Кнопка запуска */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isSalaryValid}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-sm flex items-center justify-center gap-2 shadow-glow-cyan hover:opacity-95 transition-all uppercase tracking-wider"
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