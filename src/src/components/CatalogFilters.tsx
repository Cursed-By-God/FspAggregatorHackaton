import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Layers,
  X,
  BrainCircuit,
  Sparkles,
  Check
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import type { FspDiscipline, FspSportRank, DeveloperGrade } from '../types';

const DISCIPLINE_CONFIG: { id: FspDiscipline; label: string }[] = [
  { id: 'algorithms', label: 'Алгоритмы' },
  { id: 'product_dev', label: 'Продукт / Web' },
  { id: 'systems_ai', label: 'Системы ИИ' },
  { id: 'robotics', label: 'Робототехника' },
  { id: 'cyber_security', label: 'Инфобез' },
];

const SPORT_RANKS: FspSportRank[] = ['МС', 'КМС', '1-й разряд', '2-й разряд', 'Без разряда'];
const GRADES: DeveloperGrade[] = ['Junior+', 'Middle', 'Middle+', 'Senior', 'Lead / Architect'];
const POPULAR_STACK: string[] = ['C++', 'Go', 'Python', 'Rust', 'TypeScript', 'Kafka', 'Docker', 'PostgreSQL', 'PyTorch', 'ROS2'];

export const CatalogFilters: React.FC = () => {
  const { 
    filters, 
    setSearchQuery, 
    toggleCategoryFilter,
    toggleStackFilter,
    toggleDisciplineFilter, 
    toggleSportRankFilter, 
    toggleGradeFilter,
    setSalaryRange,
    toggleOnlyVerifiedFsp,
    setSortBy,
    resetFilters,
    smartSearchText,
    triggerSmartSearch,
    clearSmartSearchText
  } = useAppStore();

  const [inputSmartText, setInputSmartText] = useState(smartSearchText || '');

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.stack.length > 0 ||
    filters.disciplines.length > 0 ||
    filters.sportRanks.length > 0 ||
    filters.grades.length > 0 ||
    filters.maxSalary < 600000 ||
    filters.onlyVerifiedFsp ||
    smartSearchText !== '';

  const handleSmartSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSmartSearch(inputSmartText);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 mb-8 space-y-5 text-left border border-white/10 shadow-2xl bg-gradient-to-b from-obsidian-900/90 via-obsidian-950/95 to-black">
      
      {/* ВЕРХНЯЯ СТРОКА: Умный ИИ-поиск по произвольному тексту (/api/smartSearch) */}
      <form onSubmit={handleSmartSearchSubmit} className="space-y-2">
        <div className="flex items-center justify-between font-mono">
          <label className="text-xs font-bold text-neon-cyan uppercase flex items-center gap-2 tracking-wider">
            <BrainCircuit className="w-4 h-4 text-neon-cyan animate-pulse" /> Умный ИИ-поиск по естественному языку (Путь: <code className="text-white font-bold bg-obsidian-850 px-1.5 py-0.5 rounded border border-neon-cyan/30">/api/smartSearch</code>)
          </label>
          <span className="text-[10px] text-slate-400">Например: «самый крутой бэкендер»</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neon-cyan absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputSmartText}
              onChange={(e) => setInputSmartText(e.target.value)}
              placeholder="Введите любой запрос (напр.: самый крутой бэкендер на C++)..."
              className="w-full bg-obsidian-850 border border-neon-cyan/40 rounded-2xl pl-11 pr-11 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-neon-cyan focus:shadow-glow-cyan-sm transition-all font-mono shadow-inner"
            />
            {inputSmartText && (
              <button 
                type="button"
                onClick={() => {
                  setInputSmartText('');
                  clearSmartSearchText();
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple text-black font-black text-xs font-mono flex items-center justify-center gap-2 shadow-glow-cyan hover:scale-[1.02] transition-all whitespace-nowrap uppercase tracking-wider"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>НАЙТИ ИИ (/api/smartSearch)</span>
          </button>
        </div>

        {smartSearchText && (
          <div className="p-2.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Результаты умного ИИ-поиска по запросу: <strong className="text-white font-bold">«{smartSearchText}»</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setInputSmartText('');
                clearSmartSearchText();
              }}
              className="text-slate-400 hover:text-white underline text-[11px]"
            >
              Сбросить ИИ-поиск
            </button>
          </div>
        )}
      </form>

      {/* НИЖНЯЯ СТРОКА: Нажимные кнопки-фильтры (/api/candidates?page=1&pageSize=20&stack=C++,Go&grade=Junior,Middle&...) */}
      <div className="pt-3 border-t border-obsidian-800 space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-crimson-400" /> Нажимные фильтры каталога (Запрос на <code className="text-crimson-400 font-bold bg-obsidian-850 px-1.5 py-0.5 rounded border border-crimson-500/30">/api/candidates</code>):
          </span>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Чекбокс "Только верифицированные ФСП" */}
            <button
              type="button"
              onClick={toggleOnlyVerifiedFsp}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                filters.onlyVerifiedFsp
                  ? 'bg-fsp-emerald/20 text-fsp-emerald border border-fsp-emerald/50 shadow-glow-emerald/20'
                  : 'bg-obsidian-850 text-slate-400 border border-obsidian-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${filters.onlyVerifiedFsp ? 'text-fsp-emerald' : 'text-slate-500'}`} />
              <span>Только ФСП (hasFsp=true)</span>
            </button>

            {/* Сортировка */}
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-obsidian-850 border border-obsidian-700 text-xs rounded-xl px-3.5 py-2 text-white font-mono font-bold focus:outline-none focus:border-neon-cyan"
            >
              <option value="rating">Рейтинг ELO (SortBy=rating)</option>
              <option value="podiums">Награды турниров</option>
              <option value="salary_asc">Зарплата (salary_asc)</option>
              <option value="salary_desc">Зарплата (salary_desc)</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setInputSmartText('');
                  clearSmartSearchText();
                  resetFilters();
                }}
                className="px-3.5 py-2 rounded-xl bg-crimson-950/60 hover:bg-crimson-900/80 text-crimson-400 border border-crimson-500/40 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сброс фильтров</span>
              </button>
            )}
          </div>
        </div>

        {/* Нажимные кнопки Категории (Category) */}
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
            Категория / Специализация (Query: <code className="text-neon-cyan font-bold">Category=Бэкенд</code>):
          </span>
          <div className="flex flex-wrap gap-2">
            {['Бэкенд', 'Фронтенд', 'ИИ / ML', 'Алгоритмы', 'Инфобез', 'Робототехника'].map((cat) => {
              const isSelected = filters.categories.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => toggleCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-neon-cyan text-black font-black shadow-glow-cyan'
                      : 'bg-obsidian-850 text-slate-300 border border-obsidian-700 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Нажимные кнопки Грейда (grade) */}
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
            Грейд (Query: <code className="text-crimson-400 font-bold">Grade=Junior,Middle</code>):
          </span>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => {
              const isSelected = filters.grades.includes(g);
              return (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleGradeFilter(g)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-crimson-600 text-white shadow-glow-crimson border border-crimson-400'
                      : 'bg-obsidian-850 text-slate-300 border border-obsidian-700 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Нажимные кнопки Стека технологий (stack) */}
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
            Стек технологий (Query: <code className="text-neon-cyan font-bold">Stack=C++,Go</code>):
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_STACK.map((tech) => {
              const isSelected = filters.stack.includes(tech);
              return (
                <button
                  type="button"
                  key={tech}
                  onClick={() => toggleStackFilter(tech)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/60 shadow-glow-cyan/20 scale-[1.02]'
                      : 'bg-obsidian-850 text-slate-300 border border-obsidian-700 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <span>{tech}</span>
                  {isSelected && <X className="w-3 h-3 text-neon-cyan ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Дисциплины и Разряды ФСП */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
              Дисциплина ФСП (Query: <code className="text-crimson-400 font-bold">Discipline=algorithms</code>):
            </span>
            <div className="flex flex-wrap gap-2">
              {DISCIPLINE_CONFIG.map((d) => {
                const isSelected = filters.disciplines.includes(d.id);
                return (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => toggleDisciplineFilter(d.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-crimson-600 text-white shadow-glow-crimson border border-crimson-400'
                        : 'bg-obsidian-850 text-slate-300 border border-obsidian-700 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 tracking-wider">
              Спортивный разряд (Query: <code className="text-fsp-gold font-bold">SportRank=МС</code>):
            </span>
            <div className="flex flex-wrap gap-2">
              {SPORT_RANKS.map((rank) => {
                const isSelected = filters.sportRanks.includes(rank);
                return (
                  <button
                    type="button"
                    key={rank}
                    onClick={() => toggleSportRankFilter(rank)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-fsp-gold text-black font-black shadow-glow-gold'
                        : 'bg-obsidian-850 text-slate-300 border border-obsidian-700 hover:border-slate-500'
                    }`}
                  >
                    {rank}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Потолок зарплаты maxSalary & Страницы (Page, PageSize) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 mb-1 font-semibold">
              <span>Зарплатный потолок (Query: <code className="text-crimson-400 font-bold">MaxSalary={filters.maxSalary}</code>):</span>
              <span className="text-crimson-400 font-black text-xs">
                до {filters.maxSalary.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <input
              type="range"
              min={150000}
              max={600000}
              step={25000}
              value={filters.maxSalary}
              onChange={(e) => setSalaryRange(filters.minSalary, Number(e.target.value))}
              className="w-full h-2 bg-obsidian-850 rounded-lg appearance-none cursor-pointer accent-crimson-500"
            />
          </div>

          {/* Пагинация (Page & PageSize) */}
          <div className="flex items-center justify-between gap-4 bg-obsidian-850/60 p-3 rounded-2xl border border-obsidian-700 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Размер страницы (PageSize):</span>
              <div className="flex gap-1.5 mt-1">
                {[10, 20, 50].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => useAppStore.getState().setPageSize(size)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      filters.pageSize === size
                        ? 'bg-neon-cyan text-black'
                        : 'bg-obsidian-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold text-right">Страница (Page):</span>
              <div className="flex gap-1.5 mt-1 items-center">
                <button
                  type="button"
                  disabled={filters.page <= 1}
                  onClick={() => useAppStore.getState().setPage(Math.max(1, filters.page - 1))}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-obsidian-900 text-slate-400 disabled:opacity-40 hover:text-white"
                >
                  ←
                </button>
                <span className="text-xs font-bold text-white px-2">Стр. {filters.page}</span>
                <button
                  type="button"
                  onClick={() => useAppStore.getState().setPage(filters.page + 1)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-obsidian-900 text-slate-400 hover:text-white"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};