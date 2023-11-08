import { create } from 'zustand';
import { api } from '../lib/axios';

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: number;
      title: string;
      duration: string;
    }>;
  }>;
}

interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  load: () => Promise<void>;
  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true });

      const response = await api.get('/courses/1');

      set({ course: response.data, isLoading: false });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      });
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];
        if (nextModule) {
          set({ currentModuleIndex: nextModuleIndex, currentLessonIndex: 0 });
        }
      }
    },
  };
});

export const useCurrentPlaying = () => {
  return useStore((state) => {
    const currentModule = state.course?.modules[state.currentModuleIndex];
    return {
      currentModule: state.course?.modules[state.currentModuleIndex],
      currentLesson: currentModule?.lessons[state.currentLessonIndex],
      isLoading: state.isLoading,
    };
  });
};
