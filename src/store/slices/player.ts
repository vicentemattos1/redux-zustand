import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { shallowEqual, shallowEqual, useSelector } from 'react-redux';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    course: {
      modules: [
        {
          id: '1',
          title: 'Iniciando com React',
          lessons: [
            {
              id: '1',
              title: 'Aprendendo React',
              duration: '09:12',
            },
            {
              id: '2',
              title: 'Aprendendo React I',
              duration: '06:33',
            },
            {
              id: '3',
              title: 'Aprendendo React II',
              duration: '10:05',
            },
            {
              id: '4',
              title: 'Aprendendo React III',
              duration: '10:12',
            },
          ],
        },
        {
          id: '2',
          title: 'Estrutura da aplicação',
          lessons: [
            {
              id: '1',
              title: 'Estrutura da aplicação',
              duration: '09:12',
            },
            {
              id: '2',
              title: 'Estrutura da aplicação I',
              duration: '06:33',
            },
            {
              id: '3',
              title: 'Estrutura da aplicação II',
              duration: '10:05',
            },
            {
              id: '4',
              title: 'Estrutura da aplicação III',
              duration: '10:12',
            },
          ],
        },
      ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  },
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course.modules[state.currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course.modules[nextModuleIndex];
        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    },
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentPlaying = () => {
  const { course, currentModuleIndex, currentLessonIndex } = useSelector(getPlayerState, shallowEqual);
  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];
  return { currentModule, currentLesson };
};

const getPlayerState = ({ player }: RootState) => {
  return player;
};

export const useCurrentIndexPlaying = () => {
  const { currentModuleIndex, currentLessonIndex } = useSelector(getPlayerState, shallowEqual);
  return { currentModuleIndex, currentLessonIndex };
};
