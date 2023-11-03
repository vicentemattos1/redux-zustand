import { useCurrentPlaying } from '../store/slices/player';

export const Header = () => {
  const { currentLesson, currentModule, isLoading } = useCurrentPlaying();

  if (!currentLesson || !currentModule) {
    return null;
  }

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">Módulo "{currentModule.title}"</span>
    </div>
  );
};
