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
    <div className="panel-dossier rounded-2xl p-5 mb-8 space-y-4 text-left">
      
      {/* Верхняя строка: Поиск и Сортировка */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-chalk-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по ФИО, описанию или компетенциям..."
            className="w-full bg-obsidian-sub border border-obsidian-border rounded-xl pl-10 pr-10 py-2.5 text-xs text-chalk placeholder-chalk-dim focus:outline-none focus:border-crimson transition-all font-mono"
          />
          {filters.searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-chalk-dim hover:text-chalk"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-obsidian-sub border border-obsidian-border text-xs rounded-xl px-3 py-2.5 text-chalk font-mono focus:outline-none focus:border-crimson"
          >
            <option value="rating">Рейтинг ELO (По убыванию)</option>
            <option value="podiums">Награды турниров</option>
            <option value="salary_asc">Зарплата (Сначала ниже)</option>
            <option value="salary_desc">Зарплата (Сначала выше)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="p-2.5 rounded-xl bg-obsidian-sub hover:bg-crimson/20 text-chalk-dim hover:text-crimson border border-obsidian-border transition-all flex items-center gap-1 text-xs font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сброс</span>
            </button>
          )}
        </div>
      </div>

      {/* Фильтр по тегам Стека технологий (Параметр API ?stack=...) */}
      <div>
        <span className="text-[10px] font-mono uppercase text-chalk-dim mb-2 flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-cyan-400" /> Фильтр по стеку технологий (query-параметр <code className="text-crimson font-bold">?stack=</code>):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_STACK.map((tech) => {
            const isSelected = filters.stack.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => toggleStackFilter(tech)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 font-bold shadow-sm'
                    : 'bg-obsidian-sub text-chalk-muted border border-obsidian-border hover:border-obsidian-borderLight'
                }`}
              >
                <span>{tech}</span>
                {isSelected && <X className="w-3 h-3 text-cyan-300 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Дисциплины ФСП */}
      <div>
        <span className="text-[10px] font-mono uppercase text-chalk-dim mb-2 flex items-center gap-1.5">
          <Flame className="w-3 h-3 text-crimson" /> Дисциплина ФСП:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {DISCIPLINE_CONFIG.map((d) => {
            const isSelected = filters.disciplines.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleDisciplineFilter(d.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-crimson text-chalk font-bold shadow-glow-crimson-sm'
                    : 'bg-obsidian-sub text-chalk-muted border border-obsidian-border hover:border-obsidian-borderLight'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Разряды и Зарплатная планка */}
      <div className="pt-3 border-t border-obsidian-border grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <span className="text-[10px] font-mono uppercase text-chalk-dim mb-2 flex items-center gap-1.5">
            <Trophy className="w-3 h-3 text-fsp-gold" /> Спортивный разряд:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SPORT_RANKS.map((rank) => {
              const isSelected = filters.sportRanks.includes(rank);
              return (
                <button
                  key={rank}
                  onClick={() => toggleSportRankFilter(rank)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                    isSelected
                      ? 'bg-chalk text-obsidian font-bold'
                      : 'bg-obsidian-sub text-chalk-muted border border-obsidian-border hover:border-obsidian-borderLight'
                  }`}
                >
                  {rank}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-chalk-dim mb-1.5">
            <span>Зарплатный потолок:</span>
            <span className="text-crimson font-bold">
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
            className="w-full h-1.5 bg-obsidian-sub rounded-lg appearance-none cursor-pointer accent-crimson"
          />
        </div>
      </div>

    </div>
  );
};