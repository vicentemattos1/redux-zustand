import { MessageCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Video } from '../components/Video';
import { Module } from '../components/Module';
import { loadCourse, useCurrentPlaying } from '../store/slices/player';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';

export const Player = () => {
  const dispatch = useAppDispatch();
  const modules = useSelector((state: RootState) => state.player.course?.modules);
  const { currentLesson } = useCurrentPlaying();

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`;
  }, [currentLesson]);

  useEffect(() => {
    dispatch(loadCourse());
  }, []);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center justify-center gap-2 bg-violet-500 px-3 py-2 text-sm font-medium text-white  hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            <span className="leading-4">Deixar feedback</span>
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1 ">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 overflow-y-scroll">
            {modules?.map((module, index) => (
              <Module
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOfLessons={module.lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
};
