import React from 'react';

export const CandidateCardSkeleton: React.FC = () => {
  return (
    <div className="panel-dossier rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden animate-pulse text-left">
      <div>
        {/* Шапка */}
        <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-obsidian-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-obsidian-sub border border-obsidian-border shrink-0" />
            <div className="space-y-2">
              <div className="w-16 h-2.5 rounded bg-obsidian-sub" />
              <div className="w-32 h-4 rounded bg-obsidian-sub" />
              <div className="w-24 h-3 rounded bg-obsidian-sub" />
            </div>
          </div>
          <div className="w-16 h-6 rounded-md bg-obsidian-sub" />
        </div>

        {/* Категория */}
        <div className="mb-3 space-y-1.5">
          <div className="w-28 h-2.5 rounded bg-obsidian-sub" />
          <div className="w-full h-6 rounded-lg bg-obsidian-sub" />
        </div>

        {/* Обоснование */}
        <div className="h-12 rounded-xl bg-obsidian-sub/70 border border-obsidian-border mb-4" />

        {/* Метрики */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-obsidian-sub border border-obsidian-border mb-4 text-center">
          <div className="h-6 rounded bg-obsidian-card" />
          <div className="h-6 rounded bg-obsidian-card" />
          <div className="h-6 rounded bg-obsidian-card" />
        </div>

        {/* Стек */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <div className="w-14 h-5 rounded bg-obsidian-sub" />
          <div className="w-12 h-5 rounded bg-obsidian-sub" />
          <div className="w-16 h-5 rounded bg-obsidian-sub" />
          <div className="w-10 h-5 rounded bg-obsidian-sub" />
        </div>
      </div>

      {/* Футер карточки */}
      <div className="pt-4 border-t border-obsidian-border flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="w-20 h-2.5 rounded bg-obsidian-sub" />
          <div className="w-28 h-4 rounded bg-obsidian-sub" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-obsidian-sub" />
          <div className="w-20 h-9 rounded-xl bg-crimson/30" />
        </div>
      </div>
    </div>
  );
};
