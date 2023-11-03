import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { shallowEqual, useSelector } from 'react-redux';
import { api } from '../../lib/axios';

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
}

const initialState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          {
            id: 1,
            title: 'Aprendendo React',
            duration: '09:12',
          },
          {
            id: 2,
            title: 'Aprendendo React I',
            duration: '06:33',
          },
          {
            id: 3,
            title: 'Aprendendo React II',
            duration: '10:05',
          },
          {
            id: 4,
            title: 'Aprendendo React III',
            duration: '10:12',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 1,
            title: 'Estrutura da aplicação',
            duration: '09:12',
          },
          {
            id: 2,
            title: 'Estrutura da aplicação I',
            duration: '06:33',
          },
          {
            id: 3,
            title: 'Estrutura da aplicação II',
            duration: '10:05',
          },
          {
            id: 4,
            title: 'Estrutura da aplicação III',
            duration: '10:12',
          },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get('courses/1');
  return response.data;
});

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];
        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentPlaying = () => {
  const { course, currentModuleIndex, currentLessonIndex, isLoading } = useSelector(getPlayerState, shallowEqual);
  const currentModule = course?.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];
  return { currentModule, currentLesson, isLoading };
};

const getPlayerState = ({ player }: RootState) => {
  return player;
};

export const useCurrentIndexPlaying = () => {
  const { currentModuleIndex, currentLessonIndex } = useSelector(getPlayerState, shallowEqual);
  return { currentModuleIndex, currentLessonIndex };
};
