import React from 'react';
import { 
  Search, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Layers,
  X
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
    toggleStackFilter,
    toggleDisciplineFilter, 
    toggleSportRankFilter, 
    toggleGradeFilter,
    setSalaryRange,
    setSortBy,
    resetFilters
  } = useAppStore();

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.stack.length > 0 ||
    filters.disciplines.length > 0 ||
    filters.sportRanks.length > 0 ||
    filters.grades.length > 0 ||
    filters.maxSalary < 600000;

  return (
    <div className="glass-panel rounded-3xl p-6 mb-8 space-y-5 text-left border border-white/10 shadow-2xl">
      
      {/* Верхняя строка: Поиск и Сортировка */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-chalk-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по ФИО, описанию или компетенциям..."
            className="w-full bg-obsidian-sub/90 border border-white/10 rounded-2xl pl-11 pr-11 py-3 text-xs text-chalk placeholder-chalk-dim focus:outline-none focus:border-crimson focus:shadow-glow-crimson-sm transition-all font-mono"
          />
          {filters.searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-chalk-dim hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-obsidian-sub/90 border border-white/10 text-xs rounded-2xl px-4 py-3 text-chalk font-mono font-bold focus:outline-none focus:border-crimson"
          >
            <option value="rating">Рейтинг ELO (По убыванию)</option>
            <option value="podiums">Награды турниров</option>
            <option value="salary_asc">Зарплата (Сначала ниже)</option>
            <option value="salary_desc">Зарплата (Сначала выше)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3.5 py-3 rounded-2xl bg-crimson/15 hover:bg-crimson/25 text-crimson border border-crimson/30 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сброс</span>
            </button>
          )}
        </div>
      </div>

      {/* Фильтр по тегам Стека технологий (Параметр API ?stack=...) */}
      <div>
        <span className="text-[10px] font-mono uppercase text-chalk-dim mb-2.5 flex items-center gap-2 font-semibold">
          <Layers className="w-3.5 h-3.5 text-cyan drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" /> Фильтр по стеку технологий (query-параметр <code className="text-crimson font-bold">?stack=</code>):
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_STACK.map((tech) => {
            const isSelected = filters.stack.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => toggleStackFilter(tech)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan/20 to-blue-500/20 text-cyan border border-cyan/60 shadow-glow-cyan-sm scale-[1.02]'
                    : 'bg-white/5 text-chalk-muted border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{tech}</span>
                {isSelected && <X className="w-3 h-3 text-cyan ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Дисциплины ФСП */}
      <div>
        <span className="text-[10px] font-mono uppercase text-chalk-dim mb-2.5 flex items-center gap-2 font-semibold">
          <Flame className="w-3.5 h-3.5 text-crimson drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]" /> Дисциплина ФСП:
        </span>
        <div className="flex flex-wrap gap-2">
          {DISCIPLINE_CONFIG.map((d) => {
            const isSelected = filters.disciplines.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleDisciplineFilter(d.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-crimson to-red-600 text-white shadow-glow-crimson-sm border border-crimson/60'
                    : 'bg-white/5 text-chalk-muted border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Разряды и Зарплатная планка */}
      <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div>
          <span className="text-[10px] font-mono uppercase text-chalk-dim mb-2.5 flex items-center gap-2 font-semibold">
            <Trophy className="w-3.5 h-3.5 text-fsp-gold drop-shadow-[0_0_8px_rgba(255,196,0,0.6)]" /> Спортивный разряд:
          </span>
          <div className="flex flex-wrap gap-2">
            {SPORT_RANKS.map((rank) => {
              const isSelected = filters.sportRanks.includes(rank);
              return (
                <button
                  key={rank}
                  onClick={() => toggleSportRankFilter(rank)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-fsp-gold text-black font-black shadow-glow-gold'
                      : 'bg-white/5 text-chalk-muted border border-white/10 hover:border-white/20'
                  }`}
                >
                  {rank}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-chalk-dim mb-2 font-semibold">
            <span>Зарплатный потолок:</span>
            <span className="text-crimson font-black text-xs">
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
            className="w-full h-2 bg-obsidian-sub rounded-lg appearance-none cursor-pointer accent-crimson"
          />
        </div>
      </div>

    </div>
  );
};