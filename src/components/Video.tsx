import ReactPlayer from 'react-player';
import { next, useCurrentPlaying } from '../store/slices/player';
import { useAppDispatch } from '../store';
import { Loader } from 'lucide-react';

export const Video = () => {
  const dispatch = useAppDispatch();

  const { currentLesson, isLoading } = useCurrentPlaying();

  function handlePlayNext() {
    dispatch(next());
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
