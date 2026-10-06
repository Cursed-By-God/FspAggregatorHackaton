import { create } from 'zustand';
import type { 
  Candidate, 
  JobOffer, 
  CatalogFilterState, 
  ActiveRoleMode, 
  FspDiscipline, 
  FspSportRank, 
  DeveloperGrade 
} from '../types';
import { MOCK_CANDIDATES } from '../data/mockCandidates';
import { INITIAL_OFFERS } from '../data/mockOffers';

export interface EmployerNeed {
  teamName: string;
  description: string;
  targetCategory: string;
  requiredStack: string[];
  salaryMin: number;
  salaryMax: number;
}

interface AppState {
  roleMode: ActiveRoleMode;
  setRoleMode: (mode: ActiveRoleMode) => void;

  candidates: Candidate[];
  offers: JobOffer[];

  // Модальные окна
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  isOfferModalOpen: boolean;
  offerTargetCandidate: Candidate | null;
  openOfferModal: (candidate: Candidate) => void;
  closeOfferModal: () => void;

  isTestModalOpen: boolean;
  openTestModal: () => void;
  closeTestModal: () => void;
  completeTest: (newScore: number, newGrade: DeveloperGrade, specialization: string) => void;

  // Смарт-подборка по потребности (Шаг 3)
  isSmartMatchOpen: boolean;
  activeSmartNeed: EmployerNeed | null;
  openSmartMatchModal: () => void;
  closeSmartMatchModal: () => void;
  applySmartMatch: (need: EmployerNeed) => void;
  clearSmartMatch: () => void;

  filters: CatalogFilterState;
  setSearchQuery: (query: string) => void;
  toggleDisciplineFilter: (discipline: FspDiscipline) => void;
  toggleSportRankFilter: (rank: FspSportRank) => void;
  toggleGradeFilter: (grade: DeveloperGrade) => void;
  setSalaryRange: (min: number, max: number) => void;
  toggleOnlyVerifiedFsp: () => void;
  setSortBy: (sort: CatalogFilterState['sortBy']) => void;
  resetFilters: () => void;

  sendDirectOffer: (offer: Omit<JobOffer, 'id' | 'status' | 'sentAt'>) => void;
  acceptOffer: (offerId: string) => void;
  declineOffer: (offerId: string) => void;

  resetDemoState: () => void;
}

const DEFAULT_FILTERS: CatalogFilterState = {
  searchQuery: '',
  disciplines: [],
  sportRanks: [],
  grades: [],
  minSalary: 150000,
  maxSalary: 600000,
  onlyVerifiedFsp: false,
  sortBy: 'rating'
};

export const useAppStore = create<AppState>((set) => ({
  roleMode: 'recruiter',
  setRoleMode: (mode) => set({ roleMode: mode }),

  candidates: MOCK_CANDIDATES,
  offers: INITIAL_OFFERS,

  selectedCandidate: null,
  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),

  isOfferModalOpen: false,
  offerTargetCandidate: null,
  openOfferModal: (candidate) => set({ isOfferModalOpen: true, offerTargetCandidate: candidate }),
  closeOfferModal: () => set({ isOfferModalOpen: false, offerTargetCandidate: null }),

  isTestModalOpen: false,
  openTestModal: () => set({ isTestModalOpen: true }),
  closeTestModal: () => set({ isTestModalOpen: false }),
  completeTest: (newScore, newGrade, specialization) =>
    set((state) => {
      const updatedCandidates = state.candidates.map((c, index) => {
        if (index === 0) {
          return {
            ...c,
            grade: newGrade,
            category: {
              ...c.category,
              grade: newGrade,
              specialization
            },
            testSummary: {
              isPassed: true,
              score: newScore,
              testedGrade: newGrade,
              passedAt: 'Сегодня',
              cooldownUntil: 'Через 3 месяца'
            },
            matchExplanation: `Квалификация подтверждена независимым тестированием (${newScore}/100, ${newGrade}) + статус ФСП`
          };
        }
        return c;
      });
      return { candidates: updatedCandidates };
    }),

  // Смарт-подбор
  isSmartMatchOpen: false,
  activeSmartNeed: null,
  openSmartMatchModal: () => set({ isSmartMatchOpen: true }),
  closeSmartMatchModal: () => set({ isSmartMatchOpen: false }),

  applySmartMatch: (need) =>
    set((state) => {
      // Алгоритм ранжирования под потребность
      const scoredCandidates = state.candidates.map((candidate) => {
        // 1. Совпадение стека
        const matchedTechs = candidate.primaryStack.filter((tech) =>
          need.requiredStack.some((req) => req.toLowerCase() === tech.toLowerCase())
        );
        const stackScore = (matchedTechs.length / Math.max(1, need.requiredStack.length)) * 50;

        // 2. Бонус за ФСП и вступительный тест
        const fspBonus = candidate.fspProfile.hasHistory
          ? candidate.fspProfile.sportRank === 'МС' ? 35 : candidate.fspProfile.sportRank === 'КМС' ? 28 : 20
          : 15;
        const testBonus = (candidate.testSummary.score / 100) * 15;

        const totalMatchPercent = Math.min(99, Math.round(stackScore + fspBonus + testBonus));

        // 3. Формирование уникального объяснения выдачи (Explainability)
        let explanation = '';
        if (candidate.fspProfile.hasHistory) {
          const topAch = candidate.fspProfile.achievements[0]?.placeResult || 'Призер ФСП';
          explanation = `Матчинг ${totalMatchPercent}%: ${topAch} (${candidate.fspProfile.sportRank}) + совпадение стека [${matchedTechs.join(', ') || 'базовый'}] + тест ${candidate.testSummary.score}/100`;
        } else {
          explanation = `Матчинг ${totalMatchPercent}%: Независимый тест платформы (${candidate.testSummary.score}/100) + релевантный опыт [${matchedTechs.join(', ') || 'профиль'}]`;
        }

        return {
          ...candidate,
          matchExplanation: explanation,
          smartScore: totalMatchPercent
        };
      });

      // Сортируем по силе матчинга
      scoredCandidates.sort((a: any, b: any) => (b.smartScore || 0) - (a.smartScore || 0));

      return {
        candidates: scoredCandidates,
        activeSmartNeed: need
      };
    }),

  clearSmartMatch: () =>
    set({
      candidates: MOCK_CANDIDATES,
      activeSmartNeed: null
    }),

  filters: DEFAULT_FILTERS,
  setSearchQuery: (query) => 
    set((state) => ({ filters: { ...state.filters, searchQuery: query } })),

  toggleDisciplineFilter: (discipline) =>
    set((state) => {
      const exists = state.filters.disciplines.includes(discipline);
      const updated = exists
        ? state.filters.disciplines.filter((d) => d !== discipline)
        : [...state.filters.disciplines, discipline];
      return { filters: { ...state.filters, disciplines: updated } };
    }),

  toggleSportRankFilter: (rank) =>
    set((state) => {
      const exists = state.filters.sportRanks.includes(rank);
      const updated = exists
        ? state.filters.sportRanks.filter((r) => r !== rank)
        : [...state.filters.sportRanks, rank];
      return { filters: { ...state.filters, sportRanks: updated } };
    }),

  toggleGradeFilter: (grade) =>
    set((state) => {
      const exists = state.filters.grades.includes(grade);
      const updated = exists
        ? state.filters.grades.filter((g) => g !== grade)
        : [...state.filters.grades, grade];
      return { filters: { ...state.filters, grades: updated } };
    }),

  setSalaryRange: (min, max) =>
    set((state) => ({ filters: { ...state.filters, minSalary: min, maxSalary: max } })),

  toggleOnlyVerifiedFsp: () =>
    set((state) => ({ filters: { ...state.filters, onlyVerifiedFsp: !state.filters.onlyVerifiedFsp } })),

  setSortBy: (sortBy) =>
    set((state) => ({ filters: { ...state.filters, sortBy } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  sendDirectOffer: (offerData) =>
    set((state) => {
      const newOffer: JobOffer = {
        ...offerData,
        id: `off-${Date.now()}`,
        status: 'pending',
        sentAt: 'Только что'
      };
      return {
        offers: [newOffer, ...state.offers],
        isOfferModalOpen: false,
        offerTargetCandidate: null
      };
    }),

  acceptOffer: (offerId) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === offerId ? { ...offer, status: 'accepted' as const } : offer
      )
    })),

  declineOffer: (offerId) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === offerId ? { ...offer, status: 'declined' as const } : offer
      )
    })),

  resetDemoState: () =>
    set({
      roleMode: 'recruiter',
      candidates: MOCK_CANDIDATES,
      offers: INITIAL_OFFERS,
      selectedCandidate: null,
      isOfferModalOpen: false,
      offerTargetCandidate: null,
      isTestModalOpen: false,
      isSmartMatchOpen: false,
      activeSmartNeed: null,
      filters: DEFAULT_FILTERS
    })
}));