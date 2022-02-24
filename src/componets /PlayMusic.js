import { useEffect, useRef} from "react"
import MediaPlayer from "./MediaPlayer";

const PlayMusic = ({ currentTrack, setCurrentTrack, playPause, setPlayPause, toggle, setToggle, songList, pageIndex, setPageIndex }) => {

    const audioElement = new Audio();
    const audioRef = useRef(audioElement);

    
    useEffect( () => {
        
        const currentSong = currentTrack.hub.actions[1].uri;

        if (playPause === false && audioRef.current.currentTime === 0) {
            audioRef.current.src = currentSong;
            audioRef.current.play();

        } else if (audioRef.current.src !== currentSong) {
            audioRef.current.currentTime = 0;
            audioRef.current.src = currentSong;
            audioRef.current.play();
        }
        else if (playPause === true && audioRef.current.currentTime > 0 ) {
            audioRef.current.pause();
            console.log(audioRef.current.currentTime);
        } else {
            audioRef.current.play();
        }
    }, [toggle, currentTrack, playPause]);


    return (
        <>
            <MediaPlayer audioRef={audioRef} playPause={playPause} setPlayPause={setPlayPause} toggle={toggle} setToggle={setToggle} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} songList={songList} pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </>
    )
}

export default PlayMusic;