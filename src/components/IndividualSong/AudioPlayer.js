import { useState, useEffect, useRef } from "react";
import InidividualSong from "./InidividualSong";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/Constant";

const AudioPlayer = () => {
  const audioElem = useRef();

  const { id, movie } = useParams();
  const [isPlaying, setisPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState([]);
  const [songSrc, setsongSrc] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}song/${movie}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setsongSrc(data.song.link);
        } else {
          setsongSrc(null);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="audio-player">
      <div className="inner">
        <audio src={songSrc} onTimeUpdate={onPlaying} ref={audioElem} />

        <InidividualSong
          isPlaying={isPlaying}
          setisPlaying={setisPlaying}
          audioElem={audioElem}
          currentSong={currentSong}
          setcurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
