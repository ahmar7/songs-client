import React from "react";
import InidividualSong from "../components/IndividualSong/InidividualSong";
import AudioPlayer from "../components/IndividualSong/AudioPlayer";

const SingleSong = () => {
  return (
    <div className="containered hfeed site clearfix">
      {/* <InidividualSong /> */}
      <AudioPlayer />
    </div>
  );
};

export default SingleSong;
