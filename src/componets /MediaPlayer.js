// import { useState} from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipForwardCircleFill, BsFillSkipBackwardCircleFill } from "react-icons/bs";


const MediaPlayer = ({ audioRef, playPause, setPlayPause, currentTrack, setCurrentTrack, songList, pageIndex, setPageIndex, trackProgress, onScrub, onScrubEnd, duration, setUpdatedPage, nextTrack }) => {

    const togglePlayPause = () => {
        // control function for the play/pause button
        setPlayPause(!playPause)
        if (playPause === true) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }

    const prevTrack = () => {

        // control function for the previous track button
        if (audioRef.current.currentTime > 2) {
            // if the track has been playing for more than 2 seconds, it will restart the track
            audioRef.current.currentTime = 0;
        } else {
            if (currentTrack.index === 0) {
                // if current track is the first index of the current list, it will go back to the previous list
                setPageIndex(pageIndex - 5);
                setUpdatedPage(true);
            } else {
                // goes back to the previous track index within the same list
                const prev = currentTrack.index - 1;
                setCurrentTrack(songList[prev].track);
                audioRef.current.play();
            }
        }
    }

   
  

    return (

        <div className="mediaPlayer">

            <div className="trackInfo">
                <img src={currentTrack.images.coverart} alt=""  />
                <div>
                    <h3>{currentTrack.title}</h3>
                    <h4>{currentTrack.subtitle}</h4>
                </div>

            </div>

            <div className="mediaButtons">

                <button onClick={() => prevTrack()}>
                    <BsFillSkipBackwardCircleFill />
                </button>
                <div className="playPause">
                    <button onClick={() => togglePlayPause()}>
                        {playPause ? <BsFillPlayCircleFill /> : <BsFillPauseCircleFill />}
                    </button>
                </div>
                <button onClick={() => nextTrack()}>
                    <BsFillSkipForwardCircleFill />
                </button>

            </div>

            <div className="mediaTime">

                <input className="progress" type="range" value={trackProgress} step="1" min="0" max={duration ? duration : `${duration}`} onChange={(event)=>onScrub(event.target.value)} onMouseUp={onScrubEnd} onKeyUp={onScrubEnd}/>

            </div>

        </div>
    )

}



export default MediaPlayer;