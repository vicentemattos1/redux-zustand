import ReactPlayer from 'react-player';
import { useStore, useCurrentPlaying } from '../zustand-store';
import { useAppDispatch } from '../store';
import { Loader } from 'lucide-react';

export const Video = () => {
  const { currentLesson, isLoading } = useCurrentPlaying();
  const { next } = useStore((state) => {
    return {
      next: state.next,
    };
  });

  function handlePlayNext() {
    next();
  }

  if (!currentLesson) {
    return null;
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
          playing
          onEnded={handlePlayNext}
        />
      )}
    </div>
  );
};
