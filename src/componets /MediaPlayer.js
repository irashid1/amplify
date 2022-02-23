import { FaPlay, FaPause, FaFastBackward, FaFastForward } from "react-icons/fa";
// import { handlePlayPause } from "./PlayMusic";

const MediaPlayer = ({ audioRef, playPause, setPlayPause, toggle, setToggle, currentTrack, setCurrentTrack, songList }) => {

    // console.log(currentTrack)

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
        if (audioRef.current.currentTime > 1) {
            // reseting track to start position
            audioRef.current.currentTime = 0;
            // console.log(currentTrack)
            // console.log(songList)
        } else if (audioRef.current.currentTime < 1) {
            const prev = currentTrack.index - 1 
            setCurrentTrack(songList[prev].track);
            audioRef.current.play();
            
        }
        
    }
    
    const nextTrack = () => {
        const next = currentTrack.index + 1
        setCurrentTrack(songList[next].track);
        audioRef.current.play();
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