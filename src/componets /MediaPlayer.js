import { FaPlay, FaPause, FaFastBackward, FaFastForward } from "react-icons/fa";
// import { handlePlayPause } from "./PlayMusic";

const MediaPlayer = ({ audioRef, playPause, setPlayPause, toggle, setToggle }) => {

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

    return(
        <div className="mediaPlayer">

            <button>
            <FaFastBackward />
            </button>
                <div className="playPause">
                    <button onClick={() => togglePlayPause()}>
                        <FaPlay />
                    </button>
                    {/* <button onClick={}>
                        <FaPause />
                    </button> */}
                </div>
            <button>
                <FaFastForward />
            </button>

        </div>
    )

}

export default MediaPlayer;