import * as Collapsible from '@radix-ui/react-collapsible';

import { ChevronDown } from 'lucide-react';
import { Lesson } from './Lesson';
import { play } from '../store/slices/player';
import { useStore } from '../zustand-store';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export const Module = ({ moduleIndex, amountOfLessons, title }: ModuleProps) => {
  const { currentModuleIndex, currentLessonIndex, lessons, play } = useStore((state) => {
    return {
      lessons: state.course?.modules[moduleIndex].lessons,
      currentModuleIndex: state.currentModuleIndex,
      currentLessonIndex: state.currentLessonIndex,
      play: state.play,
    };
  });

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isCurrent = moduleIndex === currentModuleIndex && lessonIndex === currentLessonIndex;
            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={isCurrent}
                onPlay={() => play([moduleIndex, lessonIndex])}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
