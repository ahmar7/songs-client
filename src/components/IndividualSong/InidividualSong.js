import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import mp3 from "../../assets/Chaleya from Jawan Mp3 Song Download Pagalfree.mp3";
import "./InidividualSong.css";
import songLogo from "../../assets/logo.png";
import { baseUrl } from "../../utils/Constant";
const InidividualSong = ({
  audioElem,
  isPlaying,
  setisPlaying,
  currentSong,
}) => {
  const clickRef = useRef();
  const { id, movie } = useParams();
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);

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
          setSong(data.song);
        } else {
          setSong(null);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading) {
    return <div></div>;
  }
  if (!song) {
    return <div>Song not found</div>;
  }
  const playPause = () => {
    // setisPlaying(!isPlaying);
    if (isPlaying) {
      setisPlaying(false);
    } else {
      setisPlaying(true);
    }
    if (isPlaying) {
      audioElem.current.pause();
    } else {
      audioElem.current.play();
    }
  };
  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offSet = e.nativeEvent.offsetX;

    const divProgress = (offSet / width) * 100;
    audioElem.current.currentTime = (divProgress / 100) * currentSong.length;
  };

  return (
    <div className="is-content">
      <div className="login-form">
        <div className="logo">
          <img src={songLogo} alt="" />
        </div>

        <h1 className="normal-wer">{song.name} Download</h1>

        {/* <div className="audiojs" classname="audiojs" id="audiojs_wrapper0">
          <audio src={song.link} controls />
        </div> */}
        <div className="audiojs" classname="audiojs" id="audiojs_wrapper0">
          <div className="audiojs" classname="audiojs" id="audiojs_wrapper1">
            <audio
              src="https://my-bucket-s3-ap-east-amazonaws.afsounngawang.pw/ka/12_v1lo8kaqxn/s067/A%20Aa%20-%20%282020%29/%5BiSongs.info%5D%2001%20-%20Ye%20Raagi%20Teneya%20Maiyole.mp3"
              preload="none"
            />
            <div className="play-pause" onClick={playPause}>
              <p className={isPlaying ? "play  no-dis" : "play block-dis"} />
              <p className={isPlaying ? "pause block-dis" : "  pause"} />
              <p className="loading" /> <p className="error" />
            </div>
            <div className="scrubber" onClick={checkWidth} ref={clickRef}>
              <div
                className="progress"
                style={{ width: `${currentSong.progress}%` }}
              />
              <div className="loaded" />
            </div>
            <div className="time">
              <em className="played">00:00</em>/
              <strong className="duration">00:00</strong>
            </div>
          </div>

          <div className="error-message" />
        </div>

        <a
          id="redirector"
          href={song.link}
          rel="nofollow external noopener noreferrer"
        >
          <button className="btner" style={{ width: "100%" }}>
            <i className="fa fa-download" /> Download
          </button>
        </a>
      </div>
      <h2 className="txt">
        Close the Pop-Ad &amp; press the download button again
        <br />
        <b>Don't accept / Update / Install 3rd party softwares</b>
      </h2>
    </div>
  );
};

export default InidividualSong;
