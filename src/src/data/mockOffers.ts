import type { JobOffer } from '../types';

const yandexLogo = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="%23FC3F1D"/><text x="30" y="42" font-family="sans-serif" font-size="34" font-weight="900" fill="white" text-anchor="middle">Я</text></svg>`;

const tbankLogo = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="14" fill="%23FED83D"/><text x="30" y="44" font-family="sans-serif" font-size="38" font-weight="900" fill="black" text-anchor="middle">Т</text></svg>`;

export const INITIAL_OFFERS: JobOffer[] = [
  {
    id: 'off-yandex-01',
    candidateId: 'fsp-cand-01',
    companyName: 'Яндекс Поиск & Реклама',
    companyLogoUrl: yandexLogo,
    positionTitle: 'Senior Highload C++ Developer (Core Ranking)',
    salaryMin: 460000,
    salaryMax: 530000,
    employmentType: 'Гибрид (Москва)',
    message: 'Александр, приветствуем! Обратили внимание на твою победу в Чемпионате России ФСП 2025. Нам в ядро поискового ранжирования нужны инженеры с таким глубоким пониманием структур данных. Предлагаем оффер без стандартных 4 раундов лайвкодинга!',
    status: 'pending',
    sentAt: 'Сегодня, 14:20',
    perks: ['Опционная программа', 'ДМС со стоматологией с 1 дня', 'Компенсация поездок на турниры ФСП', 'MacBook Pro M3 Max']
  },
  {
    id: 'off-tbank-02',
    candidateId: 'fsp-cand-01',
    companyName: 'Т-Банк (Инвестиции)',
    companyLogoUrl: tbankLogo,
    positionTitle: 'Lead Distributed Systems Engineer (Matching Engine)',
    salaryMin: 500000,
    salaryMax: 560000,
    employmentType: 'Полная удаленка',
    message: 'Привет! Твой профиль верифицированного МС по спортпрограммированию идеально подходит под задачи нашего торгового движка. Хотим пригласить сразу на финальный диалог с CTO.',
    status: 'pending',
    sentAt: 'Вчера, 18:45',
    perks: ['Полная удаленка из любой точки РФ', 'Премии каждые полгода', 'Бюджет на обучение 200 000 ₽ / год']
  }
];