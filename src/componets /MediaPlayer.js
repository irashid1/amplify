import { useState } from "react";
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from "react-icons/fa";


const MediaPlayer = ({ audioRef, playPause, setPlayPause, toggle, setToggle, currentTrack, setCurrentTrack, songList, pageIndex, setPageIndex }) => {

    const [nextPageToggle, setNextPageToggle] = useState(false); 

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

        if (pageIndex > 0 || (pageIndex === 0 && currentTrack.index !== 0)) {
            if (audioRef.current.currentTime > 1) {
                audioRef.current.currentTime = 0;
            } else {
                const prev = currentTrack.index - 1;
                setCurrentTrack(songList[prev].track);
                audioRef.current.play();
            }
        } else if (pageIndex === 0 && currentTrack.index === 0) {
            audioRef.current.currentTime = 0;
        }
      
        
    }

    const nextTrack = () => {

        

        if (currentTrack.index === 4) {
            setPageIndex(pageIndex + 5)
            setNextPageToggle(!nextPageToggle)
        } else {
            
            const next = currentTrack.index + 1
            setCurrentTrack(songList[next].track);
            audioRef.current.play();
        }
    }

    return(
        <div className="mediaPlayer">

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
    )

}

export default MediaPlayer;