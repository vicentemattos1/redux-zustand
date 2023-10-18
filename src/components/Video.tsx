import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { next, useCurrentPlaying } from '../store/slices/player';

export const Video = () => {
  const dispatch = useDispatch();

  const { currentLesson } = useCurrentPlaying();

  function handlePlayNext() {
    dispatch(next());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        playing
        onEnded={handlePlayNext}
      />
    </div>
  );
};
