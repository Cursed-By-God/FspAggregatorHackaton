import type { Candidate } from '../types';

const makeCyberAvatar = (initials: string, color1: string, color2: string) => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="100" height="100" rx="24" fill="url(%23g)"/><text x="50" y="58" font-family="monospace" font-size="34" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'fsp-cand-01',
    fullName: 'Александр Смирнов',
    avatarUrl: makeCyberAvatar('АС', '%2300F0FF', '%239D00FF'),
    handle: '@algo_slayer',
    headline: 'Highload C++ / Go Architect • Алгоритмический гроссмейстер',
    city: 'Москва',
    grade: 'Lead / Architect',
    category: {
      id: 'cat-backend-lead',
      specialization: 'Бэкенд и распределенные системы',
      grade: 'Lead / Architect'
    },
    primaryStack: ['C++20', 'Go', 'Algorithms', 'Distributed Systems', 'Kafka', 'eBPF'],
    salaryMin: 420000,
    salaryMax: 480000,
    bio: 'Абсолютный победитель Чемпионата России ФСП 2025. Экс-финалист международных соревнований. Специализируюсь на низколатентных торговых системах (HFT) и распределенных хранилищах данных.',
    isOpenToOffers: true,
    matchExplanation: 'Топ-1: Золото Чемпионата России 2025 (МС) + 99/100 за профильный архитектурный тест',
    fspProfile: {
      hasHistory: true,
      isVerified: true,
      fspId: 'FSP-RU-2025-0012',
      sportRank: 'МС',
      disciplines: ['algorithms', 'product_dev'],
      ratingScore: 2840,
      contestsParticipated: 34,
      podiumsCount: 19,
      achievements: [
        {
          id: 'ach-101',
          tournamentName: 'Чемпионат России по спортивному программированию',
          stage: 'Финал',
          year: 2025,
          discipline: 'algorithms',
          placeResult: '1 место (Золото)',
          teamName: 'Red Panda Devs',
          roleInTeam: 'Капитан / Алгоритмист',
          verificationHash: '0x8F9B2A...7E11',
          verifiedDate: '15.05.2025',
        },
        {
          id: 'ach-102',
          tournamentName: 'Кубок Федерации: Алгоритмы и структуры данных',
          stage: 'Финал',
          year: 2024,
          discipline: 'algorithms',
          placeResult: '1 место (Золото)',
          roleInTeam: 'Соло-участник',
          verificationHash: '0x3C4D11...9A88',
          verifiedDate: '20.11.2024',
        }
      ]
    },
    testSummary: {
      isPassed: true,
      score: 99,
      testedGrade: 'Lead / Architect',
      passedAt: '2026-08-10',
      cooldownUntil: '2026-11-10'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 99, fullMark: 100 },
      { subject: 'Скорость кода', score: 95, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 98, fullMark: 100 },
      { subject: 'Архитектура', score: 92, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 96, fullMark: 100 },
      { subject: 'Команда', score: 88, fullMark: 100 },
    ],
    contacts: {
      telegram: '@alex_algo_slayer',
      github: 'https://github.com',
      email: 'a.smirnov@algo-fsp.ru',
      phone: '+7 (999) 012-34-56'
    }
  },
  {
    id: 'fsp-cand-02',
    fullName: 'Дарья Воронова',
    avatarUrl: makeCyberAvatar('ДВ', '%23FF007A', '%237928CA'),
    handle: '@dasha_neural',
    headline: 'Senior ML Engineer / LLM Alignment Specialist',
    city: 'Санкт-Петербург',
    grade: 'Senior',
    category: {
      id: 'cat-ai-senior',
      specialization: 'Системы ИИ и большие данные',
      grade: 'Senior'
    },
    primaryStack: ['Python', 'PyTorch', 'CUDA', 'Transformers', 'vLLM', 'Ray'],
    salaryMin: 360000,
    salaryMax: 420000,
    bio: 'КМС по дисциплине "Системы ИИ и большие данные". Опыт в обучении и квантовании больших языковых моделей. Регулярно побеждаю в спортивных хакатонах по оптимизации инференса нейросетей.',
    isOpenToOffers: true,
    matchExplanation: 'Топ-1 в ИИ: Серебро турнира ФСП по нейросетям + 91/100 за тест ML-пайплайнов',
    fspProfile: {
      hasHistory: true,
      isVerified: true,
      fspId: 'FSP-RU-2024-4491',
      sportRank: 'КМС',
      disciplines: ['systems_ai', 'product_dev'],
      ratingScore: 2610,
      contestsParticipated: 22,
      podiumsCount: 11,
      achievements: [
        {
          id: 'ach-201',
          tournamentName: 'Всероссийский турнир ФСП по искусственному интеллекту',
          stage: 'Финал',
          year: 2025,
          discipline: 'systems_ai',
          placeResult: '2 место (Серебро)',
          teamName: 'NeuroPulse',
          roleInTeam: 'ML-лид',
          verificationHash: '0x1A2B3C...4D5E',
          verifiedDate: '12.03.2025',
        }
      ]
    },
    testSummary: {
      isPassed: true,
      score: 91,
      testedGrade: 'Senior',
      passedAt: '2026-07-20',
      cooldownUntil: '2026-10-20'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 89, fullMark: 100 },
      { subject: 'Скорость кода', score: 86, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 94, fullMark: 100 },
      { subject: 'Архитектура', score: 90, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 91, fullMark: 100 },
      { subject: 'Команда', score: 95, fullMark: 100 },
    ],
    contacts: {
      telegram: '@dasha_ai',
      github: 'https://github.com',
      email: 'voronova.ml@neural.io',
      phone: '+7 (999) 111-22-33'
    }
  },
  {
    id: 'fsp-cand-03',
    fullName: 'Максим Лебедев',
    avatarUrl: makeCyberAvatar('МЛ', '%23FFB800', '%23FF4D00'),
    handle: '@robot_master',
    headline: 'Embedded & Robotics Rust-разработчик',
    city: 'Казань',
    grade: 'Middle+',
    category: {
      id: 'cat-robotics-middle',
      specialization: 'Программирование робототехники',
      grade: 'Middle+'
    },
    primaryStack: ['Rust', 'C', 'ROS2', 'RTOS', 'Microcontrollers', 'Linux Kernel'],
    salaryMin: 280000,
    salaryMax: 330000,
    bio: '1-й взрослый разряд по программированию робототехнических систем ФСП. Разрабатываю прошивки реального времени для БПЛА и автономных платформ.',
    isOpenToOffers: true,
    matchExplanation: 'Победитель Кубка робототехники 2024 (1-й разряд) + 88/100 за тест Embedded Rust',
    fspProfile: {
      hasHistory: true,
      isVerified: true,
      fspId: 'FSP-RU-2024-9104',
      sportRank: '1-й разряд',
      disciplines: ['robotics'],
      ratingScore: 2320,
      contestsParticipated: 18,
      podiumsCount: 7,
      achievements: [
        {
          id: 'ach-301',
          tournamentName: 'Кубок Федерации по спортивному программированию робототехники',
          stage: 'Финал',
          year: 2024,
          discipline: 'robotics',
          placeResult: '1 место (Золото)',
          teamName: 'CyberVostok',
          roleInTeam: 'Low-level Developer',
          verificationHash: '0x99AA11...EE44',
          verifiedDate: '18.10.2024',
        }
      ]
    },
    testSummary: {
      isPassed: true,
      score: 88,
      testedGrade: 'Middle+',
      passedAt: '2026-06-15',
      cooldownUntil: '2026-09-15'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 85, fullMark: 100 },
      { subject: 'Скорость кода', score: 88, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 97, fullMark: 100 },
      { subject: 'Архитектура', score: 84, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 93, fullMark: 100 },
      { subject: 'Команда', score: 82, fullMark: 100 },
    ],
    contacts: {
      telegram: '@m_lebedev_rust',
      github: 'https://github.com',
      email: 'm.lebedev@embedded-lab.ru'
    }
  },
  {
    id: 'fsp-cand-04',
    fullName: 'Илья Ковалев',
    avatarUrl: makeCyberAvatar('ИК', '%2300FF85', '%230070F3'),
    handle: '@sec_breaker',
    headline: 'AppSec / Binary Reverse Engineer • Капитан команды CTF',
    city: 'Новосибирск',
    grade: 'Senior',
    category: {
      id: 'cat-sec-senior',
      specialization: 'Информационная безопасность',
      grade: 'Senior'
    },
    primaryStack: ['C', 'Python', 'Ghidra', 'Assembly x86_64', 'Fuzzing', 'Crypto'],
    salaryMin: 380000,
    salaryMax: 440000,
    bio: 'КМС по спортивному программированию в сфере информационной безопасности. Финалист кубков кибербезопасности ФСП.',
    isOpenToOffers: true,
    matchExplanation: 'Победитель Национального турнира по кибербезопасности (КМС) + 98/100 стресс-тест',
    fspProfile: {
      hasHistory: true,
      isVerified: true,
      fspId: 'FSP-RU-2023-7721',
      sportRank: 'КМС',
      disciplines: ['cyber_security', 'algorithms'],
      ratingScore: 2720,
      contestsParticipated: 29,
      podiumsCount: 14,
      achievements: [
        {
          id: 'ach-401',
          tournamentName: 'Национальный турнир ФСП по кибербезопасности',
          stage: 'Финал',
          year: 2025,
          discipline: 'cyber_security',
          placeResult: '1 место (Золото)',
          teamName: 'ZeroTolerance',
          roleInTeam: 'Капитан / Binary Exploiter',
          verificationHash: '0xCC88AA...1234',
          verifiedDate: '28.02.2025',
        }
      ]
    },
    testSummary: {
      isPassed: true,
      score: 95,
      testedGrade: 'Senior',
      passedAt: '2026-05-12',
      cooldownUntil: '2026-08-12'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 94, fullMark: 100 },
      { subject: 'Скорость кода', score: 92, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 95, fullMark: 100 },
      { subject: 'Архитектура', score: 86, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 98, fullMark: 100 },
      { subject: 'Команда', score: 90, fullMark: 100 },
    ],
    contacts: {
      telegram: '@kovalev_sec',
      github: 'https://github.com',
      email: 'sec@zero-tolerance.io'
    }
  },
  {
    id: 'fsp-cand-05',
    fullName: 'София Мельникова',
    avatarUrl: makeCyberAvatar('СМ', '%237928CA', '%23FF007A'),
    handle: '@sofia_front',
    headline: 'Creative WebGL & Frontend Architect',
    city: 'Екатеринбург',
    grade: 'Middle+',
    category: {
      id: 'cat-frontend-middle',
      specialization: 'Продуктовое программирование (Web)',
      grade: 'Middle+'
    },
    primaryStack: ['TypeScript', 'React', 'Three.js', 'WebGL', 'Tailwind', 'Next.js'],
    salaryMin: 260000,
    salaryMax: 310000,
    bio: 'Победитель студенческих хакатонов продуктового программирования ФСП. Создаю ультрабыстрые веб-приложения.',
    isOpenToOffers: true,
    matchExplanation: 'Победитель хакатона продуктового программирования (1-й разряд) + 91/100 за тест UI/WebGL',
    fspProfile: {
      hasHistory: true,
      isVerified: true,
      fspId: 'FSP-RU-2024-3118',
      sportRank: '1-й разряд',
      disciplines: ['product_dev'],
      ratingScore: 2280,
      contestsParticipated: 14,
      podiumsCount: 6,
      achievements: [
        {
          id: 'ach-501',
          tournamentName: 'Хакатон продуктового программирования ФСП: Урал',
          stage: 'Финал',
          year: 2024,
          discipline: 'product_dev',
          placeResult: '1 место (Золото)',
          teamName: 'PixelWave',
          roleInTeam: 'Frontend Lead',
          verificationHash: '0xEE3344...8899',
          verifiedDate: '14.09.2024',
        }
      ]
    },
    testSummary: {
      isPassed: true,
      score: 91,
      testedGrade: 'Middle+',
      passedAt: '2026-08-01',
      cooldownUntil: '2026-11-01'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 79, fullMark: 100 },
      { subject: 'Скорость кода', score: 94, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 85, fullMark: 100 },
      { subject: 'Архитектура', score: 91, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 89, fullMark: 100 },
      { subject: 'Команда', score: 97, fullMark: 100 },
    ],
    contacts: {
      telegram: '@sofia_webgl',
      github: 'https://github.com',
      email: 'sofia@pixelwave.dev'
    }
  },
  {
    id: 'fsp-cand-06',
    fullName: 'Артем Новиков',
    avatarUrl: makeCyberAvatar('АН', '%233A86FF', '%2300F0FF'),
    handle: '@speed_coder',
    headline: 'Junior+ Backend Developer (Go / C++) • Олимпиадный спринтер',
    city: 'Нижний Новгород',
    grade: 'Junior+',
    category: {
      id: 'cat-backend-junior',
      specialization: 'Бэкенд и распределенные системы',
      grade: 'Junior+'
    },
    primaryStack: ['Go', 'PostgreSQL', 'Docker', 'gRPC', 'Algorithms', 'Redis'],
    salaryMin: 180000,
    salaryMax: 220000,
    bio: '2-й разряд по спортивному программированию. Решил более 1200 задач на олимпиадных платформах.',
    isOpenToOffers: true,
    matchExplanation: 'Серебро регионального этапа ФСП (2-й разряд) + 97/100 за скорость решения алгоритмов',
    fspProfile: {
      hasHistory: true,
      isVerified: true,
      fspId: 'FSP-RU-2025-5592',
      sportRank: '2-й разряд',
      disciplines: ['algorithms', 'product_dev'],
      ratingScore: 2150,
      contestsParticipated: 12,
      podiumsCount: 4,
      achievements: [
        {
          id: 'ach-601',
          tournamentName: 'Региональный турнир ФСП Приволжского округа',
          stage: 'Региональный этап',
          year: 2025,
          discipline: 'algorithms',
          placeResult: '2 место (Серебро)',
          roleInTeam: 'Соло-участник',
          verificationHash: '0xFA45BC...9900',
          verifiedDate: '10.01.2025',
        }
      ]
    },
    testSummary: {
      isPassed: true,
      score: 87,
      testedGrade: 'Junior+',
      passedAt: '2026-09-01',
      cooldownUntil: '2026-12-01'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 88, fullMark: 100 },
      { subject: 'Скорость кода', score: 97, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 82, fullMark: 100 },
      { subject: 'Архитектура', score: 75, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 88, fullMark: 100 },
      { subject: 'Команда', score: 81, fullMark: 100 },
    ],
    contacts: {
      telegram: '@artem_speedgo',
      github: 'https://github.com',
      email: 'a.novikov.dev@mail.ru'
    }
  },
  // 7-Й КАНДИДАТ: ОБЯЗАТЕЛЬНЫЙ ПО ТЗ КЕЙС "БЕЗ ИСТОРИИ В ФСП"
  {
    id: 'fsp-cand-07',
    fullName: 'Денис Морозов',
    avatarUrl: makeCyberAvatar('ДМ', '%2300F0FF', '%230070F3'),
    handle: '@denis_backend',
    headline: 'Senior Python / FastAPI Architect • Квалификация подтверждена тестом',
    city: 'Самара',
    grade: 'Senior',
    category: {
      id: 'cat-backend-senior',
      specialization: 'Бэкенд и распределенные системы',
      grade: 'Senior'
    },
    primaryStack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AsyncIO'],
    salaryMin: 330000,
    salaryMax: 380000,
    bio: 'Инженер с 6-летним опытом разработки распределенных API. В спортивном программировании не участвовал, но подтвердил грейд Senior через вступительное тестирование платформы.',
    isOpenToOffers: true,
    matchExplanation: 'Квалификация подтверждена независимым тестированием (94/100). Нет истории в ФСП',
    fspProfile: {
      hasHistory: false,
      isVerified: false,
      sportRank: 'Без разряда',
      disciplines: [],
      ratingScore: 0,
      contestsParticipated: 0,
      podiumsCount: 0,
      achievements: []
    },
    testSummary: {
      isPassed: true,
      score: 94,
      testedGrade: 'Senior',
      passedAt: '2026-09-18',
      cooldownUntil: '2026-12-18'
    },
    radarSkills: [
      { subject: 'Алгоритмы', score: 82, fullMark: 100 },
      { subject: 'Скорость кода', score: 89, fullMark: 100 },
      { subject: 'Оптимизация RAM', score: 88, fullMark: 100 },
      { subject: 'Архитектура', score: 95, fullMark: 100 },
      { subject: 'Стресс-контроль', score: 85, fullMark: 100 },
      { subject: 'Команда', score: 92, fullMark: 100 },
    ],
    contacts: {
      telegram: '@denis_morozov_dev',
      github: 'https://github.com',
      email: 'morozov.dev@corp.ru'
    }
  }
];