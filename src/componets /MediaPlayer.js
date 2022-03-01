// import { useState} from "react";
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from "react-icons/fa";


const MediaPlayer = ({ audioRef, playPause, setPlayPause, toggle, setToggle, currentTrack, setCurrentTrack, songList, pageIndex, setPageIndex, trackProgress, onScrub, onScrubEnd, duration }) => {

    // const { duration } = audioRef.current

    

    const togglePlayPause = () => {
        setToggle(!toggle)
        setPlayPause(!playPause)
        if (playPause === true) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }

    const prevTrack = () => {


        if (audioRef.current.currentTime > 2) {
            audioRef.current.currentTime = 0;
        } else {
            if (currentTrack.index === 0) {
                setPageIndex(pageIndex - 5)

            } else {

                const prev = currentTrack.index - 1
                setCurrentTrack(songList[prev].track);
                audioRef.current.play();
            }
        }
    }

    const nextTrack = () => {

        if (currentTrack.index === (songList.length - 1)) {
            setPageIndex(pageIndex + 5)

        } else {

            const next = currentTrack.index + 1
            setCurrentTrack(songList[next].track);
            audioRef.current.play();
            console.log(songList)
        }
    }


    return (

        <>

        <div className="mediaButtons">

            <button onClick={() => prevTrack()}>
                <FaFastBackward />
            </button>
            <div className="playPause">
                <button onClick={() => togglePlayPause()}>
                    {playPause ? <FaPlay /> : <FaPause />}
                </button>
            </div>
            <button onClick={() => nextTrack()}>
                <FaFastForward />
            </button>

        </div>

        <div className="mediaTime">

            <input className="progress" type="range" value={trackProgress} step="1" min="0" max={duration ? duration : `${duration}`} onChange={(event)=>onScrub(event.target.value)} onMouseUp={onScrubEnd} onKeyUp={onScrubEnd}/>

        </div>

        </>
    )

}



export default MediaPlayer;