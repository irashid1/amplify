import { FaPlay, FaPause, FaFastBackward, FaFastForward } from "react-icons/fa";
import { useEffect } from "react";
// import { handlePlayPause } from "./PlayMusic";

const MediaPlayer = ({ audioRef, playPause, setPlayPause, toggle, setToggle, currentTrack, setCurrentTrack, songList, pageIndex, setPageIndex }) => {

    console.log(songList)

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
        if (pageIndex > 0 || pageIndex === 0 && currentTrack.index !== 0) {
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
        

        // if (currentTrack.index === 0) {
        //     setPageIndex(pageIndex - 5);
        //     console.log(songList)
        // }


        // const prev = currentTrack.index - 1;
        // setCurrentTrack(songList[prev].track);
        // audioRef.current.play();

        // console.log(songList[prev].track)
        
        // if (pageIndex >= 0) {
        //     // let prev = 0
        //     if (currentTrack.index === 0 && pageIndex > 5) {
        //         setPageIndex(pageIndex - 5);
        //         setCurrentTrack(songList[songList.length - 1].track);
        //         // console.log(currentTrack)
        //         console.log(songList)
        //         // audioRef.current.play();
        //     } else if (audioRef.current.currentTime > 1) {
        //         // reseting track to start position
        //         audioRef.current.currentTime = 0;
        //         // console.log(currentTrack)
        //         // console.log(songList)
        //     } else if (audioRef.current.currentTime < 1) {
        //         // const prev = currentTrack.index - 1;
        //         setCurrentTrack(songList[currentTrack.index - 1].track);
        //         audioRef.current.play();
        //     } 
        //     } 
        //     else {
        //         audioRef.current.currentTime = 0;
        // }
        
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